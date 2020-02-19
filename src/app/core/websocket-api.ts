import {AppComponent} from '../app.component';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Injectable} from '@angular/core';
import {NotificationService} from './services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketApi {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/greetings';
  stompClient: any;
  appComponent: AppComponent;

  constructor(private notificationService: NotificationService) {
  }

  _connect(name: string) {

    console.log('Initialize Websocket Connection');
    // _this.stompClient.ws._transport.url.split('/')[_this.stompClient.ws._transport.url.split('/').length - 2]
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    // this.getQRCodeString(_this.stompClient.ws._transport.url.split('/')[_this.stompClient.ws._transport.url.split('/').length - 2]);
    _this.stompClient.connect({}, (frame) => {
      _this.stompClient.subscribe('/user/topic/reply', (sdkEvent) => {
        _this.onMessageReceived(sdkEvent);
      });

      this.getQRCodeString(_this.stompClient.ws._transport.url.split('/')[_this.stompClient.ws._transport.url.split('/').length - 2]);
      //
      // _this.stompClient.subscribe('/user/queue/error', (sdkEvent) => {
      //   _this.onMessageReceived(sdkEvent);
      // });

      // _this.stompClient.send("/app/chat.newUser", {}, JSON.stringify({
      //   sender: name,
      //   type: 'newUser'
      // }));

      // _this.stompClient.subscribe('/user/queue/reply', (message) => {
      //   _this.onMessageReceived(message);
      // });

      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);

  }

  getQRCodeString(sessionId: string) {
    let model = {
      id: sessionId,
      codeString: 'this is QR code string.....'
    }
    this.notificationService.getQRCodeString(model)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.error(error);
      });
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnect attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect('re-connecting name ');
    }, 5000);
  }

  /*
  * Send message to server via websocket
   */
  // _send(name, message) {
  //   console.log('Calling logout api via web socket');
  //   this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({
  //     sender: name,
  //     content: message
  //   }));
  // }

  _send(name, message) {
    console.log('Calling logout api via web socket');
    this.stompClient.send('/app/message', {}, JSON.stringify({
      name: message
    }));
  }

  onMessageReceived(message) {
    console.log('Message Received from Server :: ' + message.body);
    // this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}
