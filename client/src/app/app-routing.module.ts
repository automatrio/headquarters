import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagerComponent } from './_components/content-manager/content-manager.component';
import { HomeComponent } from './_components/home/home.component';
import { MusicBlogComponent } from './_components/portfolio/music-blog/music-blog.component';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { UnsavedChangesGuard } from './_guards/unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'music', component: MusicBlogComponent},
  {path: 'manager', component: ContentManagerComponent, canActivate: [AuthenticationGuard], canDeactivate: [UnsavedChangesGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
