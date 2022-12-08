# TOKENIZACIÓN DE TARJETAS CHALLENGE

Esta solución permite almacenar los datos de una petición de tokenización con una expiración de 15 minutos.

El proyecto expone dos apis desplegables en AWS Lambda con conexión a dynamodb.

- El primer api guarda los datos de una tarjeta devolviendo un token generado y almacenado.
- El segundo api busca una tarjeta de acuerdo al token generado.

## Instalación local

- Puedes instalar las dependencias con npm.
    ```bash
    npm install

- Para compilar TypeScript y generar el build ejecute el siguiente comando.
    ```bash
    npm run build

- Es necesario tener dynamoDB instalado locamente, abra una nueva consola y ejecute.
    ```bash
    npm run dynamoLocal

- Una vez dynamodb este prendido, ejecute el test de la tokenización.
    ```bash
    npm run testPost

- Con el token que se mostro en consola modifique el token del pathParametersObject en el archivo [getToken.test](./test/getToken.test.js)
y ejecute el test de la validación de expiración del token.
    ```bash
    npm run testGet

## Despliegue AWS

- Necesitas tener instalado serverless globalmente.
    ```bash
    npm install -g serverless

- Puedes instalar las dependencias con npm.
    ```bash
    npm install

- Puedes crear un usuario IAM en la consola de AWS,
al crear el usuario se le entregada `NOMBRE_USUARIO`, `ACCES_KEY_ID` y `SECRET_ACCES_KEY`.

- Una vez tenga las credenciales ejecute el siguiente comando.

    ```bash
    serverless config credentials \
    --provider aws \
    --key `ACCES_KEY_ID` \
    --secret `SECRET_ACCES_KEY` \
    --profile `NOMBRE_USUARIO`  

- Modifique el archivo [serverless.yml](./serverless.yml) con los datos de su AWS IAM,
`profile` con `NOMBRE_USUARIO` y `region` con la region de su servicio AWS.

- Para desplegar el proyecto necesitas ejecutar el siguiente comando.
    ```bash
    npm run deploy

## Adicionales

- Para validar las buenas practicas del codigo con linter usamos Standar y puedes ejecutar con
el siguiente comando.
    ```bash
    npm run linter

## Contribución

Las solicitudes de pull para mejorar el codigo son bienvenidas.
