import { Component,  OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy ,OnInit {


  products: any[];
  filteredProducts: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  subscribe: Subscription; // to do un subscribtion

  constructor(private ProductsService: ProductsService) {
    this.subscribe = this.ProductsService.get().subscribe(prod =>
   {   this.filteredProducts = this.products = prod;
       this.dtTrigger.next(); // this is for angular table
    }) ;
      

  }

  filter(queryString: string) {
    if (queryString) {
      this.filteredProducts = this.products.filter(p => p.payload.val().title
        .toLowerCase().includes(queryString.toLocaleLowerCase()))
    } else {
      this.filteredProducts = this.products;
    }

  }
  ngOnInit(): void {                                   // this is for angular table
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
  }
};
  ngOnDestroy(): void {      // it work in the end  to make unsubscribe
    this.subscribe.unsubscribe();
  }
 
}
