import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cardControllerInstance } from '../controllers/card.controller'
import { validateTokenInstance } from '../utils/validate.token'
import { generateResponse } from '../utils/generate.response'

/**
 * @description Funcion Lambda para buscar tarjeta por token
 * @returns Callback con respuesta
 */
export const getTokenLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateResponse.generateErrorResponse(400, 'Error getTokenLambda: Bad Request')
  try {
    const token = event?.pathParameters?.token // Get Token from pathParameters
    const tokenAuth = event?.headers?.authorization // Get Pk Bearer from headers
    if (validateTokenInstance.validateBearerToken(tokenAuth) && tokenAuth !== undefined) { // Validate Pk Bearer
      if (token !== undefined) { // If exists token
        response = await cardControllerInstance.findCard(token) // Search Card by Token
      }
    } else { response = generateResponse.generateErrorResponse(401, 'Unauthorized getTokenLambda: Bearer token') }
  } catch (error) { console.log(error) } // Print error console
  callback(null, response)
}
