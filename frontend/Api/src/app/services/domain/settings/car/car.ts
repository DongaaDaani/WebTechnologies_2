export interface carDTO {
  _id: string;
  brand: string;
  type: string;
  consumption: string;
  date: Date;
  price: number;
  quantity: number;
}

export interface CreateCarDTO {
  brand: string;
  type: string;
  consumption: string;
  date: Date;
  price: number;
  quantity: number;
}

export interface carResponseDTO {
  _id: string;
}
