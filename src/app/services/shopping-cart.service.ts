import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../model/IShoppinCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {

  }
  private create() {                              // create the shopping cart in the database 
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }


  private async getOrCreateCartId() {                    //check for cart id and give to me cart id 
    let cartID = localStorage.getItem('cartID');
    if (cartID) return cartID;

    let result = await this.create();    // create al cart 
    localStorage.setItem('cartID', result.key); // set the cart
    return result.key;
  }

  public async getCart() : Promise<Observable<ShoppingCart>> {
    let cartID = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartID)
    .valueChanges().pipe(map(cart=> new ShoppingCart((cart as any).items )))
  }

  getItem(cartId: string, productID: string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productID)
  }

  async addToCart(product) {
    this.updateCart(product, 1);
  }
  async removeFromCart(product) {
    this.updateCart(product, -1);
  }

  async updateCart(product, quantityState) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key)

    items$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists()) {
        items$.update({ quantity: item.payload.val().quantity + quantityState });
      } else {
        items$.update({
          product: {
            title: product.payload.val().title,
            price: product.payload.val().price,
            category: product.payload.val().category,
            imageUrl: product.payload.val().imageUrl
          }, quantity: 1
        });

      }
    })
  }
}
