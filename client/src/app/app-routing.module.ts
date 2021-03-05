import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevlogsComponent } from './devlogs/devlogs/devlogs.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio/portfolio.component';
import { SkilltreeComponent } from './skilltree/skilltree/skilltree.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'skilltree', component: SkilltreeComponent},
  {path: 'devlogs', component: DevlogsComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
