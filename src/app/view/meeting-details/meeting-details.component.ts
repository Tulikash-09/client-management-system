import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-meeting-details',
  standalone: false,
  
  templateUrl: './meeting-details.component.html',
  styleUrl: './meeting-details.component.css'
})
export class MeetingDetailsComponent {

  @Input() meeting:any = null;
  @Output() close = new EventEmitter<void>();

  // ngOnchanges(changes: SimpleChanges){
  //   if(changes['meeting']){
  //     console.log('Selected meeting updated', changes['meeting'].currentValue);
  //   }
  // }

  closeDetails(){
    this.close.emit();
  }

}
