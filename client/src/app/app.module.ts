import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './_modules/angular-material.module';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { AngularCdkModule } from './_modules/angular-cdk.module';
import { LoginDialogComponent } from './_components/login-dialog/login-dialog.component';
import { AngularCoreModule } from './_modules/angular-core.module';
import { LoginDialogModule } from './_modules/login-dialog.module';
import { ToastModule } from './_modules/toast.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './_components/home/home.component';
import { ContentManagerComponent } from './_components/content-manager/content-manager.component';
import { ContentViewerComponent } from './_components/content-viewer/content-viewer.component';
import { DevlogsComponent } from './_components/devlogs/devlogs.component';
import { NavpieComponent } from './_components/navpie/navpie.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MusicBlogComponent } from './_components/portfolio/music-blog/music-blog.component';
import { CommentTreeComponent } from './_components/comment-tree/comment-tree.component';
import { CommentBoxComponent } from './_components/comment-box/comment-box.component';
import { CommentCreatorComponent } from './_components/comment-creator/comment-creator.component';
import { InfoDisplayComponent } from './_components/info-display/info-display.component';
import { ButtonCascadeComponent } from './_components/button-cascade/button-cascade.component';
import { ActionDialogComponent } from './_components/content-manager/action-dialog/action-dialog.component';
import { HyperlinkDialogComponent } from './_components/content-manager/hyperlink-dialog/hyperlink-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PictureDialogComponent } from './_components/content-manager/picture-dialog/picture-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginDialogComponent,
    HomeComponent,
    ContentManagerComponent,
    ContentViewerComponent,
    DevlogsComponent,
    NavpieComponent,
    MusicBlogComponent,
    CommentTreeComponent,
    CommentBoxComponent,
    CommentCreatorComponent,
    InfoDisplayComponent,
    ButtonCascadeComponent,
    ActionDialogComponent,
    HyperlinkDialogComponent,
    PictureDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularCdkModule,
    AngularCoreModule,
    HttpClientModule,
    NgxSpinnerModule,
    LoginDialogModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
