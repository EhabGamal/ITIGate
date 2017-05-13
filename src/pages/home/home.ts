import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  constructor(public navCtrl: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo();
    if(info === undefined){
      this.navCtrl.setRoot(Login)
    }else{
      this.username = info['name'];
      this.email = info['email'];
    }
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(Login)
    });
  }
  
}
