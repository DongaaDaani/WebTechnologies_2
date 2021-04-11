import { carDTO as carDTO, carResponseDTO as carResponseDTO } from './car';

export interface car {
    _id: string;
    brand: string;
    type: string;
    consumption: string;
    date: Date;
    price: number;
    quantity: number;
}

export interface carResponse {
    _id: string;
}
export function tocars(productResponse: carDTO[]): car[] {
    return productResponse.map(dto => tocar(dto));
}

export function tocar(carDTO: carDTO): car {
    return {
        _id: carDTO._id,
        brand: carDTO.brand,
        type: carDTO.type,
        consumption: carDTO.consumption,
        date: carDTO.date,
        price: carDTO.price,
        quantity: carDTO.quantity
    };
}

export function toCreatedcar(carDTO: carResponseDTO): carResponse {
    return {
        _id: carDTO._id,
    };
}

