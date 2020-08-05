import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { MaterializeService } from '../../shared/classes/materialize.service';
import { HTMLInputEvent } from '../../shared/models/HTMLInputEvent';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  isNewCategory = true;
  form: FormGroup;
  imageSrc: String | ArrayBuffer = '';

  private image: File;
  private category: Category;

  @ViewChild('imageInput') imageInputRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.handleQueryParams();
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

  private handleQueryParams() {
    this.form.disable();

    this.route.params
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
