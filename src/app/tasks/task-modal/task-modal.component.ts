
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/core/models/category';
import { ITask } from 'src/app/core/models/task';
import { CategoryService } from 'src/app/core/services/category.service';
import { TaskService } from 'src/app/core/services/task.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MESSAGE_TASK_CREATED, MESSAGE_TASK_UPDATED } from '../tasks.constants';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  task: ITask = {};

  categories$: Observable<Array<ICategory>>;

  constructor(private categoryService: CategoryService,
    private taskService: TaskService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategoriesList();
  }

  openModal(task: ITask = {}): void {
    this.task = { ...task };
    this.modal.open();
  }

  save(): void {
    if (this.task.id === undefined) {
      this.taskService.createTask(this.task).then((_) => {
        this.toastrService.info(MESSAGE_TASK_CREATED);
        this.modal.close();
      })
    }
    else {
      this.taskService.updateTask(this.task).then((_) => {
        this.toastrService.info(MESSAGE_TASK_UPDATED);
        this.modal.close();
      });
    }
  }

}
