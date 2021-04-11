import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateCarDTO } from 'src/app/services/domain/settings/car/car';
import { Productervice } from 'src/app/services/domain/settings/car/product.service';

@Component({
  selector: 'app-create-cars',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router: Router, private service: Productervice) { }

  carFormGroup = new FormGroup({
    brand: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    type: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    consumption: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });
  car: CreateCarDTO;
  ngOnInit(): void { }

  succes() {
    this.snackBar.open('Success added', 'New car!', {
      duration: 1000,
    });
  }
  error() {
    this.snackBar.open('Unsuccessful Added', 'The car is exist!', {
      duration: 1000,
    });
  }
  createProduct = () => {
    this.car = {
      brand: this.carFormGroup.get('brand').value,
      type: this.carFormGroup.get('type').value,
      consumption: this.carFormGroup.get('consumption').value,
      date: this.carFormGroup.get('date').value,
      price: this.carFormGroup.get('price').value,
      quantity: this.carFormGroup.get('quantity').value,
    };
    this.service.createcar(this.car.brand, this.car.type, this.car.consumption, this.car.date, this.car.price, this.car.quantity).subscribe(val => {
      if (val != null) {
        this.succes();
      }

    }, (err) => {
      this.error();

    });
  }


}
