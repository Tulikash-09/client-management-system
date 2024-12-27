import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  standalone: false,
  
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  userName:string='';

  constructor(private authService:AuthService){}

  ngOnInit(): void {
      const name = this.authService.getUserName();
      // console.log('Fetched userName:',name);
      if(name){
        this.userName = name;
      }else{
        console.error('No Username found');
      }
  }
}
