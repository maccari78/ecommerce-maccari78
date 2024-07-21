<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

## HENRY Modulo 4 Backend
- L01, Backend architecture

      1. Aprender qué es la arquitectura de código.
      2. Conocer qué son los patrones de monolitos y microservicios y sus diferencias.
      3. Conocer algunos factores que pueden ayudarnos a mejorar la eficiencia y asegurar la escalabilidad de un proyecto.

- L02, NestJS fundamentals 

      1. Aprender qué es y cómo configurar NestJS.
      2. Entender cómo funciona la organización en módulos y la inyección de dependencias.
      3. Conocer la estructura y funcionalidad de controllers y proveedores en NestJS.
      4. Descubrir la sintaxis e implementación de un middleware en NestJS.

- L03, NestJS fundamentals II

      1. Aprender qué es un repositorio y cuál es su función en un proyecto de nest.
      2. Conocer cómo crear custom provider para necesidades específicas.
      3. Recalcar la importancia de los decoradores y establecer algunas directrices para seguir las buenas prácticas de código.

- L04, NestJS routing

      1. Entender el papel de un controlador en el enrutamiento de una aplicación.
      2. Conocer diferentes formas de extracción de información de una solicitud.
      3. Aprender qué son y cómo se implementan los guardianes de nest.
      4. Descubrir qué son y cómo aplicar los interceptores de nest.

- L05, NestJS & TypeORM

      1. Entender las ventajas de la integración de TypeORM a un proyecto de Nest.
      2. Realizar la configuración inicial de TypeORM dentro de Nest.
      3. Crear entidades y modelos que sigan el patrón de dependencias de Nest.
      4. Entender cómo funcionan las migraciones y su configuración.
      5. Aprender como TypeORM se acopla al patrón de repositorios de Nest. 

- L06, NestJS Pipes

      1. Aprender qué son y cómo implementar Pipes en Nest.
      2. Crear Pipes personalizadas de Nest.
      3. Comprender los fundamentos del manejo de errores en Nest.

- L07, NestJS File Upload - Fecha de grabación: 09/04/2024

      1. Descubrir cómo realizar la carga de archivos en NestJS con Multer por ejemplo.
      2. Entender qué es y cómo integrar un servicio de almacenamiento en la nube.
      3. Comprender los fundamentos de la validación de archivos en Nest JS.

- L08, NestJS Auth

      1. Entender qué es la autenticación y qué estrategias podemos utilizar para implementarla en una aplicación.
      2. Implementar la libreria de bcrypt para realizar la encriptacion y desencriptacion de contraseñas.
      3. Comprender qué es JWT y cómo integrarlo a una aplicación de Nest JS.

- L09, NestJS Auth II - Fecha de grabación: 11/04/2024

      1. Entender qué es  el control de acceso basado en roles y cómo implementarlo.
      2. Implementar el proceso de autenticación con redes sociales de Auth 0.

- L10, NestJS Testing - Fecha de grabación: 12/04/2024

      1. Realizar pruebas unitarias efectivas en entornos NestJS.
      2. Implementar pruebas de integración para asegurar la funcionalidad completa de aplicaciones NestJS.
      3. Simular dependencias en entornos de prueba para garantizar la independencia y control.
      4. Desarrollar estrategias de pruebas específicas para controladores, servicios y módulos en NestJ.

- L11, Nest Open API Integration - 

      1. Generar documentación efectiva utilizando OpenAPI (Swagger) en entornos NestJS.
      2. Aplicar mejores prácticas en la documentación de APIs para mejorar la comprensión y adopción.
      3. Personalizar la documentación OpenAPI según los requisitos específicos del proyecto.
      4. Realizar pruebas efectivas de APIs utilizando OpenAPI.

- L12, Docker Fecha de grabación: 16/04/2024

      1. Entender qué es y cuál es la utilidad de Docker.
      2. Aprender a instalar Docker y crear contenedores.
      3. Comprender cómo funciona la comunicación entre contenedores.
      4. Crear y gestionar una app multicontenedores con Docker Compose.

- L13, Deployment

      1. Comprender diversas estrategias de implementación, como Azul-Verde y Canario.
      2. Dominar el concepto de CI/CD (Integración Continua/Implementación Continua) para automatizar el proceso de implementación.
      3. Aprender prácticas efectivas de monitoreo y registro en entornos de producción.
      4. Conocer las consideraciones clave relacionadas con la escalabilidad en el despliegue de aplicaciones backend.

