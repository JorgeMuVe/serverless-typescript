import * as crypto from 'crypto'

/**
 * @description Interface para datos de tarjeta
 */
export interface ICard {
  card_number: string
  cvv: string
  email: string
  expiration_year: string
  expiration_month: string
}

/**
 * @description Clase para tokenización de tarjetas
 */
export class Card {
  public token: string // Token generado
  public card_number: number // Numero de tarjeta
  public cvv: number // Numero de seguridad
  public email: string // Correo electronico
  public expiration_year: string // Año de expiración
  public expiration_month: string // Mes de expiración
  public expiration_time: number // Tiempo de expiración de token

  constructor (cardData: ICard) {
    this.token = this.getTokenData() // Generate Token
    this.card_number = parseInt(cardData.card_number)
    this.cvv = parseInt(cardData.cvv)
    this.email = cardData.email
    this.expiration_year = cardData.expiration_year
    this.expiration_month = cardData.expiration_month
    this.expiration_time = this.getExpirationTime(15) // Calculate TTL
  }

  /**
   * @description Calcula el tiempo de expiración
   * @param TLL number Tiempo en minutos de expiración de token
   * @returns number Fecha de expiración en segundos
   */
  getExpirationTime (TTL: number): number {
    return Math.floor(Date.now() / 1000) + (TTL * 60)
  }

  /**
   * @description Genera Token con cryto
   * @returns string Token generado
   */
  getTokenData (): string {
    const buffer = crypto.randomBytes(8)
    return buffer.toString('hex')
  }
}
