import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    OverlayModule
  ]
})

export class AngularCdkModule { }
