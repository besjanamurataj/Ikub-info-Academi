import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
  
})
export class ConfirmationComponent {
  @Input() message: string;
  @Input() title: string;
  @Output() confirmEvent = new EventEmitter<Event>();
  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor() {}

  openModal(): void {
    this.modal.open();
  }

  confirm($event: Event): void {
    this.modal.close();
    this.confirmEvent.emit($event);
  }
}
