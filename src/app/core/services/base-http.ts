import { ToastrService } from './toastr.service';

export abstract class BaseHttpService {
  constructor(private toastr: ToastrService) {}

  catchError(error: { code?: string; message?: string }): void {
    this.toastr.error(error?.message);
    throw error;
  }
}
