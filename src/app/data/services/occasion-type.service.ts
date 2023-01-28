import { Injectable } from '@angular/core';
import {OccasionType} from "../models/occasion-type";
import {ResourceService} from "../../core/services/resource.service";
import {HttpClient} from "@angular/common/http";
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";

@Injectable({
  providedIn: 'root'
})
export class OccasionTypeService extends ResourceService<OccasionType> {
  constructor(private http: HttpClient) {
    super(http);
    super.apiUrl =API_CONSTANTES.URI_TYPES_OCCASIONS;
  }
}
