# Gacha API

Este proyecto implementa un sistema de "gacha" para recolección de personajes, donde los usuarios pueden realizar "rolls" para obtener personajes de diferentes rarezas y animes. Además, los usuarios pueden guardar, vender y administrar sus personajes en su colección.

## Requisitos Previos

- Node.js instalado en tu sistema.
- MongoDB instalado y ejecutándose en tu máquina o en un servicio de alojamiento como MongoDB Atlas.
- Clave de API de Discord si planeas usar la autenticación de Discord.

## Configuración

Antes de comenzar a utilizar la API, necesitarás configurar algunas variables de entorno para asegurarte de que la aplicación funcione correctamente. Aquí hay una lista de las variables de entorno necesarias y cómo configurarlas:

1. **DISCORD_CLIENT_ID y DISCORD_CLIENT_SECRET**: Estas variables se utilizan para la autenticación con Discord. Debes obtenerlas creando una aplicación en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications) y obtener las credenciales de tu aplicación.

2. **MONGO_URI, MONGO_USER y MONGO_PASS**: Estas variables se utilizan para la conexión a tu base de datos MongoDB. `MONGO_URI` es la URI de conexión a tu base de datos, mientras que `MONGO_USER` y `MONGO_PASS` son las credenciales de usuario para acceder a la base de datos.

3. **JWT_SECRET**: Esta variable se utiliza para firmar y verificar tokens JWT para la autenticación de usuarios. Debes configurarla con una cadena secreta aleatoria y segura.

Para configurar estas variables de entorno, puedes crear un archivo `.env` en la raíz del proyecto y agregar las variables con sus valores correspondientes. Asegúrate de no incluir este archivo en tu repositorio git para mantener tus credenciales seguras.

## Uso

Una vez que hayas configurado las variables de entorno, puedes iniciar el servidor y comenzar a utilizar la API. Puedes acceder a las diferentes rutas API para registrarte, iniciar sesión, realizar "rolls", guardar y vender personajes, entre otras funciones.

Para iniciar el servidor, puedes ejecutar el siguiente comando:

```bash
npm start
```

Asegúrate de consultar la documentación completa de la API para obtener más detalles sobre cómo utilizar cada ruta.

## Contribuyendo

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz tus cambios y realiza los commits (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

## Créditos

Este proyecto fue creado por [Bruno](https://github.com/SrZeroRequiem).

