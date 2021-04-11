import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCarComponent } from './create-cars/create-car.component';
import { ListCarComponent } from './list-cars/list-car.component';

const routes: Routes = [
    { path: 'cars', component: ListCarComponent },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class carsRoutingModule { }
