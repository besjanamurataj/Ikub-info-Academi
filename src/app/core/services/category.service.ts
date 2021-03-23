import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/database';
import { iif, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ToastrService } from 'src/app/core/services/toastr.service';
import { isBuffer } from 'util';
import { ICategory } from '../models/category';
import { BaseHttpService } from './base-http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseHttpService {
  categories$: AngularFireList<ICategory>;

  constructor(
    private db: AngularFireDatabase,
    toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {
    super(toastr);
  }

  getCategoriesList(): Observable<Array<ICategory>> {
    return this.afAuth.authState.pipe(
      switchMap((user) =>
        iif(
          () => !!user?.uid,
          (() => {
            this.categories$ = this.db.list(`categories/${user?.uid}`);
            return this.categories$.snapshotChanges();
          })()
        )
      ),
      map((response: SnapshotAction<ICategory>[]) =>
        response?.map((item) => {
          const category = { ...item?.payload?.val() };
          category.id = item.key;
          return category;
        })
      ),
      catchError(this.catchError.bind(this))
    );

  }

  createCategory(
    category: ICategory
  ): firebase.default.database.ThenableReference {
    return this.categories$.push(category);
  }

  updateCategory(category: ICategory): Promise<void> {
    return this.categories$
      .update(category.id.toString(), category)
      .catch(this.catchError.bind(this));
  }

  deleteCategory(category: ICategory): Promise<void> {
    return this.categories$
      .remove(category?.id.toString())
      .catch(this.catchError.bind(this));
  }
}
