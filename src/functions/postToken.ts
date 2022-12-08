import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cardControllerInstance } from '../controllers/card.controller'
import { validateTokenInstance } from '../utils/validate.token'
import { generateResponse } from '../utils/generate.response'
import { ICard } from '../models/card'

/**
 * @description Funcion Lambda para tokenizar tarjeta
 * @returns Callback con respuesta
 */
export const postTokenLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateResponse.generateErrorResponse(400, 'Error postTokenLambda: Bad Request')
  try {
    const tokenAuth = event?.headers?.authorization // Get Pk Bearer from headers
    if (validateTokenInstance.validateBearerToken(tokenAuth)) { // Validate Pk Bearer
      if (event.body !== null && event.body !== undefined) { // Validate body
        const postCard: ICard = JSON.parse(event.body)
        const errorList: string[] = await cardControllerInstance.validateDataCard(postCard) // Validate data card
        if (errorList.length === 0) {
          response = await cardControllerInstance.saveCard(postCard) // Save tokenization card
        } else { response = generateResponse.generateErrorResponse(400, errorList) }
      }
    } else { response = generateResponse.generateErrorResponse(401, 'Unauthorized postTokenLambda: Bearer token') }
  } catch (error) { console.log(error) }
  callback(null, response)
}
