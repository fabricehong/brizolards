import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './contrib-page.component.html',
  styleUrls: ['./contrib-page.component.scss'],
})
export class ContribPage implements OnInit {
    lat = 46.5196535;
    lng = 6.6322734;
  constructor() { }

  ngOnInit() {
  }
}
