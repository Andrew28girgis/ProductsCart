import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../model/IShoppinCart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(public services:AuthService ,  private CartService:ShoppingCartService) {

  }
  logout()
  {
    this.services.logout();
  }
  async ngOnInit() {
    this.cart$ = await this.CartService.getCart();

  }

}
