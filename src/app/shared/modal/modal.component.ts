import { Component, OnDestroy, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  @Input() closeOnOutsideClick = true;
  visible = false;
  visibleAnimate = false;

  ngOnDestroy(): void {
    this.close();
  }

  open(): void {
    document.body.classList.add('modal-open');
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
    });
  }

  close(): void {
    document.body.classList.remove('modal-open');
    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
    }, 200);
  }

  @HostListener('click', ['$event'])
  onContainerClicked(event: MouseEvent): void {
    if (
      (event.target as HTMLElement).classList.contains('modal') &&
      this.closeOnOutsideClick
    ) {
      this.close();
    }
  }
}
