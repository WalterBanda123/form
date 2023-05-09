import { Time } from '@angular/common';
import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/company.service';

@Component({
  selector: 'app-meeting-modal',
  templateUrl: './meeting-modal.component.html',
  styleUrls: ['./meeting-modal.component.css', 'selectedDate-styles.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MeetingModalComponent),
      multi: true,
    },
  ],
})
export class MeetingModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) {}

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // console.log(typeof(date));

      // console.log(typeof(+this.data.meetingDate.split(' ')[2]));

      // Highlight the 1st and 20th day of each month.
      return date === +this.data.meetingDate.split(' ')[2]
        ? 'example-custom-date-class'
        : '';
    }

    return '';
  };

  editMeetingSchedule(updates: NgForm): void {
    const values = updates.value;

    const updatedValuesArr = [
      {
        propertyName: 'meetingDate',
        value: new Date(values.meetingDate).toDateString(),
      },
      { propertyName: 'meetingTime', value: values.meetingTime },
    ];

    this.companyService
      .updateCompany(this.data._id, updatedValuesArr)
      .subscribe((response) => {
        console.log(response);
      });
  }

  selectedDate?: Date;
  selectedTime?: any;
  selectedCompany: any;
  ngOnInit(): void {
    this.selectedCompany = this.data;
  }
}
