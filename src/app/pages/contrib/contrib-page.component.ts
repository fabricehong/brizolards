import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DinerDashboardService} from '../../diner-dashboard.service';
import DinerAndContributions from '../../dtos/dinerAndContributions';
import {get, set} from 'idb-keyval';
import {ModalController} from "@ionic/angular";
import {ContributeModalPage} from "../contribute-modal/contribute-modal.page";
import Contribution from "../../models/unitContribution";
import {pipe} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-map',
  templateUrl: './contrib-page.component.html',
  styleUrls: ['./contrib-page.component.scss'],
})
export class ContribPage implements OnInit, AfterViewInit {
    dinerAndContributions: DinerAndContributions;
    name: string;
  constructor(private dinerService: DinerDashboardService, public modalController: ModalController) { }

  ngOnInit() {
      this.updateDiner();
      /* const result = await get('mystore');
      this.name = result.toString(); */
  }

  updateDiner() {
      this.dinerAndContributions = null;
      this.dinerService.getCurrentDiner().subscribe(dinner => this.dinerAndContributions = dinner);
  }

  get dstring() {
      return this.dinerAndContributions ? JSON.stringify(this.dinerAndContributions, null, 2) : "";
  }


    ngAfterViewInit(): void {
      /* setTimeout(() => {
          this.name = prompt("salut");
          set('mystore', this.name);
      }, 2000); */

    }


    async onContribute(ingredientId: string, recommendedQty: number) {
        const qty = Math.max(0, recommendedQty);
        const modal = await this.modalController.create({
            component: ContributeModalPage,
            componentProps: { ingredientId, recommendedQty: qty, submit: this.yo}
        });

        modal.onDidDismiss().then((d: any) => {
            this.dinerService.sendContribution(d.data)
                .subscribe(
                    () => this.updateDiner()
                );
        });
        //this.modalController.ionModalDidDismiss.subscribe(data => console.log(data));
        return await modal.present();
    }
}
