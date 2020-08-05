import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { MaterializeService } from '../../shared/classes/materialize.service';
import { HTMLInputEvent } from '../../shared/models/HTMLInputEvent';
import { Message } from '../../shared/models/message';
import { UnsubscribeComponent } from '../../unsubscriber/unsubscribe.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends UnsubscribeComponent implements OnInit {

  isNewCategory = true;
  form: FormGroup;
  imageSrc: String | ArrayBuffer = '';

  private image: File;
  private category: Category;

  @ViewChild('imageInput') imageInputRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.subscriptions.push(
      this.handleQueryParams()
    );
  }

  get name() {
    return this.form.get('name');
  }

  onSubmit() {
    if (this.form && this.form.value) {
      let submitCategory$: Observable<Category>;

      this.form.disable();

      if (this.isNewCategory) {
        submitCategory$ = this.categoriesService.create(this.form.value.name, this.image);
      } else if (this.category && this.category._id) {
        submitCategory$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
      }

      this.subscriptions.push(
        submitCategory$.subscribe(
          (category: Category) => {
            const action = this.isNewCategory ? 'added' : 'edited';
            this.category = category;

            this.form.enable();
            MaterializeService.toast(`Category was successfully ${action}`);
          },
          () => {
            this.form.enable();
          }
        )
      );
    }
  }

  onClickDownloadImage() {
    if (this.imageInputRef && this.imageInputRef.nativeElement) {
      this.imageInputRef.nativeElement.click();
    }
  }

  onImageUpload(event: HTMLInputEvent | Event) {
    const eventTarget: HTMLInputElement & EventTarget = (event as HTMLInputEvent).target;
    const files: FileList = eventTarget.files;
    this.image = files && files[0];

    if (this.image) {
      const reader: FileReader = new FileReader();

      reader.onload = (result: ProgressEvent<FileReader>) => {
        const fileReader: FileReader = result.target;
        this.imageSrc = fileReader && fileReader.result;
      }

      reader.readAsDataURL(this.image);
    }
  }

  removeCategory() {
    if (!this.isNewCategory && this.category) {
      const confirm = window.confirm('Are you sure you want to delete category');

      if (confirm) {
        this.subscriptions.push(
          this.categoriesService.remove(this.category._id)
            .subscribe(
              (message: Message) => MaterializeService.toast(message.message),
              () => {},
              () => this.router.navigate(['/categories'])
            )
        );
      }
    }
  }

  private handleQueryParams(): Subscription {
    this.form.disable();

    return this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params && params['id']) {
              this.isNewCategory = false;

              return this.categoriesService.getById(params['id']);
            }

            return of(null);
          }
        )
      )
      .subscribe(
      (category: Category) => {
          this.getCategoryInfo(category);
        },
        () => {
          this.form.enable();
        }
      )
  }

  private getCategoryInfo(category: Category) {
      if (category) {
        this.category = category;

        this.form.patchValue({
          name: category.name
        });
        this.imageSrc = category.imageSrc;

        MaterializeService.updateTextField();
      }

      this.form.enable();
  }
}
