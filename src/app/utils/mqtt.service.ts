import { Injectable, OnDestroy } from "@angular/core";
import * as Paho from "paho-mqtt";
import { Observable, Subject } from "rxjs";

export enum Topic {
  Servicio = "restaurantetic/servicio",
}

@Injectable({
  providedIn: "root",
})
export class MqttService implements OnDestroy {

  private subscribedTopics: Set<string>;
  private mqttClient: Paho.Client;
  private messageSubject: Subject<Paho.Message>;
  public message$: Observable<Paho.Message>;

  constructor() {
    this.subscribedTopics = new Set<string>();
    this.messageSubject = new Subject<Paho.Message>();
    this.message$ = this.messageSubject.asObservable();

    this.mqttClient = new Paho.Client("restaurantetic.com", 443, "/mqtt", Date.now().toString());
    // tslint:disable-next-line:max-line-length
    this.mqttClient.onConnectionLost = (responseObject: object) => this.mqttClient.connect({onSuccess: this.onConnected.bind(this), userName: "vmquser", password: "vmq12345", useSSL: true});
    this.mqttClient.onMessageArrived = this.onMessageArrived.bind(this);
    this.mqttClient.connect({onSuccess: this.onConnected.bind(this), userName: "vmquser", password: "vmq12345", useSSL: true});
  }

  public ngOnDestroy() {
    this.subscribedTopics.forEach((topic: string) => {
      this.mqttClient.unsubscribe(topic);
    });
    this.mqttClient.disconnect();
  }

  public publish(topic: Topic, message: string): void {
    this.mqttClient.send(topic, message, 2, false);
  }

  public subscribe(topic: Topic) {
    if (this.mqttClient.isConnected()) {
      this.mqttClient.subscribe(topic, {qos: 2});
    }
    this.subscribedTopics.add(topic);
  }

  private onConnected() {
    this.subscribedTopics.forEach((topic: string) => this.mqttClient.subscribe(topic, {qos: 2}));
  }

  private onMessageArrived(message: Paho.Message): void {
    this.messageSubject.next(message);
  }
}
