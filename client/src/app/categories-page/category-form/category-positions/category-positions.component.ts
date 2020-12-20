import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { PositionsService } from '../../../shared/services/positions.service';
import { UnsubscribeComponent } from '../../../unsubscriber/unsubscribe.component';
import { Position } from '../../../shared/models/position';
import { MaterialInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-positions',
  templateUrl: './category-positions.component.html',
  styleUrls: ['./category-positions.component.scss']
})
export class CategoryPositionsComponent extends UnsubscribeComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() categoryId: string;

  @ViewChild('modal') modalRef: ElementRef;

  positions: Position[] = [];
  isLoading: boolean;
  modal: MaterialInstance;

  modalForm: FormGroup;

  constructor(
    private positionsService: PositionsService
  ) {
    super();
  }

  get name(): FormControl {
    return <FormControl>this.modalForm?.get('name');
  }

  get cost(): FormControl {
    return <FormControl>this.modalForm?.get('cost');
  }

  ngOnInit(): void {
    this.modalForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    this.isLoading = true;

    this.subscriptions.push(
      this.positionsService.fetch(this.categoryId)
        .subscribe((positions: Position[]) => {
          this.positions = positions;
          this.isLoading = false;
        })
    );
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
    console.log(this.modal);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.modal?.destroy();
  }

  onAddPosition(): void {
    this.modal?.open();
  }

  onDeletePosition(position: Position): void {
  }

  onSelectPosition(position: Position): void {
    this.modal?.open();
  }

  onCloseModal(): void {
    this.modal?.close();
  }

  onSubmitModal(): void {
    this.modalForm?.disable();

    const position: Position = {
      name: this.name?.value,
      cost: this.cost?.value,
      category: this.categoryId
    };

    this.subscriptions.push(
      this.positionsService.createPosition(position)
        .subscribe(
          (position) => {
            if (position) {
              MaterializeService.toast('Position created')
              this.positions.push(position);
            }
          },
          (error: Error) => MaterializeService.toast('Position was not add'),
          () => {
            this.onCloseModal();
            this.modalForm.patchValue({
              name: null,
              cost: 1
            });
            this.modalForm.enable();
          }
        )
    );
  }

}
