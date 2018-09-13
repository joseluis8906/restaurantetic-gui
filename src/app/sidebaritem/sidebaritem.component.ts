import { Component, OnInit, Input } from '@angular/core';
import { SideBarItem } from '../utils/SideBarItem';

@Component({
  selector: 'app-sidebaritem',
  templateUrl: './sidebaritem.component.html',
  styleUrls: ['./sidebaritem.component.scss']
})
export class SidebaritemComponent implements OnInit {

  @Input() active: Boolean = false;
  @Input() href: String = '#';
  @Input() icon: String = "fa fa-home";

  constructor() { }

  ngOnInit() {
  }
  
}
