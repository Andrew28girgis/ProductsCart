import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-prodcart',
  templateUrl: './prodcart.component.html',
  styleUrls: ['./prodcart.component.css']
})
export class ProdcartComponent implements OnInit {
  @Input('product') product;
  @Input('shoppingCart') shoppingCart;

  constructor(private ShoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.ShoppingCartService.addToCart(this.product)
  }

  removeFromCart() {
    this.ShoppingCartService.removeFromCart(this.product)
  }
  getQunatity() {
    if (!this.shoppingCart) { return 0; }
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

  ngOnInit() {
  }

}
