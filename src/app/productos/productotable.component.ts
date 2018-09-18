import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../utils/config.service';

@Component({
  selector: 'app-productotable',
  templateUrl: './productotable.component.html',
  styleUrls: ['./productotable.component.scss']
})
export class ProductotableComponent implements OnInit {

  productos: Number[] = [];

  constructor(public configService: ConfigService) { }

  ngOnInit() {
  }

}
