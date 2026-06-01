export interface CreateOrderSticker {
  id_album: number;
  sku: string;
  cantidad: number;
}

export interface CreateOrderRequest {
  nombre: string;
  numero_telefono: string;
  comentario: string;
  stickers: CreateOrderSticker[];
}

export interface CreateOrderResponse {
  id_pedido: number;
}
