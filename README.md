# Proyecto de Gestión de Materias y Grupos

Este proyecto es una API para gestionar materias, grupos de estudiantes, y asistencia. Los profesores pueden crear materias, asignar grupos, y registrar las asistencias de los estudiantes en cada sesión.

## Tecnologías Utilizadas

- **Node.js** (backend)
- **Express.js** (framework de servidor)
- **Swagger** (documentación de la API)
- **PostgreSQL** (base de datos)

## Instalación del backend

1. Clonar el repositorio

```bash
git clone -b backend https://github.com/MiguelSotoD/asistenciaAlumnos.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo de variables de entorno:

```bash
cp .env.example .env
```

4. Configurar las variables de entorno en el archivo `.env` (ver sección de Configuración).

## Configuración

Edita el archivo `.env` con los siguientes valores:

```
PORT=5000 #Puerto donde se correra la aplicacion
USERPG= #usuario de la base de datos de postgres
PASSWORDPG= #contraseña de la base de datos de postgres
HOSTPG= #host de la base de datos de postgres
PORTPG= #puerto de la base de datos de postgres
DATABASEPG= #nombre de la base de datos de postgres
```

## Estructura del proyecto

```
/backend
/── /logs               # Archivos de registro (generados en tiempo de ejecución)
├── /src                # Código fuente principal
│   ├── /config         # Configuración (base de datos, env, logger)
│   ├── /controllers    # Controladores para las rutas
│   ├── /middlewares    # Middlewares (auth, error handling)
│   ├── /routes         # Definición de rutas API
│   ├── /services       # Lógica de negocio
│   ├── /utils          # Utilidades y funciones auxiliares
│   └── index.ts        # Configuracion Inicial de la aplicacion
├── package.json        # Dependencias y scripts
└── tsconfig.json       # Configuración de TypeScript
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

## API Endpoints

## Documentación de la API

Se puede acceder a la documentación detallada de la API a través de Swagger:

```
http://localhost:5000/api-docs
```


