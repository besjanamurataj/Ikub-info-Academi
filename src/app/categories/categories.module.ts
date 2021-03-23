import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedModule, CategoriesRoutingModule, FormsModule],
  declarations: [CategoriesComponent, CategoryModalComponent],
})
export class CategoriesModule {}
