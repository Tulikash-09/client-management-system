import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  standalone: false,
  
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  meetingInfo:any[] = [];
  constructor(private http:HttpClient){}
  ngOnInit(): void {
      this.fetchDetails();
  }

  fetchDetails(){
    const clientId = localStorage.getItem('clientId');
    // console.log('view.component.ts:',clientId);
    this.http.get(`http://localhost:5500/view/${clientId}`).subscribe(
      (response:any)=>{
        // console.log(response[0]);
        this.meetingInfo = response;
      },
    (error:any)=>{
      console.error('Error in loading the details',error);
    }
    );
  }
}
