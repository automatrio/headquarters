import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../_components/toast/toast.component';
import { defaultToastConfig, TOAST_CONFIG_TOKEN } from '../_components/toast/toast-config';

@NgModule({
  declarations: [ToastComponent],
  // entryComponents: [ToastComponent],
  imports: [
    CommonModule
  ]
})
export class ToastModule {
  public static forRoot(config = defaultToastConfig): ModuleWithProviders<ToastModule> {
        return {
            ngModule: ToastModule,
            providers: [
                {
                    provide: TOAST_CONFIG_TOKEN,
                    useValue: { ...defaultToastConfig, ...config },
                },
            ],
        };
    }
 }
