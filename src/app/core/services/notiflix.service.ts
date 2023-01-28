import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {Loading} from "notiflix/build/notiflix-loading-aio";
import {Report} from "notiflix";

@Injectable({
  providedIn: 'root'
})
export class NotiflixService {
  constructor() {
    Notify.init({
      width: '300px',
      position: 'right-bottom',
    });
  }

  public success(message: string, timeout: number = 5000) {
    Notify.success(message, {timeout});
  }

  public failure(message: string, timeout: number = 5000) {
    Notify.failure(message, {timeout});
  }

  public warning(message: string, timeout: number = 5000) {
    Notify.warning(message, {timeout});

  }

  public info(message: string, timeout: number = 5000) {
    Notify.info(message, {timeout});
  }

  public loading(){
    Loading.circle();
  }

  public removeLoading(){
    Loading.remove();
  }

  public reportSuccess(title, message, buttonText = "ok") {
    Report.success(title, message, buttonText);
  }

  public reportFailure(title, message, buttonText = "ok") {
    Report.failure(title, message, buttonText);
  }



}
