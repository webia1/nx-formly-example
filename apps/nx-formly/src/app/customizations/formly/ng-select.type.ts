import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'nx-formly-ng-select',
  template: `
    <div class="mat-input-infix mat-form-field-infix">
      <ng-select
        [items]="to.options | async"
        [placeholder]="to?.label || ''"
        [bindValue]="to?.bindValue || 'value'"
        [formControl]="formControl"
        [class.is-valid]="showError"
      >
      </ng-select>
    </div>
  `,
})
export class NgSelectFormlyComponent extends FieldType {
  formControl: FormControl = new FormControl();
  showError = false;
}
