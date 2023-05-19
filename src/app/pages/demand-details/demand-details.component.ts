import { Component, OnInit } from '@angular/core';
import {DemandService} from "../../data/services/demand.service";
import {Demande} from "../../data/models/demande";
import {ActivatedRoute, Router} from "@angular/router";
import {Confirm} from "notiflix";
import {NotiflixService} from "../../core/services/notiflix.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'console';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-demand-details',
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.scss']
})
export class DemandDetailsComponent implements OnInit {

  baseUrl:string = environment.mediaUrl;
  code : string = this._route.snapshot.params['slug'];
  demand : Demande ;
  videoForm: FormGroup;
  selectedVideo:File;
  fileFormVisible:boolean = false;
  videoVisible:boolean = false;
  validationVisible:boolean = false;
  constructor(
    private _demandService : DemandService,
    private _route: ActivatedRoute,
    private _router : Router,
    private _notiflixService : NotiflixService,
    private formBuilder: FormBuilder
  ) {
    this.videoForm = this.formBuilder.group({
      video: [null]
    });
   }

  ngOnInit(): void {
    this._demandService.getDemandeByClientAndCode$(this.code).subscribe(
      {
        next: (data) => {
          this.demand = data;
          if(this.demand.demand_media){
            this.videoVisible = true;
            this.baseUrl = this.baseUrl + this.demand.demand_media.name;
          }
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

  onSubmit() {
    if(this.videoForm.valid){
      /* const videoFile: File = this.videoForm.get('video').value;
      console.log(videoFile);*/
      const formData = new FormData(); 
      formData.append('video', this.selectedVideo, this.selectedVideo.name);
      this._demandService.uploadVideos$(this.demand.id, formData).subscribe(
        data =>{
          this._notiflixService.success('Video envoyée avec succès');
          location.reload();
        }
      )
    }
  }

  onFileSelected(event: any) {
    //Si le fichier est une video mp4
    if(event.target.files[0].type == "video/mp4"){
      this.validationVisible = true;
      this.selectedVideo = event.target.files[0];
    }
    
  }

  formVisible(event: any){
    this.fileFormVisible = !this.fileFormVisible;
  }

  
}
