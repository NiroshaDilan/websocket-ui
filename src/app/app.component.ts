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

  webSocketApi: WebsocketApi;
  greeting: any;
  name: string;

  // constructor(private notificationService: NotificationService) {
  //   this.getNotification();
  // }

  ngOnInit() {
    this.webSocketApi = new WebsocketApi(new AppComponent());
  }

  // getNotification() {
  //   this.notificationService.getNotifications()
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }

  connect(){
    this.webSocketApi._connect();
  }

  disconnect(){
    this.webSocketApi._disconnect();
  }

  sendMessage(){
    this.webSocketApi._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }
}
