import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from 'firebase';
import { AuthService } from './auth.service';
import { UserInfo } from './userinfo';
 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase ,
    private AuthService:AuthService ) { }

  save(user: User) {
    this.db.object('/Users' + user.uid).update(
      {
        name: user.displayName,
        email: user.email
      })
  }
  getUser(uid: string) : AngularFireObject<UserInfo> {
    return this.db.object('/Users' + uid);
  }
 


}
