import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  standalone: false,
  
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  userName:string='';
  clientId:number = 0;

  constructor(private authService:AuthService, private http:HttpClient){}

  ngOnInit(): void {
      const name = this.authService.getUserName();
      // console.log('Fetched userName:',name);
      if(name){
        this.userName = name;
        this.clientId = Number(localStorage.getItem('clientId'));
      }else{
        console.error('No Username found');
      }
  }

}
