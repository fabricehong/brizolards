import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-contribute-modal',
  templateUrl: './contribute-modal.page.html',
  styleUrls: ['./contribute-modal.page.scss'],
})
export class ContributeModalPage implements OnInit {

  @Input() ingredientId: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cancel() {
    this.modalController.dismiss();
  }

}
