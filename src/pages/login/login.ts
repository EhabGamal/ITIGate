import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.navCtrl.setRoot(HomePage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
