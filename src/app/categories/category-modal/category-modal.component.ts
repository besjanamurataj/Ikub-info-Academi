
import { Component, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MESSAGE_CATEGORY_CREATED, MESSAGE_CATEGORY_UPDATED } from '../categories.constants';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;
  category: ICategory = {};

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService) { }

  ngOnInit() {
  }

  openModal(category: ICategory = {}): void {
    this.category = {...category};
    this.modal.open();
  }

  save(): void {
    if(this.category.id){
      this.categoryService.updateCategory(this.category).then((_) => {
        this.toastrService.info(MESSAGE_CATEGORY_UPDATED);
        this.modal.close();
      })
    } else {
      this.categoryService.createCategory(this.category).then((_) => {
        this.toastrService.info(MESSAGE_CATEGORY_CREATED)
        this.modal.close();
      });
    }
  }

}
