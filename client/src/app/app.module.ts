import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioComponent } from './portfolio/portfolio/portfolio.component';
import { SkilltreeComponent } from './skilltree/skilltree/skilltree.component';
import { DevlogsComponent } from './devlogs/devlogs/devlogs.component';
import { HomeComponent } from './home/home.component';
import { ContentManagerComponent } from './content-manager/content-manager.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ToastModule } from './_modules/toast.module';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginDialogOverlayService } from './_services/login-dialog-overlay.service';
import { LoginDialogModule } from './_modules/login-dialog.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginDialogComponent,
    PortfolioComponent,
    SkilltreeComponent,
    DevlogsComponent,
    HomeComponent,
    ContentManagerComponent,
    TestErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    OverlayModule,
    ToastModule.forRoot(),
    LoginDialogModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
