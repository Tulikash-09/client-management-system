import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'',redirectTo:'/registration',pathMatch:'full'},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'scheduler', component:SchedulerComponent},
  {path:'welcome', component:WelcomeComponent},
  {path:'view/:clientId', component:ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
