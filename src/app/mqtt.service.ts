import { Injectable, OnDestroy } from "@angular/core";
import * as Paho from "paho-mqtt";
import { Observable, Subject } from "rxjs";

export enum Topic {
  Cocina = "/cocina",
  Servicio = "/servicio",
  Caja = "/caja",
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

    this.mqttClient = new Paho.Client("restaurantetic.com", 880, "/mqtt", Date.now().toString());
    // tslint:disable-next-line:max-line-length
    this.mqttClient.onConnectionLost = (responseObject: object) => this.mqttClient.connect({onSuccess: this.onConnected.bind(this), userName: "vernemqUser", password: "vernemq12345"});
    this.mqttClient.onMessageArrived = this.onMessageArrived.bind(this);
    this.mqttClient.connect({onSuccess: this.onConnected.bind(this), userName: "vernemqUser", password: "vernemq12345"});
  }

  public ngOnDestroy() {
    this.mqttClient.disconnect();
  }

  public publish(topic: Topic, message: string): void {
    this.mqttClient.send(topic, message, 2, true);
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
