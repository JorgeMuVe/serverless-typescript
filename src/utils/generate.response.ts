import { APIGatewayProxyResult } from 'aws-lambda'

export class GenerateResponseClass {
  /**
   * @description Genera un Objecto APIGatewayProxyResult con los paremtros
   * @param statusCode number Codigo de estado de solicitud
   * @param error any Error puede ser un string o array
   * @returns objecto APIGatewayProxyResult con statusCode y body
   */
  generateErrorResponse = (statusCode: number, error: any): APIGatewayProxyResult => {
    return { statusCode, body: JSON.stringify({ error }) }
  }
}

export const generateResponse = new GenerateResponseClass()
