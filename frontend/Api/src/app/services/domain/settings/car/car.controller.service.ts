import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carResponse } from './car.model';
import { CreateCarDTO as CreateCarDTO, carDTO as carDTO, } from './car';

@Injectable()
export abstract class carController {
    public abstract getcars(): Observable<carDTO[]>;
    public abstract createcar(request: CreateCarDTO): Observable<carResponse>;
    public abstract editcar(request: carDTO): Observable<carDTO>;
    // tslint:disable-next-line: variable-name
    public abstract deletecar(_id: string);
}
