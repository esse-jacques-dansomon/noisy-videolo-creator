import { Component } from '@angular/core';
import {filter, Subscription} from "rxjs";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {NotiflixService} from "./core/services/notiflix.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor( private router: Router, private notiflixService : NotiflixService) {}

  ngOnInit() {
    const elemMainPanel = <HTMLElement>document.querySelector('.scroll-top');
    // const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');


    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationStart) {
        this.notiflixService.loading();
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
      this.notiflixService.removeLoading();
    });
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // elemMainPanel.scrollTop = 0;
      // elemSidebar.scrollTop = 0;
    });
  }
}
