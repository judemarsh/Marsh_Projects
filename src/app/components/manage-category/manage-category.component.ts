import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css'],
  providers: [CategoryService]
})
export class ManageCategoryComponent implements OnInit {
  public contentHeader: string;
  public categoryList: Category[];
  public categoryObj: Category;

  constructor(private router: Router,private route: ActivatedRoute,private categoryService: CategoryService) { 
    this.contentHeader = this.route.snapshot.queryParams['contentHeader'];
    this.categoryObj = new Category(null,null);
  }

  ngOnInit() {
    this.getCategoryDetails();
  }

  getCategoryDetails(){
    this.categoryList = this.categoryService.getCategoryList();
  }

  editCategory(categoryId: number){
    this.categoryService.getCategoryById(categoryId).subscribe(responseData => { this.categoryObj = responseData});
  }

  addCategory(){
    this.categoryService.saveCategory(this.categoryObj).subscribe(responseData => { 
      this.categoryObj.categoryId= responseData;
      this.categoryList.push(this.categoryObj);
      this.categoryObj = new Category(null,null);
    });
  }

  deleteCategory(delCatObj: Category): void{
    if(confirm("Are you sure you want to delete this category?")){
      this.categoryService.deleteCategory(delCatObj.categoryId).subscribe(responseData => { 
        let index = this.categoryList.indexOf(delCatObj);
        if(index != -1){
          this.categoryList.splice(index,1);
        }
      });
    }
  
  }
}
