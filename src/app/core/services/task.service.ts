import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';

import { ITask } from '../models/task';
import { BaseHttpService } from './base-http';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { iif, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseHttpService {
  tasks$: AngularFireList<ITask>;

  constructor(
    private db: AngularFireDatabase,
    toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {
    super(toastr);
  } 

  getTasksList(): Observable<Array<ITask>> {
    return this.afAuth.authState.pipe(
      switchMap((user) =>
        iif(
          () => !!user?.uid,
          (() => {
            this.tasks$ = this.db.list(`tasks/${user?.uid}`, (rf) =>
              rf.orderByChild('isDone')
            );
            return this.tasks$.snapshotChanges();
          })()
        )
      ),
      map((response: SnapshotAction<ITask>[]) =>
        response?.map((item) => {
         const task = {...item.payload.val() };
         task.id = item.key;
          return task;
        })
      ),
      catchError(this.catchError.bind(this))
    );
  }

  createTask(task: ITask): firebase.default.database.ThenableReference {
    return this.tasks$.push(task);
  }

  updateTask(task: ITask): Promise<void> {
    return this.tasks$.update(task?.id?.toString(), task).catch(this.catchError.bind(this));
  }

  deleteTask(task: ITask): Promise<void> {
    return this.tasks$.remove(task?.id?.toString()).catch(this.catchError.bind(this));
  }
}
