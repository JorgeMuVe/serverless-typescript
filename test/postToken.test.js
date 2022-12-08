const fncPostToken = require('../.build/src/functions/postToken')
const eventGenerator = require('./utils/eventGenerator')
const validators = require('./utils/validators')

test('Test postToken', async () => {
  const event = eventGenerator({
    headers: { authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw' },
    body: { card_number: "4518169258537", cvv: "123", email: "jorge@gmail.com", expiration_year: "2023", expiration_month: "12" }
  })
  await fncPostToken.postTokenLambda(event, null, (error, res) => {
    console.log(res);
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})
