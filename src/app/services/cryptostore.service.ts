import { Injectable } from '@angular/core';

import { LocalStorageService , SessionStorageService } from 'ngx-webstorage';
import * as CryptJS from 'crypto-js';
import * as sha256 from 'js-sha512';

@Injectable({
  providedIn: 'root'
})
export class CryptostoreService {

  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {
    // console.log('i cae');
  }

  InitKeySet() {
    const  chk = this.InitKeyGet();
    if ( chk === '' || chk === undefined || chk == null) {
      // console.log('im in');
      const key = 'This is just a demo ' + new Date();
      const val = sha256(key);
      this.localStorageService.store('AcexKeystore', val);
    } else {
      // console.log('a stored');
    }
  }

  InitKeyGet(): String {
    const str = this.localStorageService.retrieve('AcexKeystore');
    return str;
  }

  saveToLocal(name, s) {
    try {
      const key = this.InitKeyGet();
      const str = (CryptJS.AES.encrypt(s, key)).toString();
      this.localStorageService.store(name, str);
    } catch (e) {

    }
  }

  retrieveFromLocal(name): String {
    try {
      const key = this.InitKeyGet();
      const fromStore = this.localStorageService.retrieve(name);
      if ( fromStore === '' || fromStore == null || fromStore === undefined ) {
        return '';
      } else {
        const decrypt = CryptJS.AES.decrypt(fromStore, key);
        const str = decrypt.toString(CryptJS.enc.Utf8);
        return str;
      }
    } catch (e) {

    }
  }

  getLocalValue(name) {
    try {
      const fromStore = this.localStorageService.retrieve(name);
      return fromStore;
    } catch (e) {
      return '';
    }
  }

  getCryptValue(value) {
    try {
      const key = this.InitKeyGet();
      const fromStore = value;
      if ( fromStore === '' || fromStore == null || fromStore === undefined ) {
        return '';
      } else {
        const decrypt = CryptJS.AES.decrypt(fromStore, key);
        const str = decrypt.toString(CryptJS.enc.Utf8);
        return str;
      }
    } catch (e) {

    }
  }

  clearStorage(): String {
    this.localStorageService.clear();
    const chk = this.InitKeyGet();
    let val;
    if ( chk === '' || chk === undefined || chk == null) {
      const key = 'This is just a demo' + new Date();
      val = sha256(key);
      this.localStorageService.store('AcexKeystore', val);
    }
    return val;
  }

}
