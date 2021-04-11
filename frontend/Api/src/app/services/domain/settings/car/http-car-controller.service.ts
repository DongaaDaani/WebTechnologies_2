import { HttpHeaders, HttpParameterCodec, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { carController } from './car.controller.service';
import { carDTO, carResponseDTO, CreateCarDTO } from './car';
import { carResponse } from './car.model';

@Injectable()
export class HttpProductController implements carController {
    private readonly BASE_URL = `http://localhost:5000/api/car`;
    public defaultHeaders = new HttpHeaders();
    public encoder: HttpParameterCodec;
    constructor(private httpClient: HttpClient) { }
    public createcar(request: CreateCarDTO): Observable<carResponseDTO> {
        return this.httpClient.post(`${this.BASE_URL}/add`, request).pipe(
            map((res: carResponse) => res)
        );
    }
    public editcar(request: carDTO): Observable<carDTO> {
        return this.httpClient.put(`${this.BASE_URL}/${request._id}`, request).pipe(
            map((res: carDTO) => res)
        );
    }
    // tslint:disable-next-line: variable-name
    public deletecar(_id: string) {
        return this.httpClient.post(`${this.BASE_URL}/delete/${_id}`, null).pipe();
    }
    public getcars(): Observable<carDTO[]> {
        return this.httpClient.post(`${this.BASE_URL}`, null).pipe(
            map((res: carDTO[]) => res)
        );
    }

}
