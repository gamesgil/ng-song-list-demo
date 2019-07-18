import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-delete-dialog',
  template: `
    <h1>Are You Sure</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="{result: false}" cdkFocusInitial>No Thanks</button>
      <button mat-button (click)="onNoClick()">Ok</button>
    </div>
    `,
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick() {
      this.dialogRef.close({result: true});
    }
}

