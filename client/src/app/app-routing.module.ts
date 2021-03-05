import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagerComponent } from './content-manager/content-manager.component';
import { DevlogsComponent } from './devlogs/devlogs/devlogs.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio/portfolio.component';
import { SkilltreeComponent } from './skilltree/skilltree/skilltree.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'skilltree', component: SkilltreeComponent},
  {path: 'devlogs', component: DevlogsComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'manager', component: ContentManagerComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
