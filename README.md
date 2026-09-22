# ACME School

## Autor

Lester Garcia

## Descripción

ACME School es una aplicación de consola orientada a la gestión de información académica mediante una arquitectura organizada en módulos.

El proyecto utiliza Node.js como entorno de ejecución, JavaScript como lenguaje de programación y MySQL como sistema de gestión de bases de datos. La aplicación establece una conexión con MySQL al iniciar, ejecuta las operaciones correspondientes desde la interfaz de consola y libera las conexiones al finalizar el proceso.

El proyecto también utiliza variables de entorno para mantener separada la configuración de la aplicación de las credenciales y parámetros de conexión a la base de datos.

## Objetivo

El objetivo del proyecto es desarrollar una aplicación de gestión escolar aplicando fundamentos de programación con Node.js, programación orientada a objetos, modularización del código y persistencia de información mediante una base de datos relacional MySQL.

El proyecto busca mantener una estructura organizada que permita separar las responsabilidades de la aplicación y facilitar su mantenimiento y evolución.

## Características principales

* Aplicación ejecutada desde consola.
* Desarrollo utilizando Node.js y JavaScript.
* Persistencia de datos mediante MySQL.
* Conexión a MySQL mediante el paquete `mysql2`.
* Configuración mediante variables de entorno.
* Uso de módulos ES de JavaScript.
* Organización del código en módulos.
* Gestión de la conexión mediante un pool de conexiones.
* Liberación de las conexiones al finalizar la ejecución.
* Manejo de errores durante el inicio de la aplicación.

## Tecnologías utilizadas

| Tecnología | Uso                                    |
| ---------- | -------------------------------------- |
| Node.js    | Entorno de ejecución                   |
| JavaScript | Lenguaje de programación               |
| MySQL      | Persistencia y almacenamiento de datos |
| mysql2     | Conexión entre Node.js y MySQL         |
| dotenv     | Gestión de variables de entorno        |
| Git        | Control de versiones                   |
| GitHub     | Repositorio del proyecto               |

## Requisitos previos

Antes de ejecutar el proyecto debes tener instalado:

* nvm(node version manager)-> Recomendable o simplemente Node.js(version a tu eleccion).
* npm
* MySQL
* Git

Se recomienda utilizar una versión reciente de Node.js compatible con las dependencias utilizadas por el proyecto.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/lestergarcia711/acme-school.git
```

Ingresa al directorio:

```bash
cd acme-school
```

Instala las dependencias:

```bash
npm install
```

## Configuración de la base de datos

La aplicación utiliza MySQL como sistema de persistencia.

Debes disponer de un servidor MySQL activo y crear la base de datos utilizada por el proyecto.

La configuración esperada actualmente es:

```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=acme_school
DB_PORT=3306
```

## Variables de entorno

El proyecto incluye un archivo `.env.example` que sirve como plantilla para configurar la conexión a MySQL.

Copia el archivo:

```bash
cp .env.example .env
```

Después modifica `.env` con los datos correspondientes a tu instalación de MySQL.

Ejemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=acme_school
DB_PORT=3306
```

No debes publicar credenciales reales en el repositorio.

El archivo `.env` debe mantenerse fuera del control de versiones.

## Ejecución

Una vez instaladas las dependencias y configuradas las variables de entorno, ejecuta la aplicación mediante Node.js:

```bash
node src/index.js
```

Al iniciar, la aplicación realiza una prueba de conexión con MySQL antes de iniciar la interfaz principal de consola.

El flujo general de inicio es:

```text
Inicio
  |
  v
Configuración de variables de entorno
  |
  v
Conexión con MySQL
  |
  v
Inicio de la aplicación de consola
  |
  v
Interacción con el usuario
  |
  v
Finalización de la aplicación
  |
  v
Liberación de conexiones MySQL
```

## Estructura del Proyecto

El proyecto está organizado mediante una estructura modular que separa las responsabilidades de la aplicación. Esta organización permite mantener el código más ordenado, facilitar su mantenimiento y separar la interacción con el usuario, la lógica de negocio, el acceso a datos y la configuración de la base de datos.

```text
src/
├── cli/
│   ├── view/
│   └── menu.js
├── config/
│   └── database.js
├── models/
│   ├── Course.js
│   ├── Person.js
│   ├── Student.js
│   └── Teacher.js
├── repositories/
│   ├── IncriptionRepository.js
│   └── StudentRepository.js
├── services/
│   └── InscriptionService.js
└── index.js

.env.example
.gitignore
README.md
package.json
```

### `src/`

Contiene el código fuente principal de la aplicación.

### `src/cli/`

Contiene los componentes encargados de la interacción con el usuario mediante la consola.

```text
cli/
├── view/
└── menu.js
```

#### `menu.js`

Gestiona el menú principal y el flujo de interacción de la aplicación desde la terminal.

#### `view/`

Contiene las vistas utilizadas para presentar información y solicitar datos al usuario mediante la interfaz de consola.

### `src/config/`

Contiene la configuración necesaria para establecer la conexión con los servicios externos utilizados por la aplicación.

