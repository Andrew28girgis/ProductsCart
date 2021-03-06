

import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService , private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
    .pipe(switchMap(user => this.userService.getUser(user.uid).valueChanges()))
    .pipe(map( UserInfo => UserInfo.isAdmin ));
   }

}
