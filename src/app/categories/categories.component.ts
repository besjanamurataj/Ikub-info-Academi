import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ICategory } from '../core/models/category';
import { CategoryService } from '../core/services/category.service';
import { SpinnerOverlayService } from '../core/services/spinner-overlay.service';
import { ToastrService } from '../core/services/toastr.service';
import { CATEGORIES_TITLE, MESSAGE_CATEGORY_DELETED } from './categories.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.conmponent.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Array<ICategory>>;
  selectedCategory: ICategory;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private spinner: SpinnerOverlayService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.categories$ = this.categoryService.getCategoriesList().pipe(
      tap((_) => {
        this.spinner.hide();
      })
    );
    this.titleService.setTitle(CATEGORIES_TITLE);
  }

  deleteCategory(event: Event): void {
    event.stopPropagation();
    this.categoryService.deleteCategory(this.selectedCategory).then((_) => {
      this.toastrService.info(MESSAGE_CATEGORY_DELETED);
    });
  }
}

