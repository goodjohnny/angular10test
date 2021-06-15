import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Injectable()
export class HelperService {
  constructor(private dialog: MatDialog) {
  }

  getFormattedDate(dateStr: string): string {
    const dateTmp = new Date(dateStr);
    return '' + dateTmp.getDate() + '.' + (dateTmp.getMonth() + 1) + '.' + dateTmp.getFullYear();
  }

  openDialog(title, desc, showOkButton?): MatDialogRef<DialogComponent, any> {
    return this.dialog.open(DialogComponent, {
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      hasBackdrop: true,
      maxHeight: '700px',
      data: {
        title,
        desc,
        showOkButton
      }
    });
  }
}
