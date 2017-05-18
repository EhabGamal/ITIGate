import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QrService } from '../../providers/qr-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the Qrcode page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
  providers:[BarcodeScanner]
})
export class Qrcode {
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner, private qr: QrService,  private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Qrcode');
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

  scanCode(){
    let scannerOptions = {
      showFlipCameraButton : true,
      showTorchButton : true,
      prompt : "Place a barcode inside the scan area",
      formats : "QR_CODE"
    };
    this.scanner.scan(scannerOptions).then(
      data => {
        if (!data.cancelled){
          this.sendQr(data.text);
        }else{
          alert('Scanning was cancelled');
        }
      }
    ).catch(
      err => {
        alert(err);
      }
    );
  }

  sendQr(qrCode){
    this.showLoading()
    this.qr.sendQr(qrCode).subscribe(allowed => {
      if (allowed) {
        let alert = this.alertCtrl.create({
          title: 'Sent',
          subTitle: 'Your code sent successfully',
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
