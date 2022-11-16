import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { AddComponent } from './component/add/add.component';
import { ContactComponent } from './component/contact/contact.component';
import { EditComponent } from './component/edit/edit.component';
import { HomeComponent } from './component/home/home.component';
import { StatusComponent } from './component/status/status.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {  path: 'contact', component: ContactComponent,
      children:
    [
       { path: 'add', component: AddComponent },
       { path: 'add1/:id', component: AddComponent },
       { path: 'edit', component: EditComponent }
    ]
  },

 
  // Lazy loading
  { path: 'success',loadChildren:()=>import('./success/success.module').then(opt=>opt.SuccessModule)},
  // standalone component route(Login component)

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
