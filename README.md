# RestApiNodeJs
Build, rest Api whit Node Js and Fastify

## Instalación del proyecto

El proyecto consta de una aplicación en NodeJs que permite realizar operaciones CRUD sobre una serie de endPoints dispuestos para la creación de usuarios, eventos, registro de asistentes (Usuarios que asisten a eventos). Todas las operaciones realizan transacciones hacia una base de datos relacional en MYSQL

El proyecto está pensado para requerir una intervención mínima en el proceso de instalación, ya que se utiliza Docker para orquestar la infraestructura necesaria así como la conexión de red entre los contenedores, permitiendo que se instale de forma rápida la aplicación.

Como punto inicial se deberá 

1. Construir la imagen de Docker con el comando: docker build .
2. Ejecutar el docker compose: docker-compose up -d

En este punto se crearán los contenedores y las replicas de las imágenes del servicio api.
Un punto a tener en cuenta es no modificar el docker-compose y asignarle nombres custom al servicio que orquestará la imagen de la api, esto debido a que se está utilizando replicas y se requiere que Docker administre los nombres para evitar colisiones, lo mismo aplicará para el mapeo de puertos, solo se deberá definir el puerto de destino, pero el puerto asociado al origen del host deberá ser controlado por Docker para evitar la utilización de puertos que no está libres.

Si ha llegado a este punto, en su Docker Desktop podrá observar el contenedor y las imágenes ejecutándose de forma correcta, así como las réplicas

![Docker](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/docker-container-and-replicas.png)

Para corroborar que se tenga acceso desde su máquina host a la aplicación, en su docker ubique alguna de las replicas del api , luego anote el puerto de escucha de su máquina host, observará dos puertos separados por un dos puntos (:) el primer grupo de números que observe antes del : será el puerto que Docker reservó para pueda utilizar la aplicación, llegado a esta parte solo faltaría que en su navegador ingrese y escriba http://localhost:1234 donde 1234 será el puerto que Docker le asignó a su aplicación. El segundo grupo de números que observará en Docker asociado a su imagen después del : será el puerto interno de la aplicación, este siempre será el mismo para todas las replicas de una misma imagen, a menos que en el docker-compose se cambie

Si llegó a este punto podrá observar algo como:

![Docker](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/docker-run-api.png)

Lo que indica que su servicio api está escuchando de forma correcta y está listo para ser consumido sus recursos como apiRest.

Nota: La imagen de docker para el api rest en node, está preparada para realizar el clonado del proyecto de github y efectuar su instalación, para finalmente exponer el servicio de nodejs que permitirá utilizar la aplicación.

## Variables de entorno
El proyecto utiliza variables de entorno para agilizar el proceso de recuperación de datos bases y protección de algunos datos sensibles como la llave privada para la construcción de token JWT, datos de conexión a la base de datos y otras variables que se reutilizan dentro del proyecto y que estando como variables de entorno podemos centralizar sus valores evitando tener data quemada en el código. 

## Swagger 
Para acceder a la interfaz de Swagger, se deberá ingresar a http://localhost:8000/documentation/static/index.html, recuerde cambiar el nombre de su host, en el caso de utilizar uno diferente a localhost

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/swagger.png)

## Autenticación

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/swagger-auth.png)

Para la utilización del api Rest, se deberá utilizar un token que estará formado mediante JWT, para solicitarlo se deberá realizar una petición al endPoint correspondiente y pasar como body las credenciales bases para simular la creación del token JWT

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/swagger-auth-get-token.png)

Para la practica se utilizaron datos básicos almacenados en el archivo .env para simular la autenticación y generación del token

```json
{
  "email": "test@example.com",
  "userid": 123,
  "password": "secret"
}
```

Estos datos a forma de prueba son comparados en el routing rest\routes\api\auth\authRouter.js línea 94, de tal forma que si los valores que recibe el request son iguales a los almacenados en las variables de entorno se genere el token.

Todos los endpoint disponibles, requieren se envié el token JWT como cabecera de Authorization con el valor 'Bearer token' donde token sería el valor en texto claro del JWT recibido.

Nota: Esto solo aplica para dar un ejemplo, lo ideal es utilizar un proveedor de autenticación el cual administre los usuarios


## CRUD Usuarios

Este CRUD permite realizar las operaciones básicas sobre un objeto usuario, desde el CREATE, INSERT, UPDATE, DELETE, SELECT

Dentro del Swagger bajo el Tag 'Users' podrá encontrar todos los recursos disponibles para el CRUD de usuarios

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/swagger-user-endpoint.png)


