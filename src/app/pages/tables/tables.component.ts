import { Component, OnInit } from '@angular/core';
import {CreatorService} from "../../data/services/creator.service";
import {DemandService} from "../../data/services/demand.service";
import {AuthService} from "../../core/services/AuthService";
import {PaginationType} from "../../core/data/PaginationType";
import {Demande} from "../../data/models/demande";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  demands$ : Observable<PaginationType<Demande>>;

  constructor(private _demandService : DemandService, private _authService : AuthService) { }

  statusList = [
    {value: 'waiting_for_payment', viewValue: 'En attente de paiement'},
    {value: 'pending', viewValue: 'En cours'},
    {value: 'completed', viewValue: 'Terminé'},
    {value: 'accepted', viewValue: 'Accepté'},
    {value: 'canceled', viewValue: 'Annulé'},
    {value: 'waiting_for_refunded', viewValue: 'En attente de remboursement'},
    {value: 'refunded', viewValue: 'Remboursé'},
    {value: 'rejected', viewValue: 'Décliné'}
  ];
  filterDemand: FormGroup;

  ngOnInit() {
    if (!this._authService.isLoggedIn()) {
    } else {
      this._authService.connectedUser$.subscribe(
        {
          next: (user) => {
            this.demands$ = this._demandService.getOneByTypeAndUri$('creator/' + user.id) as Observable<PaginationType<Demande>>;
          }
        });

    }
    this.filterDemand = new FormGroup({
      status: new FormControl(''),
      code: new FormControl(''),
      name: new FormControl(''),
    });
  }

  translateStatus(status: string ) : string{
    switch (status) {
      case 'waiting_for_payment':
        return 'En attente de paiement';
      case 'pending':
        return 'En cours';
      case 'completed':
        return 'Terminé';
        case 'accepted':
        return 'Accepté';
      case 'canceled':
        return 'Annulé';
      case 'waiting_for_refunded':
        return 'En attente de remboursement';
      case 'refunded':
        return 'Remboursé';
      case 'rejected':
        return 'Décliné';
      default:
        return status;

    }
  }

  createArray(total: number ) {
    let arr = [];
    for (let i = 1; i <= total; i++) {
      arr.push(i);
    }
    return arr;
  }

  pageChanged(i: any) {
    this.demands$ = this._demandService.getOneByTypeAndUriAndPage$('creator/' +this._authService.getUserConnectedInfo().id, i) as Observable<PaginationType<Demande>>;
  }

  sumbmitFilter() {
    this.demands$ = this._demandService.addOneByTypeAndUri$('creator/' + this._authService.getUserConnectedInfo().id+ '/filter', this.filterDemand.value) as Observable<PaginationType<Demande>>;
  }
}
