import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksComponent } from './tasks.component';
import { SharedModule } from '../shared/shared.module';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedModule, TasksRoutingModule, FormsModule],
  declarations: [TasksComponent, TaskModalComponent],
})
export class TasksModule {}
