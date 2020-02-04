import {AppComponent} from '../app.component';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export class WebsocketApi {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/greetings';
  stompClient: any;
  appComponent: AppComponent;

  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  _connect() {

    console.log('Initialize Websocket Connection');
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, (frame) => {
      _this.stompClient.subscribe('/user/queue/errors', (sdkEvent) => {
        _this.onMessageReceived(sdkEvent);
      });

      _this.stompClient.subscribe('/user/queue/reply', (message) => {
        _this.onMessageReceived(message);
      });

      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.discconect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnect attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /*
  * Send message to server via websocket
   */
  _send(message) {
    console.log('Calling logout api via web socket');
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    console.log('Message Received from Server :: ' + message.body);
    this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}
