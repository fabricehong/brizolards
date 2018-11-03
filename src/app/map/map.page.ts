import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    lat = 46.5196535;
    lng = 6.6322734;
  constructor() { }

  ngOnInit() {
  }
}
