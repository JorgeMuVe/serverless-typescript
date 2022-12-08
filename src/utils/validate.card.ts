export class ValidateCardClass {
  /**
   * @description Valida el numero de tarjeta, con el algorito LUHN
   * @param cardNumber string Numero de tarjeta
   * @returns boolean Es valido
   */
  validateCreditCardNumber = (cardNumber: string): boolean => {
    cardNumber = cardNumber.split(' ').join('')
    if ((!/\d{13,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
      return false
    }
    const carray = []
    for (let i = 0; i < cardNumber.length; i++) {
      carray[carray.length] = cardNumber.charCodeAt(i) - 48
    }
    carray.reverse()
    let sum = 0
    for (let i = 0; i < carray.length; i++) {
      let tmp = carray[i]
      if ((i % 2) !== 0) {
        tmp *= 2
        if (tmp > 9) { tmp -= 9 }
      }
      sum += tmp
    }
    return ((sum % 10) === 0)
  }

  /**
   * @description Valida el numero de seguridad cvv
   * @param cvv string Numero seguridad cvv
   * @returns boolean Es valido
   */
  validateCVV = (cvv: string): boolean => {
    if ((!/\d{3}(~\W[a-zA-Z])*$/.test(cvv)) || cvv.length > 4) {
      return false
    }
    return true
  }

  /**
   * @description Valida el correo electronico sea gmail.com|hotmail.com|yahoo.es
   * @param email string Correo electronico
   * @returns boolean Es valido
   */
  validateEmail = (email: string): boolean => {
    if ((!/^\w+([.-]?\w+)*@(?:|gmail.com|hotmail.com|yahoo.es)+$/.test(email)) || email.length > 100 || email.length < 5) {
      return false
    }
    return true
  }

  /**
   * @description Valida mes de expiración no sea mayor a 12
   * @param month string Mes de expiración de tarjeta
   * @returns boolean Es valido
   */
  validateMonth = (month: string): boolean => {
    if ((!/\d{1}(~\W[a-zA-Z])*$/.test(month)) || month.length > 2 || parseInt(month) > 13 || parseInt(month) <= 0) {
      return false
    }
    return true
  }

  /**
   * @description Valida año de expiración no sea mayor a 5 años
   * @param year string Año de expiración de tarjeta
   * @returns boolean Es valido
   */
  validateYear = (year: string): boolean => {
    if ((!/\d{4}(~\W[a-zA-Z])*$/.test(year)) || year.length > 4 || parseInt(year) > (new Date().getFullYear() + 5) || parseInt(year) <= 0) {
      return false
    }
    return true
  }

  /**
   * @description Valida la fecha de expiración de tarjeta
   * @param expirationYear string Año de expiración de tarjeta
   * @param expirationMonth string Mes de expiración de tarjeta
   * @returns boolean Es valido
   */
  validateExpiration = (expirationYear: number, expirationMonth: number): boolean => {
    const nowYear = new Date().getFullYear()
    const nowMonth = new Date().getMonth() + 1
    if (nowYear > expirationYear) { return false }
    if (nowYear === expirationYear) {
      if (nowMonth <= expirationMonth) { return true }
      return false
    }
    return true
  }
}

export const validateCardInstance = new ValidateCardClass()