### DDL Usuarios

1. **Creación de Table par los usuarios**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);
```
Este código SQL crea una tabla llamada `users` con tres columnas:

- `id`: Es un campo entero autoincremental que sirve como identificador único para cada usuario.
- `name`: Es un campo de tipo VARCHAR que almacena el nombre del usuario. Este campo no puede estar vacío (NOT NULL).
- `email`: Es un campo de tipo VARCHAR que almacena la dirección de correo electrónico del usuario. Para el ejemplo la tabla usuario almacena el email como ejemplo base, pero en la practica recomendada debe existir una tabla llamada email para que se almacenen todos los email que un usuario pueda tener, de esta forma podemos llevar una relación una a muchos, donde un usuario puede tener multiples direcciones de correo
- `created_at`: TIMESTAMP por defecto para el evento de creación de un registro
- `updated_at`: TIMESTAMP por defecto para el evento de actualización de un registro

Este esquema asegura que cada usuario tenga un identificador único en la base de datos.


### DML Usuarios

1. **Insertar nuevo usuario**

```sql
INSERT INTO users (name, email) VALUES ('nombre_usuario', 'correo_electronico');
```

Este SQL insertará un nuevo registro en la tabla users con el nombre y correo electrónico especificados.

2. **Consultar todos los usuarios**

```sql
SELECT * FROM users;
```
Este SQL recuperará todos los registros de la tabla users, devolviendo información sobre todos los usuarios almacenados en la base de datos.

3. **Consultar usuario por un ID**
```sql
SELECT * FROM users WHERE id = id_usuario;
```
Este SQL recuperará el registro de la tabla users correspondiente al ID de usuario especificado.

4. **Actualizar usuario**
```sql
UPDATE users SET nombre_columna = 'nuevo_valor' WHERE id = id_usuario;
```
Este SQL actualizará la información de un usuario específico en la tabla users. Se debe reemplazar nombre_columna por el nombre de la columna que deseas actualizar (por ejemplo, name o email) y nuevo_valor por el nuevo valor que deseas asignar a esa columna

5. **Eliminar usuario**
```sql
DELETE FROM users WHERE id = id_usuario;
```
Este SQL eliminará el registro de la tabla users correspondiente al ID de usuario especificado.


## CRUD Eventos

Este CRUD permite realizar las operaciones básicas sobre un objeto evento, desde el CREATE, INSERT, UPDATE, DELETE, SELECT

Dentro del Swagger bajo el Tag 'Events' podrá encontrar todos los recursos disponibles para el CRUD de eventos

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/swagger-events-endpoint.png)

### DDL Eventos
```sql
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    date TIMESTAMP,
    location POINT,
    location_name VARCHAR(255),
    id_city INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_city) REFERENCES city(id)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```
Esto crea la tabla eventos con las siguientes columnas:

- `id`: Un identificador único para cada evento, autoincremental y definido como la clave primaria.
- `name`: Un campo de texto para almacenar el nombre del evento.
- `location`: Campo destinado para almacenar las coordenadas del lugar del evento ejemplo: 10.9408 -74.78618
- `location_name`: Campo destinado para almacenar en nombre del lugar asociado al evento
- `id_city`: Un campo que establece la relación con la tabla ciudad, almacenando el ID de la ciudad donde se llevará a cabo el evento. Este campo está configurado como una llave foránea que hace referencia al campo id de la tabla ciudad.
- `created_at`: TIMESTAMP por defecto para el evento de creación de un registro
- `updated_at`: TIMESTAMP por defecto para el evento de actualización de un registro

### DML Eventos

1. **Insertar nuevo evento**

```sql
INSERT INTO events (name, id_city, location) VALUES ('nombre_evento', 'id_ciudad', POINT(10.9408 -74.78618));
```

Este SQL insertará un nuevo registro en la tabla events con el nombre y el identificador de la ciudad previamente creado.

2. **Consultar todos los eventos**

```sql
SELECT * FROM events;
```
Este SQL recuperará todos los registros de la tabla events, devolviendo información sobre todos los eventos almacenados en la base de datos.

3. **Consultar evento por un ID**
```sql
SELECT * FROM events WHERE id = id_evento;
```
Este SQL recuperará el registro de la tabla events correspondiente al ID de evento especificado.

4. **Actualizar evento**
```sql
UPDATE events SET nombre_columna = 'nuevo_valor' WHERE id = id_evento;
```
Este SQL actualizará la información de un evento específico en la tabla events. Se debe reemplazar nombre_columna por el nombre de la columna que deseas actualizar (por ejemplo, name o id_city) y nuevo_valor por el nuevo valor que deseas asignar a esa columna

5. **Eliminar evento**
```sql
DELETE FROM events WHERE id = id_evento;
```
Este SQL eliminará el registro de la tabla events correspondiente al ID de evento especificado.

6.  **Buscar evento cercano mediante coordenada**
```sql
SELECT 
    events.id, 
    events.name, 
    city.name AS city_name,
    events.location,
    ST_Distance_Sphere(events.location, ST_GeomFromText('POINT($latitud $longitud)')) AS distance
