# Del Caribe Distribuciones

Sitio web comercial de Del Caribe Distribuciones para presentar la selección de vinos, piscos, cremas y macerados Rey Savino, así como soluciones para eventos.

## Contenido

- Portada y propuesta de valor
- Catálogo filtrable
- Paquetes para eventos
- Formulario que prepara una solicitud para WhatsApp
- Confirmación de mayoría de edad
- Diseño adaptable a celulares, tabletas y computadoras

## Configuración de WhatsApp

En el archivo script.js, reemplaza el valor de WHATSAPP_NUMBER con el número comercial en formato internacional, sin signos ni espacios.

Ejemplo:

    const WHATSAPP_NUMBER = "51987654321";

Si el número queda vacío, WhatsApp abrirá el selector de destinatario con el mensaje preparado.

## Vista local

    python3 -m http.server 4173

Luego abre http://localhost:4173.

## Publicación

El proyecto es estático y compatible con Vercel sin proceso de compilación.

