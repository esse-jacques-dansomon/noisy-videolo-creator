import { Injectable } from '@angular/core';
import {ResourceService} from "../../core/services/resource.service";
import {HttpClient} from "@angular/common/http";
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";
import {Retrait} from "../models/retrait";
import {PaginationType} from "../../core/data/PaginationType";
import {Observable} from "rxjs";
import {TypeMoyen} from "../models/type-moyen";

@Injectable({
  providedIn: 'root'
})
export class RetraitService extends ResourceService<Retrait> {

  constructor(private http: HttpClient) {
    super(http);
    super.apiUrl =API_CONSTANTES.URI_RETRAITS;
  }

  getRetraitsByUser$ = (id: number) => this.http.get<PaginationType<Retrait>>(`${this.apiUrl}/creator/${id}`);

  getRetraitsByUserAndPage$ = (id: number, page: number) => this.http.get<PaginationType<Retrait>>(`${this.apiUrl}/creator/${id}?pageSize=${page}`);

  typeMoyens$: Observable<TypeMoyen[]> = this.http.get<TypeMoyen[]>(`${API_CONSTANTES.URI_RETRAITS}/type-moyens`);

  cancelRetrait$ = (id: number) => this.http.put<any>(`${API_CONSTANTES.URI_RETRAITS}/cancel/${id}`, {});
}