FROM events
JOIN city ON events.id_city = city.id
ORDER BY distance
LIMIT 1;
```
Este SQL permitirá buscar un evento cercano, pasando como parámetro una coordenada. Recuerde reemplazar $latitud y $longitud por sus valores correspondientes.

7. **Calcular la cantidad de asistentes por día de la semana**
```sql
SELECT e.id AS event_id,
    e.name AS event_name,
    DATE_FORMAT(e.date, '%Y-%m-%d') AS date,
    DAYNAME(e.date) AS day_of_week,
    COUNT(*) AS attendance_count
FROM assistants a
INNER JOIN events e ON a.id_event = e.id
WHERE DATE_FORMAT(e.date, '%Y-%m-%d') = ? AND a.id_event = ?
GROUP BY event_id, event_name, date, day_of_week
```
Permite calcular la cantidad de asistentes por dia, pasado una serie de id asociados a eventos existentes. Recuerde cambiar el símbolo ? por el valor correspondiente a comparar

## CRUD Asignar asistentes

Este CRUD permite realizar las operaciones básicas para relacionar un usuario a uno o varios evento como asistentes, desde el CREATE, INSERT, UPDATE, DELETE, SELECT

### DDL Asistentes
```sql
-- Crear la tabla "assistans"
CREATE TABLE assistants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_event INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_event) REFERENCES events(id)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```
Esto crea la tabla assistants con las siguientes columnas:

- `id`: Un identificador único para cada asistente, autoincremental y definido como la clave primaria.
- `id_user`: Un campo que establece la relación con la tabla users, almacenando el ID del usuario que es asistente del  evento. Este campo está configurado como una llave foránea que hace referencia al campo id de la tabla users.
- `id_event`: Un campo que establece la relación con la tabla events, almacenando el ID del evento al cual el usuario asiste. Este campo está configurado como una llave foránea que hace referencia al campo id de la tabla events.
- `created_at`: TIMESTAMP por defecto para el evento de creación de un registro
- `updated_at`: TIMESTAMP por defecto para el evento de actualización de un registro


### DML Asistentes

1. **Listar todos los asistentes**
```sql
SELECT assistants.id, 
       users.name AS user_name,
       users.email AS user_email,
       events.name AS event_name,
       city.name AS city_name,
       country.name AS country_name,
       assistants.created_at,
       assistants.updated_at
FROM assistants
JOIN users ON assistants.id_user = users.id
JOIN events ON assistants.id_event = events.id
JOIN city ON events.id_city = city.id
JOIN country ON city.id_country = country.id;
```

Permite Listar todos los asistentes registrados en la tabla assistants

2. **Listar un asistente por un parámetro predefinido**
```sql
SELECT assistants.id, 
       users.name AS user_name,
       users.email AS user_email,
       events.id AS event_id,
       events.name AS event_name,
       city.name AS city_name,
       country.name AS country_name,
       assistants.created_at,
       assistants.updated_at
FROM assistants
JOIN users ON assistants.id_user = users.id
JOIN events ON assistants.id_event = events.id
JOIN city ON events.id_city = city.id
JOIN country ON city.id_country = country.id
WHERE 
    (user_name IS NULL OR users.name = user_name) AND
    (user_id IS NULL OR users.id = user_id) AND
    (user_email IS NULL OR users.email = user_email) AND
    (event_id IS NULL OR events.id = event_id) AND
    (event_name IS NULL OR events.name = event_name) AND
    (city_id IS NULL OR city.id = city_id) AND
    (city_name IS NULL OR city.name = city_name) AND
    (country_id IS NULL OR country.id = country_id) AND
    (country_name IS NULL OR country.name = country_name);
