import { Injectable } from '@angular/core';

const env = 'dev';

function getUrl() {
  if (env === 'dev') {
    return 'http://192.198.0.101:3315/api/v1/';
  } else if (env === 'stag') {
    return 'someurl';
  } else {
    return 'stageurl';
  }
}

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  url: any = getUrl();

  constructor() { }
}
