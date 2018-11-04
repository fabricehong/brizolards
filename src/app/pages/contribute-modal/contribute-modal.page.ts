import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UsersService} from "../../users.service";
import Participant from "../../models/participant";
import {DinerService} from "../../diner.service";
import Ingredient from "../../models/ingredient";

@Component({
  selector: 'app-contribute-modal',
  templateUrl: './contribute-modal.page.html',
  styleUrls: ['./contribute-modal.page.scss'],
})
export class ContributeModalPage implements OnInit {

  @Input() ingredientId: string;
  @Input() recommendedQty: number;

  users: Participant[];
  ingredient: Ingredient;

  constructor(private modalController: ModalController, private userService: UsersService, private dinerService: DinerService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.dinerService.getIngredient(this.ingredientId).subscribe(ingredient => this.ingredient = ingredient);
  }

  cancel() {
    this.modalController.dismiss();
  }

  contribute() {

  }

}
