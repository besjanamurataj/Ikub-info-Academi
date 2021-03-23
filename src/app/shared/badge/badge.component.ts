import { BadgeTypeEnum } from './../../core/models/badge-type-enum';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input() label: string;
  @Input() type: BadgeTypeEnum;

  constructor() { }

  ngOnInit() {
  }

}
