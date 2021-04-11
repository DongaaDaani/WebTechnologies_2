import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCarComponent } from './list-cars/list-car.component';
import { CreateCarComponent } from './create-cars/create-car.component';
import { carsRoutingModule } from './car-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';



@NgModule({
  declarations: [ListCarComponent, CreateCarComponent],
  imports: [
    CommonModule,
    carsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class carsModule { }
