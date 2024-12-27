import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduler',
  standalone: false,
  
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css'
})
export class SchedulerComponent implements OnInit{

  schedulerForm!: FormGroup;
  message:string = '';

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router){}

  ngOnInit(): void {
      this.schedulerForm = this.fb.group({
        topic :['',Validators.required],
        nPeople: ['', Validators.required],
        time:['', Validators.required]
      });
  }
  submit(){
    if(this.schedulerForm.valid){
      const {topic, nPeople,time} = this.schedulerForm.value;
      const clientId = localStorage.getItem('clientId');
      // console.log('scheduler.component.ts', clientId);
      // console.log('Scheduler form value:', this.schedulerForm.value);
      const formattedData = {
        topic,
        nPeople: Number(nPeople),
        time,
        clientId: Number(clientId)
      };
      // console.log('Formatted data being sent:', formattedData);
      this.http.post('http://localhost:5500/scheduler',formattedData).subscribe(
        (response:any)=>{
          this.message = response.message;
          this.router.navigate(['/view',clientId]);
        },
        (error:any)=>{
          this.message = 'Unable to schedule a meeting at the moment';
          console.error('An error occured in scheduling the meeting');
        }
      );
    }
  }
 
}
