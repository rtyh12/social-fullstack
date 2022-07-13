import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

}
