import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  BASE_URL = 'http://localhost:8080/qr';

  constructor(private httpClient: HttpClient) { }

  public getNotifications = (): Observable<any> => {
    return this.httpClient.get('http://localhost:8080/notification');
  }

  public getQRCodeString = (qrModel): Observable<any> => {
    return this.httpClient.post(this.BASE_URL, qrModel);
  }
}
