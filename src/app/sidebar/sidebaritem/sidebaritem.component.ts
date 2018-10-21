import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebaritem',
  templateUrl: './sidebaritem.component.html',
  styleUrls: ['./sidebaritem.component.scss']
})
export class SidebaritemComponent implements OnInit {

  @Input() active: Boolean;
  @Input() href: String;
  @Input() icon: String;

  constructor() { }

  ngOnInit() {
  }
  
}
