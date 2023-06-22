import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { AuthService } from 'src/app/auth.service';
import { NotificationsService } from 'src/app/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private location: Location,
    private notificationsService: NotificationsService
  ) {}
  currentPage: any;
  user: any;

  selectedSegmentButton: any = 'emails';
  incomingMeetings:any
  selectSegmentButtonHandler(segment: string): void {
    this.selectedSegmentButton = segment;
    localStorage.setItem('selectedSegment', this.selectedSegmentButton);
  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('authenticatedUser')!);
    this.currentPage = localStorage.getItem('currentPage');
    this.authService.getUser(loggedUser?._id).subscribe((response) => {
      this.user = response.user;
    });

    this.notificationsService.getNotifications().subscribe((response:any)=>{
      this.incomingMeetings = response.notifications;
    })
  }
}
