Prueba De Conocimiento
Parte 1 (PHP y JavaScript):
Para la primera parte se tienen los siguientes archivos:

-> index.html
-> files-handler.php
-> index.js
-> list.php
-> La carpeta uploads

Instrucciones:
Se debe utilizar la librería CompressorJS  para que, mediante un input de tipo file, se carguen múltiples imágenes en la carpeta uploads usando el archivo files-handler.php. Esto debe ser con AJAX, files-handler.php deberá dar una respuesta JSON con las propiedades success (Boolean) y message (String) para manejar los mensajes de error o éxito.
El archivo index.html no requiere ninguna modificación, sin embargo en files-handler.php y en index.js está parte del código predefinido que puede estar incompleto o con errores, por lo que deben corregirse o completarse.
Debe validarse (desde el cliente y desde el servidor) que únicamente se carguen archivos jpg y presentar mensajes de éxito o error con el complemento Toast de Fomantic UI .
En list.php deben listarse las imágenes cargadas.