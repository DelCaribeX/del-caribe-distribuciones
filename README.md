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

El número comercial de WhatsApp ya está configurado en `script.js` en formato internacional, sin signos ni espacios.

Ejemplo:

    const WHATSAPP_NUMBER = "51969299674";

Para cambiar el destino de las cotizaciones, actualiza ese valor manteniendo el formato internacional.

## Vista local

    python3 -m http.server 4173

Luego abre http://localhost:4173.

## Publicación

El proyecto es estático y compatible con Vercel sin proceso de compilación.

