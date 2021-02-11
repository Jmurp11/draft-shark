import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  isLoading = new BehaviorSubject<boolean>(true);

  constructor() { }

  setValue(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
}
