import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(public http: HttpClient, private globals: GlobalsService) {}

  chartQuery() {
    const url =
      'https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/usdeur.json';
    return this.http.get(url);
  }
}
