import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defaultLoginDialogConfig, LoginDialogConfig, LOGIN_DIALOG_CONFIG_TOKEN } from '../_components/login-dialog/login-dialog-config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class LoginDialogModule { 

  public static forRoot(config: LoginDialogConfig = defaultLoginDialogConfig): ModuleWithProviders<LoginDialogModule> {
    return {
      ngModule: LoginDialogModule,
      providers:
      [
        {
          provide: LOGIN_DIALOG_CONFIG_TOKEN,
          useValue: { ...defaultLoginDialogConfig, ...config }
        }
      ]
    }
  }
}


