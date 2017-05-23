import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { GlobalService } from '../../providers/global-service';
import { PermissionService } from '../../providers/permission-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the Permission page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-permission',
  templateUrl: 'permission.html',
  providers: [DatePicker],
})
export class Permission {
  date = new Date();
  loading: Loading;
  permissions: Array<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private global: GlobalService, 
    private perm: PermissionService, 
    private datePicker: DatePicker, 
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Permission');
    this.permissions = this.global.user.permissions;
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
      title: 'Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  pick_date() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      minDate: new Date(),
      // maxDate: '',
      titleText: 'choose permission date',
      todayText: 'today',


    }).then(
      date => this.date = date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  sendPermission() {
    this.showLoading()
    this.perm.sendPermission(this.date).subscribe(allowed => {
      if (allowed) {
        let alert = this.alertCtrl.create({
          title: 'Sent',
          subTitle: 'Your request is waiting for approval',
          buttons: ['OK']
        });
        alert.present(prompt);
        this.navCtrl.setRoot(HomePage);
      } else {
        this.showError("something went wrong");
      }
    },
    error => {
      this.showError(error);
    });
  }

}
