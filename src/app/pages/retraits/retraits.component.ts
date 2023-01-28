import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PaginationType} from "../../core/data/PaginationType";
import {Retrait} from "../../data/models/retrait";
import {AuthService} from "../../core/services/AuthService";
import {RetraitService} from "../../data/services/retrait.service";
import {CreatorService} from "../../data/services/creator.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotiflixService} from "../../core/services/notiflix.service";
import {Confirm} from "notiflix";

@Component({
  selector: 'app-retraits',
  templateUrl: './retraits.component.html',
  styleUrls: ['./retraits.component.scss']
})
export class RetraitsComponent implements OnInit {

  retraits$: Observable<PaginationType<Retrait>>;

  moyensRetraits$ = this._creatorService.moyensRetraitsCreator$(this._authService.getUserConnectedInfo().id);
  retraitForm: FormGroup;

  constructor(
    private _authService : AuthService,
    private _retraitService : RetraitService,
    private _creatorService : CreatorService,
    private _notiflixService : NotiflixService
  ) { }
  ngOnInit(): void {
    this.retraits$ = this._retraitService.getRetraitsByUser$(this._authService.getUserConnectedInfo().id);
    this.retraitForm = new FormGroup({
      moyen_retrait_id: new FormControl(null, Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }

  translateStatus(status: string) {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Accepté';
      case 'canceled':
        return 'Annulé';
      default:
        return status;
    }
  }

  submit() {
    let data = {
      amount: this.retraitForm.value.amount as number,
      moyen_retrait_id: this.retraitForm.value.moyen_retrait_id as number,
    }
    this._creatorService.askRetrait$(data).subscribe(
      {
        next: (data) => {
          this.retraits$ = this._retraitService.getRetraitsByUser$(this._authService.getUserConnectedInfo().id);
          this._notiflixService.success('Demande de retrait envoyée avec succès');
        },
        error: (err) => {
          this._notiflixService.failure(err);
        }
      }
    )
  }

  cancelRetrait(id: number) {
    Confirm.show(
      'Notiflix Confirm',
      'Do you agree with me?',
      'Yes',
      'No',
      () => {
        this._retraitService.cancelRetrait$(id).subscribe(
          {
            next: (data) => {
              this.retraits$ = this._retraitService.getRetraitsByUser$(this._authService.getUserConnectedInfo().id);
              this._notiflixService.success('Demande de retrait annulée avec succès');
            },
            error: (err) => {
              this._notiflixService.failure(err.error.message || JSON.stringify(err));
            }
          }
        )
      },
      () => {
        this._notiflixService.failure('Annulation de la demande de retrait annulée');
      },{
      },);

  }

  pageChanged(number: number) {
    this.retraits$ = this._retraitService.getRetraitsByUserAndPage$(this._authService.getUserConnectedInfo().id, number);
  }

  createArray(total: number ) {
    let arr = [];
    for (let i = 1; i <= total; i++) {
      arr.push(i);
    }
    return arr;
  }
}
