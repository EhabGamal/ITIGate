import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ BarcodeScanner ]
})
export class HomePage {
  username = '';
  email = '';

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private auth: AuthService,
    private scanner: BarcodeScanner
  ) {
    let info = this.auth.getUserInfo();
    if(info === undefined){
      //this.navCtrl.setRoot(Login)
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

  presentLoadingDefault(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait..'
    });
    loading.present();
    setTimeout(()=>{
      loading.dismiss();
    }, 5000);
  }

  refreshContent(){

  }

  scanBarcode(){
    let scannerOptions = {
      showFlipCameraButton : true,
      showTorchButton : true,
      prompt : "Place a barcode inside the scan area",
      formats : "QR_CODE"
    };
    this.scanner.scan(scannerOptions).then(
      data => {
        alert(JSON.stringify(data));
      }
    ).catch(
      err => {
        alert(err);
      }
    );
  }

}
