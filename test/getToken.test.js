const fncGetToken = require('../.build/src/functions/getToken')
const eventGenerator = require('./utils/eventGenerator')
const validators = require('./utils/validators')

test('Test getToken', async () => {
  const event = eventGenerator({ pathParametersObject: { token: '2e3f63c9e6d5c63e' }, headers: { authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw' } })
  await fncGetToken.getTokenLambda(event, null, (error, res) => {
    console.log(res);
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})