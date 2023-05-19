import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {Creator} from "../../data/models/creator";
import {AuthService} from "../../core/services/AuthService";
import { environment } from 'src/environments/environment';
import { CreatorService } from 'src/app/data/services/creator.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/user-profile', title: 'Profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/demandes', title: 'Demandes',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/retraits', title: 'Retraits',  icon:'ni-money-coins text-blue', class: '' },
  { path: '/comptes-retraits', title: 'Moyens retrait',  icon:'ni-credit-card text-blue', class: '' },
  // { path: '/parametres', title: 'Parametres',  icon:'ni-planet text-blue', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  creator$ : Observable<Creator>  = this._authService.creator$;
  myaccountLink= environment.publicWebsiteUrl;
  howDoesItWorkLink= environment.publicWebsiteUrl+"comment-ca-marche";
  creator: Creator;
  constructor(private router: Router, private _authService : AuthService, private _creatorService:CreatorService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this._creatorService.getById$(this._authService.getUserConnectedInfo().id).subscribe(
      {
        next: (data) => {
          this.creator = data;
          this.myaccountLink = this.myaccountLink+"createurs/"+this.creator.slug;
        }
      }
    )
  }
}
