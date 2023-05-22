import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/AuthService";
import {Creator} from "../../data/models/creator";
import {FormControl, FormGroup} from "@angular/forms";
import {NotiflixService} from "../../core/services/notiflix.service";
import {OccasionTypeService} from "../../data/services/occasion-type.service";
import {OccasionType} from "../../data/models/occasion-type";
import {CreatorService} from "../../data/services/creator.service";
import { environment } from 'src/environments/environment';

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
  imageProfile: any;
  private selectedFile: File;
  preview: any = null;
  previewVideo: Boolean;
  selectedVideo:File;
  profilePicture:string = environment.pictureUrl;
  profileVideo:string = environment.mediaUrl;
  validationVisible:boolean = false;
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
          this.profilePicture = this.profilePicture + this.creator.profile_image;
          this.profileVideo = this.profileVideo + this.creator.video_presentation;
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

  upLaodProfileImage(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const file: File | null = this.selectedFile;
      if (file) {
        //If the file is an image
        if (file.type.split('/')[0] !== 'image') {
          this._notiflixService.failure('Format de fichier non pris en charge');
          return;
        }
        this.imageProfile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageProfile = file;
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.imageProfile);
        const formData = new FormData(); 
        formData.append('picture', this.imageProfile);
        this._creatorService.updateProfilPicture(formData, this.creator.id).subscribe(data=>{
          this._notiflixService.success('Votre photo de profil a été mise à jour');
          this._patchForm();
        });
      }
    }


  }

  onFileSelected(event: any) {
    //Si le fichier est une video mp4
    if(event.target.files[0].type == "video/mp4"){
      this.validationVisible = true;
      this.selectedVideo = event.target.files[0];
    }else{
      this._notiflixService.failure('Format de fichier non pris en charge');
    }
  }

  onFormSubmit(){
    if(this.selectedVideo){
      const formData = new FormData(); 
      formData.append('video', this.selectedVideo);
      this._creatorService.updateProfilVideo(formData, this.creator.id).subscribe(data=>{
        this._notiflixService.success('Votre video de présentation a été mise à jour');
        this._patchForm();
        this.validationVisible = false;
      });
    }
  }
}
