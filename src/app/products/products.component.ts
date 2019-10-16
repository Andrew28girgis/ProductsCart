import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { promise } from 'protractor';
import { ShoppingCart } from '../model/IShoppinCart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[];
  filterdProducts: any[];
  category = '';
  categories$;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ShoppingCartService: ShoppingCartService,
    private ProductsService: ProductsService,
    private CategoriesService: CategoriesService) {

    this.categories$ = this.CategoriesService.getCategories();
    this.subscription = this.ProductsService.get()
      .pipe(switchMap(prod => {
        this.products = prod // put the value of products from services into  products variable 
        return this.route.queryParamMap;
      }))
      //read value query string 
      .subscribe(params => {
        this.category = params.get('category'); // to get the category URL and put it in category variable 
        this.filterdProducts = this.category ?   // if category variable have a value put it in filterdProducts
          this.products.filter(p => p.payload.val().category === this.category) : this.products;
      })

  }


  async ngOnInit()  {
   this.cart$= await this.ShoppingCartService.getCart();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
