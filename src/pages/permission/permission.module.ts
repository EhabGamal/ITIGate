import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Permission } from './permission';

@NgModule({
  declarations: [
    Permission,
  ],
  imports: [
    IonicPageModule.forChild(Permission),
  ],
  exports: [
    Permission
  ]
})
export class PermissionModule {}
