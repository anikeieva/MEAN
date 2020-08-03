import { Component, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-unsubscribe',
  template: ''
})
export class UnsubscribeComponent implements OnDestroy {

  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