```text
config/
└── database.js
```

#### `database.js`

Gestiona la configuración y conexión con la base de datos MySQL.

La configuración de conexión utiliza variables de entorno para evitar almacenar directamente las credenciales dentro del código fuente.

### `src/models/`

Contiene los modelos que representan las principales entidades del dominio de la aplicación.

```text
models/
├── Course.js
├── Person.js
├── Student.js
└── Teacher.js
```

#### `Person.js`

Representa la entidad base relacionada con una persona dentro del sistema.

#### `Student.js`

Representa a los estudiantes y sus características específicas dentro de la aplicación.

#### `Teacher.js`

Representa a los docentes y sus características específicas.

#### `Course.js`

Representa los cursos o asignaturas administrados por la aplicación.

La separación de estos modelos permite representar las entidades del dominio mediante clases independientes.

### `src/repositories/`

Contiene los componentes responsables de interactuar directamente con la información almacenada en la base de datos.

```text
repositories/
├── IncriptionRepository.js
└── StudentRepository.js
```

#### `StudentRepository.js`

Gestiona las operaciones relacionadas con la persistencia de información de los estudiantes.

#### `IncriptionRepository.js`

Gestiona las operaciones relacionadas con las inscripciones almacenadas en la base de datos.

La utilización de repositorios permite separar el acceso a datos de la lógica de negocio de la aplicación.

### `src/services/`

Contiene la lógica de negocio de la aplicación.

```text
services/
└── InscriptionService.js
```

#### `InscriptionService.js`

Gestiona la lógica relacionada con el proceso de inscripción.

Esta capa actúa como intermediaria entre la interfaz de usuario y los repositorios, permitiendo aplicar las reglas de negocio antes de realizar operaciones sobre la base de datos.

### `src/index.js`

Es el punto de entrada de la aplicación.

Su responsabilidad principal es iniciar el sistema y coordinar los componentes necesarios para poner en funcionamiento la aplicación.

### `.env.example`

Archivo utilizado como plantilla para definir las variables de entorno necesarias para ejecutar el proyecto.

Permite conocer qué configuraciones debe proporcionar cada desarrollador sin exponer credenciales reales.

### `.gitignore`

Define los archivos y directorios que Git debe excluir del control de versiones.

Entre ellos se encuentra el archivo `.env`, evitando que las credenciales y configuraciones privadas sean publicadas accidentalmente.

### `package.json`

Contiene la información principal del proyecto Node.js, incluyendo:

* Nombre del proyecto.
* Versión.
* Tipo de módulos utilizado.
* Dependencias.
* Configuración de ejecución.

### `README.md`

Documento principal de la documentación del proyecto. Contiene información sobre el propósito de la aplicación, instalación, configuración, ejecución, arquitectura y funcionamiento.


## Persistencia de datos

La persistencia de información se realiza mediante MySQL.

La aplicación utiliza `mysql2` para establecer la comunicación entre Node.js y el servidor de base de datos.

La configuración de conexión se mantiene mediante variables de entorno para evitar incluir directamente las credenciales dentro del código fuente.

## Manejo de errores

La aplicación contempla el manejo de errores durante el proceso de inicio.

Si ocurre un error crítico durante la conexión o ejecución inicial, se muestra un mensaje en consola.

Al finalizar el proceso, el pool de conexiones MySQL se cierra para liberar los recursos utilizados.

## Seguridad

El proyecto utiliza variables de entorno para almacenar la configuración de acceso a MySQL.

No se deben almacenar directamente en el código fuente:

* Contraseñas de MySQL.
* Credenciales de servicios externos.
* Tokens.
* Claves privadas.
* Otros datos sensibles.

Para configurar el proyecto localmente se debe utilizar el archivo `.env`, tomando `.env.example` como referencia.

## Dependencias

Las principales dependencias del proyecto son:

```text
dotenv
mysql2
```

Puedes consultar las versiones instaladas directamente en `package.json`.

## Scripts disponibles

Actualmente el proyecto no cuenta con un script de ejecución personalizado en `package.json`.

Por esta razón, la aplicación puede iniciarse directamente mediante:

```bash
node src/index.js
```

## Estado del proyecto

El proyecto se encuentra en desarrollo y forma parte de un proceso de aprendizaje y aplicación práctica de conceptos relacionados con Node.js, JavaScript, programación orientada a objetos, modularización y persistencia de datos mediante MySQL.

Las funcionalidades y estructura pueden evolucionar conforme avance el desarrollo.

## Posibles mejoras

Entre las mejoras que pueden incorporarse posteriormente se encuentran:

* []Incorporar scripts personalizados de ejecución en `package.json`.
* []Implementar pruebas automatizadas.
* []Ampliar las operaciones de gestión académica.
* []Incorporar validaciones más completas.
* []Mejorar el manejo de errores.
* []Ampliar la separación entre lógica de negocio, acceso a datos e interfaz.
* []Incorporar documentación específica de las entidades de la base de datos.
* []Agregar scripts de inicialización y carga de datos de prueba.
* []Incorporar una estrategia formal de migraciones de base de datos.




