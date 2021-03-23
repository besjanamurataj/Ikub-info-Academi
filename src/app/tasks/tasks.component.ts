import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BadgeTypeEnum } from '../core/models/badge-type-enum';
import { ICategory } from '../core/models/category';
import { ITask } from '../core/models/task';
import { CategoryService } from '../core/services/category.service';
import { SpinnerOverlayService } from '../core/services/spinner-overlay.service';
import { TaskService } from '../core/services/task.service';
import { ToastrService } from '../core/services/toastr.service';
import { MESSAGE_TASK_DELETED, MESSAGE_TASK_STATUS, TASKS_TITLE } from './tasks.constants';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Array<ITask>>;
  categories$: Observable<Array<ICategory>>;
  selectedTask: ITask;
 badgeTypeEnum =  BadgeTypeEnum;

  constructor(
    private taskService: TaskService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private spinner: SpinnerOverlayService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.tasks$ = this.taskService.getTasksList().pipe(
      tap((_) => {
        this.spinner.hide();
      })
    );
    this.categories$ = this.categoryService.getCategoriesList();
    this.titleService.setTitle(TASKS_TITLE);

  }

  deleteTask(event: Event): void {
    event.stopPropagation();
    this.taskService.deleteTask(this.selectedTask).then((_) => {
      this.toastrService.info(MESSAGE_TASK_DELETED);
    });
  }

  changeState(task: ITask): void {
    task.isDone = !task.isDone;
    this.taskService.updateTask(task).then((_) => {
      this.toastrService.info(MESSAGE_TASK_STATUS);
    });
  }
}
