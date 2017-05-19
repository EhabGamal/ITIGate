import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';

import { Chart } from 'chart.js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ BarcodeScanner ]
})
export class HomePage {
  username = '';
  email = '';
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
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
  
  ngAfterViewInit(){
    this.drawChart();
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

  showAlert(){
    this.alertCtrl.create({
      title:'Low Battery',
      subTitle:'15% of battery remaining',
      buttons:['Dismiss']
    }).present();
  }
  
  drawChart(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Deducted", "Remaining"],
        datasets: [{
          label: '# of marks',
          data: [12, 19],
          backgroundColor: [
            '#FF6384',
            '#36A2EB'
          ]
        }]
      }
    });
  }

}
