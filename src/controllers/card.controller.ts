import { APIGatewayProxyResult } from 'aws-lambda'
import { Card, ICard } from '../models/card'
import { validateCardInstance } from '../utils/validate.card'
import { validateTokenInstance } from '../utils/validate.token'
import { generateResponse } from '../utils/generate.response'
import { DynamoDB } from 'aws-sdk'

export class CardController {
  private readonly options: any = {}
  constructor () {
    if (process?.env?.JEST_WORKER_ID !== undefined) { // If testing mode
      this.options = {
        endpoint: 'http://localhost:8000', // Dynamodb localy
        region: 'local-env',
        sslEnabled: false,
        accessKeyId: 'XXXXXX',
        secretAccessKey: 'XXXXX'
      }
    }
  }

  /**
   * @description Almacena en CardTable la información procesada de una tarjeta
   * @param dataCard Objeto ICard con información de la tarjeta
   * @returns Objecto APIGatewayProxyResult
   */
  public saveCard = async (dataCard: ICard): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = generateResponse.generateErrorResponse(400, 'Error saveCard: Connection refused to DYNAMODB')
    try {
      const dynamodb = new DynamoDB.DocumentClient(this.options) // Connect to dynamoDB
      const registro: Card = new Card(dataCard) // Generate token & expiration time
      await dynamodb.put({ TableName: 'CardTable', Item: registro }).promise() // Insert Card
      response = { statusCode: 200, body: JSON.stringify({ token: registro.token }) } // Return generate token
    } catch (error) { console.log(error) } // Print error console
    return response
  }

  /**
   * @description Busqueda por token en CardTable
   * @param token string Token generado
   * @returns Objecto APIGatewayProxyResult
   */
  public findCard = async (token: string): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = generateResponse.generateErrorResponse(400, 'Error findCard: Connection refused to DYNAMODB')
    try {
      if (validateTokenInstance.validateFormatToken(token)) {
        const dynamodb = new DynamoDB.DocumentClient(this.options) // Connect to dynamoDB
        const result = await dynamodb.get({ TableName: 'CardTable', Key: { token } }).promise() // Find card by token
        const card = (result.Item === null || result.Item === undefined || JSON.stringify(result.Item) === '{}') ? false : result.Item
        if (card !== false) {
          response = {
            statusCode: 200,
            body: JSON.stringify({
              card_number: card.card_number,
              email: card.email,
              expiration_year: card.expiration_year,
              expiration_month: card.expiration_month
            })
          }
        } else { response = generateResponse.generateErrorResponse(400, 'Error: Expired token') }
      } else { response = generateResponse.generateErrorResponse(400, 'Error: Invalid token') }
    } catch (error) { console.log(error) } // Print error console
    return response
  }

  /**
   * @description Valida que información de la tarjeta este de acuerdo a los parametros
   * @param dataCard Objeto ICard con información de la tarjeta
   * @returns string[] Lista de mensajes de error
   */
  public validateDataCard = async (dataCard: ICard): Promise<string[]> => {
    const errorList: string[] = []
    if (!validateCardInstance.validateCreditCardNumber(dataCard.card_number)) { errorList.push('Numero de tarjeta inválido') }
    if (!validateCardInstance.validateCVV(dataCard.cvv)) { errorList.push('Numero de CVV inválido') }
    if (!validateCardInstance.validateEmail(dataCard.email)) { errorList.push('El correo electronico es inválido') }
    if (!validateCardInstance.validateMonth(dataCard.expiration_month)) { errorList.push('Mes de expiración inválido') }
    if (!validateCardInstance.validateYear(dataCard.expiration_year)) { errorList.push('Año de expiración inválido') }
    if (errorList.length === 0) { // Validate expiration if not exist errors
      if (!validateCardInstance.validateExpiration(parseInt(dataCard.expiration_year), parseInt(dataCard.expiration_month))) {
        errorList.push('La tarjeta ha caducado')
      }
    }
    return errorList
  }
}

export const cardControllerInstance = new CardController()
