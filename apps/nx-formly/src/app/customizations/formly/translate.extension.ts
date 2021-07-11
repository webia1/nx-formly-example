import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

export class TranslateExtension {
  constructor(private ts: TranslateService) {}

  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};

    if (!to.label || to._translated) {
      return;
    }

    to._translated = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': this.ts.stream(
        field?.templateOptions?.label || 'EMPTY'
      ),
    };
  }
}

export function registerTranslateExtension(ts: TranslateService) {
  return {
    extensions: [
      {
        name: 'translate-extension',
        extension: new TranslateExtension(ts),
      },
    ],
  };
}
