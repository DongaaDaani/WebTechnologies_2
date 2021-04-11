import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/domain/auth/current-user/current-user.service';
import { car } from 'src/app/services/domain/settings/car/car.model';
import { Productervice } from 'src/app/services/domain/settings/car/product.service';
import { CreateCarComponent } from '../create-cars/create-car.component';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private service: Productervice, private currentUserService: CurrentUserService) { }

  user: string;
  ELEMENT_DATA: car[];
  displayedColumns: string[];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // console.log(sessionStorage.getItem('currentUser'));
    this.user = this.currentUserService.getEmail();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.getAllProducts();
  }

  deleteProduct(product: car): void {

    this.service.deletecar(product._id).subscribe(val => {
      console.log(val);
      alert('Sikeres törlés!');
      this.getAllProducts();
    });

  }

  editProduct(car: car): void {
    localStorage.setItem('brand', car.brand);
    localStorage.setItem('type', car.type);
    localStorage.setItem('consumption', car.consumption);
    localStorage.setItem('price', car.price.toString());
    localStorage.setItem('quantity', car.quantity.toString());
    this.router.navigate(['settings/car', 'edit', car._id]);
  }

  getAllProducts(): void {
    this.service.getcars().subscribe(val => {
      this.ELEMENT_DATA = val;
      this.displayedColumns = ['brand', 'type', 'consumption', 'date', 'price', 'quantity', 'delete'];
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  navigateBack() {
    this.router.navigate(['../../']);
  }
  createProduct(): void {
    const dialogRef = this.dialog.open(CreateCarComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllProducts();
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['../../']);
  }

}
