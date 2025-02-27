# Asistencia Alumnos

Este proyecto es una aplicación de asistencia para alumnos construida con React y Vite.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior) o yarn

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/asistenciaAlumnos.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd asistenciaAlumnos
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
    o si usas yarn:
    ```sh
    yarn install
    ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de sitio de reCAPTCHA:
    ```env
    VITE_RECAPTCHA_SITE_KEY=tu_clave_de_sitio
    ```

## Ejecución

Para iniciar la aplicación en modo de desarrollo, ejecuta:
```sh
npm run dev
```
o si usas yarn:
```sh
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Construcción

Para construir la aplicación para producción, ejecuta:
```sh
npm run build
```
o si usas yarn:
```sh
yarn build
```

Los archivos construidos estarán en el directorio `dist`.

## Estructura del Proyecto

- `src/components`: Componentes reutilizables de la aplicación.
- `src/pages`: Páginas de la aplicación.
- `src/assets`: Recursos estáticos como imágenes y estilos.

## Contribución

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
