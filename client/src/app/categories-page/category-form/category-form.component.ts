import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  isNewCategory = true;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    // this.route.params.subscribe((params: Params) => {
    //   if (params && params['id']) {
    //     this.isNewCategory = false;
    //   }
    // });

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
          if (category) {
            this.form.patchValue({
              name: category.name
            });
          }
        }
      )
  }

  get name() {
    return this.form.get('name');
  }

  onSubmit() {
    console.log(this.form);
  }
}
