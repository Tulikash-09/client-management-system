import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-view',
  standalone: false,
  
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit, AfterViewInit{

  @ViewChild('filterInput', {static: true}) filterInput: ElementRef | undefined;
  @ViewChildren('meetingRow') meetingRow: QueryList<ElementRef> | undefined;

  meetingInfo:any[] = [];
  filteredMeetings:any[] = [];
  selectedMeeting:any = null;
  loading: boolean = true;

  constructor(private http:HttpClient){}

  ngAfterViewInit(): void {
    if(this.filterInput){
      this.filterInput.nativeElement.focus();
    }

    this.meetingRow?.forEach(row => {
      row.nativeElement.addEventListener('mouseover', () =>{
        row.nativeElement.style.backgroundColor = 'lightgray';
      });
      row.nativeElement.addEventListener('mouseout', () =>{
        row.nativeElement.style.backgroundColor = '';
      });
    });
  }

  ngOnInit(): void {
      this.fetchDetails();
  }

  fetchDetails(){
    const clientId = localStorage.getItem('clientId');
    this.loading = true;
    // console.log('view.component.ts:',clientId);
    this.http.get(`http://localhost:5500/view/${clientId}`).subscribe(
      (response:any)=>{
        // console.log(response[0]);
        this.meetingInfo = response;
        this.filteredMeetings = [...this.meetingInfo];
        this.loading = false;
      },
    (error:any)=>{
      console.error('Error in loading the details',error);
      this.loading = false;
    }
    );
  }

  viewMeetingDetails(meeting:any){
    this.selectedMeeting = meeting;
  }

  clearSelection(){
    this.selectedMeeting = null;
  }

  filterMeetings(topic:string){
    this.filteredMeetings = this.meetingInfo.filter(
      (meeting:any)=>
        meeting.topic.toLowerCase().includes(topic.toLowerCase())
    );
    if(this.filterMeetings.length > 0){
      this.selectedMeeting = this.filteredMeetings[0];
    }else{
      this.selectedMeeting = null;
    }

  }
}