- L14, Javascript Advance III

      1. Profundizar en conceptos avanzados de JavaScript, como cierres y prototipos.
      2. Aplicar principios de programación funcional en proyectos JavaScript.
      3. Desarrollar estrategias efectivas de manejo de errores y técnicas de depuración avanzada.

# To run project without docker
- npm run start:dev

# Run docker-compose
- docker-compose up --build
- docker-compose up
- docker-compose down

# to migrations
- npm run typeorm -- migration:generate db/migrations/'nombre'
- npm run typeorm -- migration:run

# Acceder a base de datos desde psql
- docker ps
- docker exec -it ecommerce-maccari78-db-1 psql -U postgres

# Docker DB IPAddress
- 172.18.0.2

# Require authentication
- src/users/all
- src/users/:id (PATCH)
- src/users/:id (DELETE)

UPDATE users SET roles = ARRAY['admin'::users_roles_enum] WHERE id = '917db1dd-e13b-49eb-a574-c82b2dcd4bb6';

------------

# Consult an AI
Buen dia! Esta es mi aplicacion de ecommerce backend 'https://github.com/pi-rym/PM4-maccari78' alojada en un repositorio Github, creada con NestJS y TypeScript y conectada a una base de datos PostgreSQL mediante TypeORM. Tiene seeders de categories, products y users para la precarga de datos en DB, hace uso de Jason Web Token para la autenticacion de usuarios, tiene implementado UUID para mayor seguridad en todos sus ID, Open API Swagger para la documentacion, Multer, Cloudinary y buffer-to-stream para la carga de imagenes desde la nube. Los unicos que pueden asignar roles son los "superAdmin" por lo que tambien son los unicos que ven la lista de usuarios con sus roles asignados, la lista completa de ordenes solo pueden verlas los "superadmin y los admin", los "user" solo ven las ordenes de compra que le corresponden a cada user y ademas implemente un "control de stock" que depende del estado de la orden (processing, shipped, delivered, cancelled) y docker-compose para la contenerizacion de la app y la base de datos.

------------

# REVIEW
1ro un control de stock, 2do que no cualquier usuario pudiera ver o modificar las órdenes de otro usuario, 3ro que agregara el campo birthdate a users lo cual hice pero al hacer la migración para que tenga persistencia en base de datos me tiraba un error y después se me acabo el tiempo

Hacer una ruta nueva que permita hacer un reset de base de datos, que borre todos los datos existentes y cargue los datos de los seeder.

Me pidieron crear el rol de super admin, crear la lógica que me permitiera eliminar usuaarios desde superadmin. Adicional, un usuario no puede borrar admins, y admins no pueden borrar superadmins

Creación de un endpoint para administrar los roles de un user, modificar la respuesta de un exception filter, aplicar la validation de caracteres normales de un campo específico en un DTO que solo recibía un string, y por último la implementación de un nuevo rol SuperAdmin

La última no me dió el tiempo, xq me pidió que le asigne permisos especiales a un SuperAdmin a diferencia de un admin, le expliqué la lógica para hacerlo, pero como faltaba 9 minutos para que se cumpla 1 hora, osea ya habían pasado  51 minutos, me dijo que lo dejara ahí que con la lógica estaba bien y que no daba el tiempo.

Me pidio implementar en el deleteUser que implementara un nuevo rol SuperAdmin que pudiera eliminar admins y usuarios normales, pero que un admin no pueda borrar super admins

------------

# Mi estructura de tablas en Base de datos es la siguiente:
- categories (title, description, createdAt, updatedAt, id, addedById)
- products (title, description, price, stock, images, createdAt, updatedAt, id, addedById, categoryId)
- users (name, email, password, roles, createdAt, updatedAt, id, birthdate)
- orders (orderAt, status, shippedAt, deliveredAt, id, updateById, shippingAddressId, userId)
- orders_products (product_unit_price, product_quanrity, id, orderId, productId)
- shippings (phone, name, address, city, postCode, state, country, id)
- reviews (ratings, comment, createdAt, updatedAt, id, userId, productId)


name: "Danilo Maccari",
email: "maccari78@gmail.com",
password: "n0m3nN3sc10",
birthdate: new Date("1978-07-12"),
roles: [Roles.SUPERADMIN],

name: "Keanu Reeves",
email: "keanu@gmail.com",
password: "k3anu",
birthdate: new Date("1964-09-02"),
roles: [Roles.USER],

name: "Charlize Theron",
email: "charlize@gmail.com",
password: "ch4rlize",
birthdate: new Date("1975-08-07"),
roles: [Roles.ADMIN],
