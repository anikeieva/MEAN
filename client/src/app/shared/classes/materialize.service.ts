import { ElementRef } from '@angular/core';

declare const M: {
  toast: Function,
  FloatingActionButton: {
    init: Function
  },
  updateTextFields: Function
};

export class MaterializeService {
  static toast(message: string) {
    M.toast({ html: message });
  }

  static initFloatingActionButton(elementRef: ElementRef) {
    if (elementRef) {
      M.FloatingActionButton.init(elementRef.nativeElement);
    }
  }

  static updateTextField() {
    M.updateTextFields();
  }
}
