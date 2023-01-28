import { Injectable } from '@angular/core';
import {ResourceService} from "../../core/services/resource.service";
import {HttpClient} from "@angular/common/http";
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ResourceService<Category> {

  constructor(private http: HttpClient) {
    super(http);
    super.apiUrl =API_CONSTANTES.URI_CATEGORIES;
  }
}
