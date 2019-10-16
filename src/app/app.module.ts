import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from 'angularfire2' ;
import {AngularFireDatabaseModule} from 'angularfire2/database' ;
import { environment } from 'src/environments/environment.prod';
import { LogoutComponent } from './logout/logout.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { CheckOutComponent } from './check-out/check-out.component';
import { OdrerSuccessComponent } from './odrer-success/odrer-success.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoriesService } from './services/categories.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { ProductsService } from './services/products.service';
import { DataTablesModule } from 'angular-datatables';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProdcartComponent } from './prodcart/prodcart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ShoppingCartComponent,
    LoginComponent,
    LogoutComponent,
    CheckOutComponent,
    OdrerSuccessComponent,
    AdminUsersComponent,
    ProductFormComponent,
    ProdcartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    CustomFormsModule ,
    DataTablesModule
  ],
  providers: [
    AngularFireAuth,
    AuthGuardService,
    AuthService ,
    UserService,
    CategoriesService,
    ProductsService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
