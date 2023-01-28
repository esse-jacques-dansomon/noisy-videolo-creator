import { Component, OnInit } from '@angular/core';
import {CreatorService} from "../../data/services/creator.service";
import {DemandService} from "../../data/services/demand.service";
import {AuthService} from "../../core/services/AuthService";
import {PaginationType} from "../../core/data/PaginationType";
import {Demande} from "../../data/models/demande";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  demands$ : Observable<PaginationType<Demande>>;

  constructor(private _demandService : DemandService, private _authService : AuthService) { }

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
}
