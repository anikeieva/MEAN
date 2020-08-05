import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private requestPath = '/api/category';

  constructor(private http: HttpClient) { }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>(this.requestPath);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.requestPath}/${id}`);
  }

  create(name: string, image?: File): Observable<Category> {
    const formData: FormData = CategoriesService.getCategoryFormData(name, image);

    return this.http.post<Category>(this.requestPath, formData);
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const formData: FormData = CategoriesService.getCategoryFormData(name, image);

    return this.http.patch<Category>(`${this.requestPath}/${id}`, formData);
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.requestPath}/${id}`);
  }

  private static getCategoryFormData(name: string, image?: File): FormData {
    const formData: FormData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }

    formData.append('name', name);

    return formData;
  }
}
