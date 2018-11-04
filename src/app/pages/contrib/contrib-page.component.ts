import { Component, OnInit } from '@angular/core';
import {DinerService} from '../../diner.service';
import DinerAndContributions from '../../dtos/dinerAndContributions';

@Component({
  selector: 'app-map',
  templateUrl: './contrib-page.component.html',
  styleUrls: ['./contrib-page.component.scss'],
})
export class ContribPage implements OnInit {
    dinerAndContributions: DinerAndContributions;
  constructor(private dinerService: DinerService) { }

  ngOnInit() {
      this.dinerService.getCurrentDiner().subscribe(dinner => this.dinerAndContributions = dinner);
  }

  get dstring() {
      return this.dinerAndContributions ? JSON.stringify(this.dinerAndContributions, null, 2) : "";
  }
}
