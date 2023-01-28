import { Component, OnInit } from '@angular/core';
import {RetraitService} from "../../data/services/retrait.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatorService} from "../../data/services/creator.service";
import {NotiflixService} from "../../core/services/notiflix.service";
import {AuthService} from "../../core/services/AuthService";

@Component({
  selector: 'app-retrait-compte',
  templateUrl: './retrait-compte.component.html',
  styleUrls: ['./retrait-compte.component.scss']
})
export class RetraitCompteComponent implements OnInit {
  AddMoyenForm: FormGroup;

  typeMoyens$ = this._retraitService.typeMoyens$;
  moyensRetraits$ = this._creatorService.moyensRetraitsCreator$(this._authService.getUserConnectedInfo().id);

  constructor(private _retraitService: RetraitService ,
              private _creatorService : CreatorService,
              private _notiflixService : NotiflixService,
              private _authService : AuthService
              ) { }

  ngOnInit(): void {
    this.AddMoyenForm = new FormGroup({
      type_moyen_id: new FormControl('', Validators.required),
      full_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
    })
  }

  update() {
    console.log("data => ",this.AddMoyenForm.value);
    this._creatorService.postMoyenRetrait$(this.AddMoyenForm.value).subscribe(
      {
        next: (data) => {
          this._notiflixService.success('Moyen de retrait ajouté avec succès');
          this.moyensRetraits$ = this._creatorService.moyensRetraitsCreator$(this._authService.getUserConnectedInfo().id);
        },
        error: (err) => {
          this._notiflixService.failure('Erreur lors de l\'ajout du moyen de retrait');
        }
      }
    );

    this.moyensRetraits$.subscribe(
      {
        next: (data) => {
          console.log("data => ",data);
        }
      }
    )
  }
}
