# RestApiNodeJs
Build, rest Api whit Node Js and Fastify

## Instalación del proyecto

// TODO

## Variables de entorno
El proyecto utiliza variables de entorno para agilizar el proceso de recuperación de datos bases y protección de algunos datos sensibles como la llave privada para la construcción de token JWT, datos de conexión a la base de datos y otras variables que se reutilizan dentro del proyecto y que estando como variables de entorno podemos centralizar sus valores evitando tener data quemada en el código. 

## Swagger 
Para acceder a la interfaz de Swagger, se deberá ingresar a http://localhost:8000/documentation/static/index.html, recuerde cambiar el nombre de su host, en el caso de utilizar uno diferente a localhost

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/rest/pic-evidence/swagger.png)

## Autenticación

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/rest/pic-evidence/swagger-auth.png)

Para la utilización del api Rest, se deberá utilizar un token que estará formado mediante JWT, para solicitarlo se deberá realizar una petición al endPoint correspondiente y pasar como body las credenciales bases para simular la creación del token JWT

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/rest/pic-evidence/swagger-auth-get-token.png)

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

![Swagger](https://github.com/DMBIAM/RestApiNodeJs/blob/main/rest/pic-evidence/swagger-user-endpoint.png)


### DDL Usuarios

1. **Creación de Table par los usuarios**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```
Este código SQL crea una tabla llamada `users` con tres columnas:

- `id`: Es un campo entero autoincremental que sirve como identificador único para cada usuario.
- `name`: Es un campo de tipo VARCHAR que almacena el nombre del usuario. Este campo no puede estar vacío (NOT NULL).
- `email`: Es un campo de tipo VARCHAR que almacena la dirección de correo electrónico del usuario. Para el ejemplo la tabla usuario almacena el email como ejemplo base, pero en la practica recomendada debe existir una tabla llamada email para que se almacenen todos los email que un usuario pueda tener, de esta forma podemos llevar una relación una a muchos, donde un usuario puede tener multiples direcciones de correo

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

### DDL Eventos
// TODO

### DML Eventos
// TODO

## CRUD Asignar asistentes

Este CRUD permite realizar las operaciones básicas para relacionar un usuario a uno o varios evento como asistentes, desde el CREATE, INSERT, UPDATE, DELETE, SELECT

### DDL Asistentes
// TODO

### DML Asistentes
// TODO