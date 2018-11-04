import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UsersService} from "../../users.service";
import Participant from "../../models/participant";
import {DinerService} from "../../diner.service";
import Ingredient from "../../models/ingredient";
import Contribution from "../../models/unitContribution";
import Diner from "../../models/diner";
import {DinerDashboardService} from "../../diner-dashboard.service";
import uuid from 'uuid/v1';


@Component({
  selector: 'app-contribute-modal',
  templateUrl: './contribute-modal.page.html',
  styleUrls: ['./contribute-modal.page.scss'],
})
export class ContributeModalPage implements OnInit {

  @Input() ingredientId: string;
  @Input() recommendedQty: number;
  @Output() submit = new EventEmitter<Contribution>();

  users: Participant[];
  diner: Diner;
  ingredient: Ingredient;
  contribution: Contribution = {
    id: uuid(),
    unitContribution: 0,
    ingredientId: '',
    userId: '',
    dinerId: '',
  };

  constructor(
      private modalController: ModalController,
      private userService: UsersService,
      private dinerService: DinerService,
      private dinerDashboardService: DinerDashboardService
  ) { }

  ngOnInit() {
    this.contribution.ingredientId = this.ingredientId;
    this.userService.getUsers().subscribe(users => this.users = users);
    this.dinerService.getDiner().subscribe(diner => {
      this.diner = diner;
      this.contribution.dinerId = diner.id;
      this.ingredient = diner.ingredients.find(ingredient => ingredient.id === this.ingredientId);
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

  contribute() {
      this.modalController.dismiss(this.contribution);
  }

}
