import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private db:AngularFireDatabase) { }

  create(product)
  {
    this.db.list('/Products').push(product) ;
  }
  get()
  {
    return this.db.list('/Products').snapshotChanges() ;
  }
  getById(productId:string)
  {
    return this.db.object('/Products/' + productId ).valueChanges();
  }
  update(productId:string , product )
  {
    return this.db.object('/Products/'+ productId).update(product) ;
  }
  delete(productId:string)
  {
    return this.db.object('/Products/'+ productId).remove() ;
  }
}
