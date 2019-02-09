import { Component, OnInit } from "@angular/core";
import { Message } from "paho-mqtt";
import { MqttService, Topic } from "src/app/mqtt.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  message: string;
  text: string;

  constructor(private mqttService: MqttService) {
    this.mqttService.message$.subscribe(this.onMessageArrived.bind(this));
  }

  ngOnInit() {
    this.mqttService.subscribe(Topic.Servicio);
  }

  private onMessageArrived(message: Message) {
    if (message.destinationName === Topic.Servicio) {
      this.text = message.payloadString;
    }
  }

  public onPublish() {
    this.mqttService.publish(Topic.Cocina, this.message);
  }
}
