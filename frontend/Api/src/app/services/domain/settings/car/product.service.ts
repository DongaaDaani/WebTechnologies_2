import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { carDTO, carResponseDTO } from './car';
import { carController } from './car.controller.service';
import { toCreatedcar, tocars } from './car.model';

@Injectable({
    providedIn: 'root',
})
export class Productervice {

    constructor(private controller: carController) { }

    getcars(): Observable<carDTO[]> {
        return this.controller.getcars().pipe(map((response: carDTO[]) => {
            return response ? tocars(response) : null;
        }));
    }
    /*   brand: carDTO.brand,
      type: carDTO.type,
      consumption: carDTO.consumption,
      date: carDTO.date,
      price: carDTO.price,
      quantity: carDTO.quantity */
    createcar(brand: string, type: string, consumption: string, date: Date, price: number, quantity: number) {
        return this.controller.createcar({ brand, type, consumption, date, price, quantity }).pipe(map((response: carResponseDTO) => {
            return response ? toCreatedcar(response) : null;
        }));
    }

    // tslint:disable-next-line: variable-name
    editcar(_id: string, brand: string, type: string, consumption: string, date: Date, price: number, quantity: number) {
        return this.controller.editcar({ _id, brand, type, consumption, date, price, quantity }).pipe();
    }

    // tslint:disable-next-line: variable-name
    deletecar(_id: string) {
        return this.controller.deletecar(_id).pipe();
    }

}
