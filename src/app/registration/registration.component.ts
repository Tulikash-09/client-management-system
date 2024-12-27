import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{

  registrationForm!: FormGroup;
  message:string = '';
  
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router){}
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@*$])[A-Za-z0-9@$*]{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordsMatch});
  }

  passwordsMatch(group: FormGroup): {[key:string]: boolean} | null{
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    // console.log(password);
    // console.log(confirmPassword);

    // group.get('confirmPassword')?.updateValueAndValidity({ onlySelf: true });

    return password === confirmPassword ? null : {notMatching: true};
  }
  register(){
    if(this.registrationForm?.valid){
      const {name,email,address,password} = this.registrationForm.value;
    
      this.authService.registerUser({name, email, address, password}).subscribe((response: any) =>{
        this.message = response.message || 'Registration Successful';
        this.authService.setUserData(email,password);
        this.router.navigate(['/login']);
      }, (error: any) => {
        if(error.error && error.error.message){
          this.message = error.error.message; 
        }
      });
    }else{
      this.message = 'Please fill in all required fields correctly.';
    }
  }
 
}
