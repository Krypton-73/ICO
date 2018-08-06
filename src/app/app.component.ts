import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap'; // to fetch url params
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ocgdemo';

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activeroute)
    .map( (route) => {
      while (route.firstChild) { route = route.firstChild; }
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => {
      this.titleService.setTitle(event['title']);
    });
  }
}
