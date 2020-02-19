import {Component, OnInit} from '@angular/core';
import {WebsocketApi} from './core/websocket-api';
import {NotificationService} from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular8-springboot-websocket';

  // webSocketApi: WebsocketApi;
  greeting: any;
  name: string;
  message: string

  constructor(private notificationService: NotificationService,
              private websocketApi: WebsocketApi) {

  }

  ngOnInit() {
    // this.webSocketApi = new WebsocketApi(new AppComponent());
  }

  // getNotification() {
  //   this.notificationService.getNotifications()
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }

  connect() {
    // this.webSocketApi._connect(name);
    this.websocketApi._connect(name);
    // this.getQRCodeString();
  }

  getQRCodeString() {
    let model = {
      id: '001',
      codeString: 'this is QR code string.....'
    }
    this.notificationService.getQRCodeString(model)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.error(error);
      });
  }

  disconnect() {
    // this.webSocketApi._disconnect();
    this.websocketApi._disconnect();
  }

  sendMessage() {
    // this.webSocketApi._send(this.name, this.message);
    this.websocketApi._send(this.name, this.message)
  }

  handleMessage(message){
    this.greeting = message;
  }
}
