import { Component, OnInit } from '@angular/core';
import {DemandService} from "../../data/services/demand.service";
import {Demande} from "../../data/models/demande";
import {ActivatedRoute, Router} from "@angular/router";

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

}
