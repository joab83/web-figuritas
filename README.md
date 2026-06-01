# Web Figuritas

Frontend Angular para consultar, filtrar y reservar figuritas de un álbum. La aplicación consume una API local, muestra el stock actualizado y permite generar pedidos para enviarlos por WhatsApp.

## Funcionalidades

### Catálogo

- Visualización de las figuritas del álbum con imagen, SKU, nombre, precio y stock disponible.
- Indicadores visuales para figuritas agotadas y destacadas.
- Imágenes con fallback cuando el archivo JPG no existe.
- Actualización manual del catálogo mediante el botón `Refrescar`.
- Descuento visual del stock cuando una figurita se agrega al carrito.

### Filtros

- Búsqueda por SKU o nombre.
- Filtro por grupo o selección.
- Checkbox `Solo disponibles`.
- Checkbox `Solo destacadas`.
- Conservación de los filtros al refrescar la información.

### Carrito y pedidos

- Alta de figuritas desde el botón `+ Reservar`.
- Modal inicial para solicitar teléfono obligatorio y nombre opcional.
- Contador de figuritas en el botón `Carrito`.
- Modificación de cantidades, eliminación de figuritas y cálculo de subtotal.
- Notas opcionales antes de finalizar el pedido.
- Registro del pedido mediante la API.
- Apertura de WhatsApp con un mensaje precompletado que incluye detalle, total, cliente e ID del pedido.
- Pantalla de confirmación final y limpieza del carrito al volver al catálogo.

### Otras páginas

- `/`: catálogo principal.
- `/carrito`: carrito y finalización del pedido.
- `/como-comprar`: guía de compra y preguntas frecuentes.

## Requisitos

- Node.js 22 o compatible.
- npm.
- API backend disponible en `http://localhost:5080`.

## Instalación

```bash
npm install
```

En Windows con restricciones de PowerShell se puede utilizar:

```powershell
npm.cmd install
```

## Ejecución local

```bash
npm start
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

El proxy de desarrollo definido en `proxy.conf.json` redirige `/api` hacia:

```text
http://localhost:5080
```

## Endpoints utilizados

| Método | Endpoint | Uso |
| --- | --- | --- |
| `GET` | `/api/albums?id_album=1` | Información del álbum |
| `GET` | `/api/stickers?id_album=1` | Catálogo y stock de figuritas |
| `GET` | `/api/stickers/groups` | Opciones del filtro por grupo |
| `POST` | `/api/pedidos` | Registro del pedido |

Ejemplo de alta de pedido:

```json
{
  "nombre": "Juan Perez",
  "numero_telefono": "1123456789",
  "comentario": "Entregar por la tarde",
  "stickers": [
    {
      "id_album": 1,
      "sku": "ALG14",
      "cantidad": 2
    }
  ]
}
```

Respuesta esperada:

```json
{
  "id_pedido": 1
}
```

## Imágenes

Las imágenes JPG se encuentran en:

```text
public/images/stickers
```

La nomenclatura utiliza grupo, número de figurita e ID del álbum:

```text
{grupo}_{numero}_{id_album}.jpg
```

Ejemplo:

```text
ARG_17_1.jpg
```

## Estructura

```text
src/app
├── core
│   ├── models
│   ├── services
│   └── utils
└── features
    ├── cart
    ├── how-to-buy
    └── stickers
```

- `core`: modelos, servicios HTTP, estado compartido del carrito y utilidades.
- `features/stickers`: catálogo, tarjetas y filtros.
- `features/cart`: modal de reserva, carrito y confirmación del pedido.
- `features/how-to-buy`: guía de compra.

## Comandos

```bash
npm start       # Servidor de desarrollo
npm run build   # Build de producción
npm test        # Tests unitarios con Karma
```

En Windows también se pueden ejecutar con `npm.cmd`.

## Consideraciones actuales

- El carrito se mantiene en memoria mientras se navega dentro de la aplicación.
- Al recargar la pestaña, el carrito se reinicia.
- El stock se descuenta visualmente al agregar figuritas y se registra definitivamente al enviar el pedido.
- WhatsApp se abre con el mensaje preparado; el usuario debe confirmar el envío.
