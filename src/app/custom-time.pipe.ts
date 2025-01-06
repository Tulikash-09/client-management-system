import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customTime',
  standalone: false
})
export class CustomTimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(value: any): string {
    const datePart = value.split('T')[0].split('-').reverse().join('-')
    const timePart = value.split('T')[1].split('.')[0];
    const formattedTime = this.datePipe.transform(`1970-01-01T${timePart}Z`, 'shortTime');
    // console.log(); // 024-12-25T05:00:00.000Z
    return `On ${datePart} at ${formattedTime}`;
  }

}
