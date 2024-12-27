import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: {
    email: string;
    password: string;
  } | null = null;
  private userName:string = '';

  constructor(private http:HttpClient) { }

  setUserData(email:string, password:string):void{
    this.userData = {email,password};
  }

  getUserData(): {email:string, password:string} | null {
    return this.userData;
  }

  clearUserData(): void{
    this.userData = null
  }

  registerUser(user:{name:string; email:string, address:string, password:string}): Observable<any>{
    return this.http.post('http://localhost:5500/registration',user);
  }   

  setUserName(name:string):void{
    if(name){
      this.userName = name;
      localStorage.setItem('userName', name);
    }else{
      console.error('Attempted to set an undefined or empty userName');
    }
    
  }

  getUserName():string{
    const storedName = localStorage.getItem('userName');
    if(this.userName){
      return this.userName
    }else if(storedName){
      return storedName;
    }else{
      console.error('UserName not found in AuthService or localStorage');
      return 'Guest';
    }
  }
}
