import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'products';

  constructor(private userServices: UserService,
    private AuthService: AuthService,
    private route: ActivatedRoute,
    router: Router) {

    this.AuthService.user$.subscribe(user => {
      if (user) {
        this.userServices.save(user) ; //save user to database

        let returnURl = this.route.snapshot.queryParamMap.get('ReturnUrl'); //Retrieve the return URL
        router.navigateByUrl(returnURl); //Retrieve the return URL 
      }
    })
  } 
}
