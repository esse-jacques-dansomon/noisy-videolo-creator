import { Injectable } from '@angular/core';
import {ResourceService} from "../../core/services/resource.service";
import {Creator} from "../models/creator";
import {HttpClient} from "@angular/common/http";
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";
import {MoyenRetrait} from "../models/moyen-retrait";

@Injectable({
  providedIn: 'root'
})
export class CreatorService extends ResourceService<Creator> {

  constructor(private http: HttpClient) {
    super(http);
    super.apiUrl =API_CONSTANTES.URI_CREATORS;
  }
  postMoyenRetrait$ = (data: any) => this.http.post<any>(`${API_CONSTANTES.URI_CREATORS}/moyen_retraits`, data);

  moyensRetraitsCreator$ = (id: number) => this.http.get<MoyenRetrait[]>(`${API_CONSTANTES.URI_CREATORS}/moyen_retraits/${id}`) ;

  askRetrait$ = (data: any) => this.http.post<any>(`${API_CONSTANTES.URI_CREATORS}/retrait`, data);

  getById$ = (id: number) => this.http.get<Creator>(`${API_CONSTANTES.URI_CREATORS}/${id}`);

  addOccasionType$ = (data: any, id : number) => this.http.post<any>(`${API_CONSTANTES.URI_CREATORS}/${id}/type_occasions`, data);

}
