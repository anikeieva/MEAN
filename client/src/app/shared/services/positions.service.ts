import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private requestPath = '/api/position';

  constructor(
    private http: HttpClient
  ) {
  }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.requestPath}/${categoryId}`);
  }

  createPosition(position: Position): Observable<any> {
    return this.http.post<Position>(`${this.requestPath}`, position);
  }
}
