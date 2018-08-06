import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyeventService {

  constructor() { }

  checkPassword(password) {
    try {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      const matched = password.match(regex);
      if (matched === '' || matched == null) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  toSubmit(evt) {
    try {
      const val =  evt.target.value;
      evt = (evt) ? evt : window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      // console.log(charCode,val)
      if (charCode === 13) {
        // this.submit();
        // console.log(charCode,val)
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  keyboardAllowEvent(evt) {
    try {
      const val =  evt.target.value;
      evt = (evt) ? evt : window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      // console.log(charCode,val)
      if (charCode === 60 || charCode === 62 || charCode === 123 || charCode === 125) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
