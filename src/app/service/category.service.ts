import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app-settings';
import 'rxjs/add/operator/map';
import { log } from 'util';

@Injectable()
export class CategoryService {

  categoryList: Category[];

  constructor(private http: Http) {
    this.categoryList = [];
   }

  public getCategoryList() : Category[] {
    this.http.get(AppSettings.serviceBaseURL + '/getCategoryList').map(res => res.json()).subscribe(categories => {
      categories.forEach(category => {
        this.categoryList.push(category);
      });
    });
    return this.categoryList;
  }

  public getCategoryById(categoryId: number) : Observable<Category>{
    return this.http.get(AppSettings.serviceBaseURL + '/getCategoryById/' + categoryId).map(res => res.json());
  }

  public saveCategory(categoryObj: Category): Observable<number>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.serviceBaseURL + '/saveCategory', categoryObj, options).map(res => res.json());
  }

  public deleteCategory(categoryId: number): Observable<number>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.serviceBaseURL + '/deleteCategory/'+categoryId, null, options).map(res => res.json());
  }

}
