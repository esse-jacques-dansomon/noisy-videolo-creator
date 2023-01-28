import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/AuthService";
import {Creator} from "../../data/models/creator";
import {FormControl, FormGroup} from "@angular/forms";
import {NotiflixService} from "../../core/services/notiflix.service";
import {OccasionTypeService} from "../../data/services/occasion-type.service";
import {OccasionType} from "../../data/models/occasion-type";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  creator: Creator;
  profilForm : FormGroup ;
  occasionTypes: OccasionType[];

  constructor(
    private authService : AuthService,
    private _notiflixService : NotiflixService,
    private _occasionTypeService : OccasionTypeService
  ) { }

  ngOnInit() {
    this.profilForm = new FormGroup({
      first_name : new FormControl(),
      last_name : new FormControl(),
      titre : new FormControl(),
      email : new FormControl(),
      phone : new FormControl(),
      answer_time : new FormControl(),
      description : new FormControl(),
    });
    this._patchForm();
    this._occasionTypeService.getOneByTypeAndUri$('').subscribe(
      {
        next: (data) => {
          this.occasionTypes = data.data;
        }
      });
  }

  update() {
    this._notiflixService.loading();
    this.authService.updateCreator(this.profilForm.value, this.creator.id).subscribe(
      {
        next: (data) => {
          this._patchForm();
          this._notiflixService.removeLoading();
          this._notiflixService.success('Votre profil a été mis à jour');
        },error: (err) => {
          this._notiflixService.removeLoading();
          this._notiflixService.failure('Une erreur est survenue');
        }
      }
    )
  }

  private _patchForm() {
    this.authService.creator$.subscribe(
      {
        next: (data) => {
          this.creator = data;
          this.profilForm.patchValue(this.creator);
        }
      }
    )
  }

  getOccasionPrice(id: number) {
    let price = 0;
    // this.creator.occasionsTypes.forEach(
    //   (occasion) => {
    //     if (occasion.occasion_type_id == id){
    //       price = occasion.price;
    //     }
    //   }
    // );
    return price;
  }
}
