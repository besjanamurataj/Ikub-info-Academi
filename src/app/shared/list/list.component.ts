import { Component, Input,TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() items: Array<any>;
  @Input()
  template: TemplateRef<{ item }>;
  @Input() itemStyleClass: string | Array<string>;
  @Input() groupStyleClass: string |  Array<string>;

  constructor() {}
}
