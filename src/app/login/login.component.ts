import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email:string ='';
  password:string ='';
  message:string ='';

  constructor(private http:HttpClient, private authService:AuthService, private router:Router){}

  ngOnInit(): void {
      const userData = this.authService.getUserData();

      if(userData){
        this.email = userData.email;
        this.password = userData.password;
        this.authService.clearUserData();
      }
      else{
        console.error('No user data found');
      }
  }

  onLogin(email:string, password:string):void{
    this.http.post('http://localhost:5500/login',{email,password}).subscribe(
      (response:any)=>{
        console.log(response);
        localStorage.setItem('clientId',response.clientId);
        // console.log('login.component.ts', localStorage.getItem('clientId'));
        this.message = response.message; 
        // console.log(response.name);
        this.authService.setUserName(response.name);
        this.router.navigate(['/welcome'])
      },
      (error) => {
        this.message = 'Invalid email or password. Please try again.';
        console.error('Error in Logging In.',error);
      }
    );
  }
}
