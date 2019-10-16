import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get(uid: string) {
    throw new Error("Method not implemented.");
  }

  user$: Observable<User>;
  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
    // return object and put it in user$ variable
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