```
3. **Registrar un asistante**
```sql
INSERT INTO assistants (id_user, id_event) VALUES ('id_user', 'id_event')
```

Permite agregar un asistente, es decir asociar un usuario a un evento. Recuerde reemplazar id_user y id_event por valores existentes en la tabla de usuarios y eventos, ya que la tabla assistants contiene la relación para poder registrar de forma correcta un asistente 

## DML País y Ciudad 

```sql
-- Crear la tabla "pais"
CREATE TABLE country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- Crear la tabla "ciudad"
CREATE TABLE city (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    id_country INT,
    FOREIGN KEY (id_country) REFERENCES country(id)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```

Esto creará dos tablas en tu base de datos:

La tabla pais contiene:
- `id`: un identificador único para cada país, autoincremental.
- `name`: un campo de texto para almacenar el nombre del país.
- `created_at`: TIMESTAMP por defecto para el evento de creación de un registro
- `updated_at`: TIMESTAMP por defecto para el evento de actualización de un registro

La tabla ciudad contiene:
- `id`: un identificador único para cada ciudad, autoincremental.
- `name`: un campo de texto para almacenar el nombre de la ciudad.
- `id_country`: un campo que establece la relación con la tabla pais, almacenando el ID del país al que pertenece la ciudad. Este campo está configurado como una llave foránea que hace referencia al campo id de la tabla pais.
- `created_at`: TIMESTAMP por defecto para el evento de creación de un registro
- `updated_at`: TIMESTAMP por defecto para el evento de actualización de un registro

Nota: Este DML es para apoyo, para efectos prácticos del ejercicio el llenado de la información de realizó de forma manual, ya que no se construyó un CRUD para poblar estos datos 

### Modelo relacional de la base de datos
![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/relational_database_model.png)

### Dump de la base de datos
Ubicación: resources\bd\api_db.sql

### Ejemplo de flujo CI/CD con Github Actions

Archivos:

- \.github\workflows\ci.yml
- \.github\workflows\ci.yml

Los anteriores archivos, permiten generan un flujo de CI/CD en Github Actions, de tal forma que podamos tener un proceso de integración y despliegue continuo base a implementar para nuestro proyecto.

### Diagrama arquitectura híbrida on-premise y cloud
![Architecture](https://github.com/DMBIAM/RestApiNodeJs/blob/main/resources/pic-evidence/hybrid_cloud_on_premise_architecture.png)

Explicación:

- `On-Premise Data`: Esta parte de la arquitectura representa la infraestructura local donde residen los datos de la aplicación.
- `Cloud Service`s: Aquí se encuentran los servicios en la nube utilizados para alojar las aplicaciones y proporcionar servicios adicionales como almacenamiento, computación, redes, etc.
- `API Gateway`: Actúa como punto de entrada único para todas las solicitudes de la API. Proporciona funciones de gestión de API como enrutamiento, balanceo de carga, limitación de velocidad, almacenamiento en caché y políticas de seguridad.
- `API Server`: Es el componente que ejecuta la lógica de negocio de la API. Puede ser escalado horizontalmente para manejar una gran cantidad de solicitudes y garantizar la disponibilidad y el rendimiento.
- `Database`: Almacena los datos de la aplicación. Será una base de datos SQL, dependiendo de los requisitos de la aplicación podrá ser un motor específico.

- La anterior arquitectura híbrida proporciona resiliencia al distribuir las cargas de trabajo entre la infraestructura local y en la nube. 
- La idempotencia se logra mediante el diseño adecuado de las API y la gestión de errores. 
- La escalabilidad se logra escalando horizontalmente los servidores de API según sea necesario y utilizando servicios en la nube para proporcionar recursos adicionales cuando sea necesario.

### Recurso extra

1. **Orquestación de cluster mediante Kubernetes**

Dentro del proyecto encontrará un ejemplo de como orquestar cluster utilizando Kubernetes, estos están separados para crear cluster para el api y para el motor de la base de datos.

Archivos de ejemplo:

- kubernetes\api.yml
- kubernetes\dc.yml

El cluster de api tiene un ingress que permite utilizar el recurso de las api mediante la url restapinodejs.localhost, la cual puede ser actualizada por una de preferencia.


1. **Colecciones y environment Postman**

- resources\postman-collection\nodeRestApi.postman_collection.json
- resources\postman-collection\nodeRestApi.postman_environment.json

Los anteriores archivos contienen collection con ejemplos guardados de todos los recursos disponibles mediante el api. de igual forma se incluye un environment para reutilizar el token en cada request ejecutado, así como otros datos que permiten agilizar la utilización de los recursos desde postman.

### Video explicación del proyecto

[Video](https://drive.google.com/drive/folders/1SoEc4gZRFNVvvbf6qVWosE0CIhNpavXk?usp=sharing)