import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-meeting-details',
  standalone: false,
  
  templateUrl: './meeting-details.component.html',
  styleUrl: './meeting-details.component.css'
})
export class MeetingDetailsComponent implements OnChanges {
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['meeting']){
      const updatedMeeting = {...changes['meeting'].currentValue};
      updatedMeeting.topic = updatedMeeting.topic.toUpperCase();
      this.meeting = updatedMeeting;
    }
  }

  @Input() meeting:any = null;
  @Output() close = new EventEmitter<void>();

  closeDetails(){
    this.close.emit();
  }

}
