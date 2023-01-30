import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/AuthService";
import {Creator} from "../../data/models/creator";
import {FormControl, FormGroup} from "@angular/forms";
import {NotiflixService} from "../../core/services/notiflix.service";
import {OccasionTypeService} from "../../data/services/occasion-type.service";
import {OccasionType} from "../../data/models/occasion-type";
import {CreatorService} from "../../data/services/creator.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  creator: Creator;
  profilForm : FormGroup ;
  occasionTypes: OccasionType[];
  occasionForm: FormGroup;

  constructor(
    private authService : AuthService,
    private _notiflixService : NotiflixService,
    private _occasionTypeService : OccasionTypeService,
    private _creatorService : CreatorService
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
    this.occasionForm = new FormGroup({
      priceNormal : new FormControl(),
      priceEntreprise : new FormControl(),
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
    this._creatorService.getById$(this.authService.getUserConnectedInfo().id).subscribe(
      {
        next: (data) => {
          this.creator = data;
          this.profilForm.patchValue(this.creator);
          this.occasionForm.get('priceNormal').patchValue(this.getOccasionPrice(1));
          this.occasionForm.get('priceEntreprise').patchValue(this.getOccasionPrice(2));
        }
      }
    )
  }

  getOccasionPrice(id: number) {
    let price = 0;
    this.creator.occasionsTypes.forEach(
      (occasion) => {
        if (occasion.occasion_type_id == id){
          price = occasion.price;
        }else{
          price = 0;
        }
      }
    );
    return price;
  }

  updateOccasionForm() {
    this._notiflixService.loading();
    let dataNormal = {
      occasion_type_id : 1,
      price : this.occasionForm.get('priceNormal').value,
    }
    let dataEntreprise = {
      occasion_type_id : 2,
      price : this.occasionForm.get('priceEntreprise').value,
    }

    if (this.occasionForm.get('priceNormal').value != 0){
      this.addOccasion(dataNormal);
    }
    if (this.occasionForm.get('priceEntreprise').value != 0){
      this.addOccasion(dataEntreprise);
    }
  }


  addOccasion(data : any){
    this._creatorService.addOccasionType$(data, this.creator.id).subscribe(
      {
        next: (data) => {
          this._notiflixService.removeLoading();
          this._notiflixService.success('Votre profil a été mis à jour');
        },
        error: (err) => {
          this._notiflixService.removeLoading();
          this._notiflixService.failure('Une erreur est survenue');
        }
      }
    );
  }


  saveEntreprise() {
    let dataEntreprise = {
      occasion_type_id : 2,
      price : this.occasionForm.get('priceEntreprise').value,
    }
    this.addOccasion(dataEntreprise);
  }

  saveNormal() {
    let dataNormal = {
      occasion_type_id : 1,
      price : this.occasionForm.get('priceNormal').value,
    }
    this.addOccasion(dataNormal);
  }
}
