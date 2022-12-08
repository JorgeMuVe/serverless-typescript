export class ValidateTokenClass {
  /**
   * @description Valida el formato del token, no sea mayor a 16 caracteres
   * @param token string Token generado
   * @returns boolean Es valido
   */
  validateFormatToken = (token: string): boolean => {
    if ((!/^[a-zA-Z0-9]+$/.test(token)) || token.length !== 16) {
      return false
    }
    return true
  }

  /**
   * @description Valida el pk del negocio sea igual a pk_test_LsRBKejzCOEEWOsw
   * @param tokenAuth string Pk del negocio
   * @returns boolean Es valido
   */
  validateBearerToken = (tokenAuth: string = ''): boolean => {
    const validTokens = ['pk_test_LsRBKejzCOEEWOsw']
    const tokenSplit = tokenAuth.split(' ')
    if (tokenAuth === '' || tokenSplit.length !== 2 || tokenSplit[0] !== 'Bearer' || tokenSplit[1] !== validTokens[0]) {
      return false
    }
    return true
  }
}

export const validateTokenInstance = new ValidateTokenClass()
