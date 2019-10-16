import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authServices: AuthService, private router: Router) { }

  canActivate(Router, state: RouterStateSnapshot) {
    return this.authServices.user$.pipe(map(
      user => {
        if (user) { return true; }
        else {
          this.router.navigate(['/login'], { queryParams: { ReturnUrl: state.url } })
          return false;
        }
      }
    ))
  }

}
