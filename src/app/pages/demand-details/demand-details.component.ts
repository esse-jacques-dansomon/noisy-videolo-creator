import { Component, OnInit } from '@angular/core';
import {DemandService} from "../../data/services/demand.service";
import {Demande} from "../../data/models/demande";
import {ActivatedRoute, Router} from "@angular/router";
import {Confirm} from "notiflix";
import {NotiflixService} from "../../core/services/notiflix.service";

@Component({
  selector: 'app-demand-details',
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.scss']
})
export class DemandDetailsComponent implements OnInit {

  code : string = this._route.snapshot.params['slug'];
  demand : Demande ;
  constructor(
    private _demandService : DemandService,
    private _route: ActivatedRoute,
    private _router : Router,
    private _notiflixService : NotiflixService

  ) { }

  ngOnInit(): void {
    this._demandService.getDemandeByClientAndCode$(this.code).subscribe(
      {
        next: (data) => {
          this.demand = data;
        },
        error: (err) => {
          this._router.navigateByUrl('/demandes');
        }
      }
    )
  }

  cancelDemand(id : number) {
    Confirm.show(
      'Annuler la demande de video',
      'Voulez-vous vraiment annuler la demande de video ?',
      'Oui',
      'Non',
      () => {
        this._notiflixService.loading();
        this._demandService.putDemandeStatus$(this.demand.id).subscribe(
          {
            next: (data) => {
              this._notiflixService.removeLoading();
              this.demand = data;
              this._notiflixService.success('Demande de retrait annulée avec succès');
            },
            error: (err) => {
              this._notiflixService.removeLoading();
              this._notiflixService.failure(err.error.message);
              // this._router.navigateByUrl('/demandes');

            }
          }
        )
      },
      () => {
        this._notiflixService.failure('Annulation de la demande de retrait annulée');
      },{
      },);

  }
}
