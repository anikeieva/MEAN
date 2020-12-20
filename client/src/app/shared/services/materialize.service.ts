import { ElementRef } from '@angular/core';

declare const M: {
  toast: Function,
  FloatingActionButton: {
    init: Function,
  },
  updateTextFields: Function,
  Modal: {
    init: Function,
    getInstance: Function
  }
};

export interface MaterialInstance {
  open?: Function;
  close?: Function;
  destroy?: Function;
}

export class MaterializeService {

  static toast(message: string): void {
    M.toast({ html: message });
  }

  static initFloatingActionButton(elementRef: ElementRef): void {
    if (elementRef) {
      M.FloatingActionButton.init(elementRef.nativeElement);
    }
  }

  static updateTextField(): void {
    M.updateTextFields();
  }

  static initModal(elementRef: ElementRef): MaterialInstance {
    return  M.Modal.init(elementRef?.nativeElement);
  }

}
