# Task Manager Mongo & Python

## Descripción
Este proyecto es un CRUD pequeño de usuarios utilizando Node.js para el frontend, Bootstrap para el diseño, y Python Flask para el backend. La conexión a la base de datos se realiza con PyMongo y se puede usar MongoDB de manera local o una instancia de Atlas.

## Requisitos
- Node.js
- Python
- MongoDB

Los requerimientos de Python se encuentran en el archivo `requirements.txt`.

## Instalación
1. Clonar el repositorio.
2. Instalar dependencias de Python:
    ```bash
    pip install -r requirements.txt
    ```
3. Verificar la cadena de conexión con MongoDB. Si se está usando un servicio local, la cadena de conexión debe ser:
    ```python
    app.config["MONGO_URI"] = "mongodb://localhost:27017/crudDB"
    ```
    en el archivo `backend/src/backend.py`. Si se está usando una base de datos en Atlas, la cadena de conexión debe ser algo similar a esto:
    ```python
    mongodb+srv://admin:<password>@nombre_cluster.jcamlh5.mongodb.net/nombre_base_datos?retryWrites=true&w=majority&appName=nombre_cluster
    ```

## Esquema de Usuario
El esquema JSON para los usuarios es el siguiente:
```json
{
  "_id": {
    "$oid": "6657327b2e2b67c31077d920"
  },
  "name": "Alice Charles",
  "email": "alice.johnson@example.com",
  "password": "password1",
  "phone_numbers": [
    {
      "number": "5678901234",
      "type": "mobile"
    }
  ]
}
```
## Ejecución

1. Navegar a la carpeta `backend` y ejecutar el script de Python:
    ```bash
    python .\src\backend.py
    ```

2. Volver a la raíz del proyecto y luego ir a la carpeta `frontend`:
    ```bash
    cd frontend
    ```

3. Ejecutar el frontend:
    ```bash
    npm start
    ```

Con estos pasos, tendrás el proyecto en funcionamiento.
