import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the Qrcode page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
  provides:[BarcodeScanner]
})
export class Qrcode {

  constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Qrcode');
  }
  
  scanCode(){
    this.scanner.scan().then(
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
