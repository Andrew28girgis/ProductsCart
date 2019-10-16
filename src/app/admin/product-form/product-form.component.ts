import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product :any;
  Categories$;
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catSvr: CategoriesService,
    private ProductsService: ProductsService) {

    this.Categories$ = this.catSvr.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {

      this.Categories$ = this.catSvr.getCategories();

      this.ProductsService.getById(this.id).pipe(take(1)).subscribe(prod => {
        if (prod) { this.product = prod }
      })


    }

  }

  save(product) {
    if (this.id) { this.ProductsService.update(this.id, this.product) }
    else { this.ProductsService.create(product) }
    this.router.navigateByUrl('admin/products');
  }

  delete() {
    if (confirm("Are You Sure To Delete The Product ?")) {
      this.ProductsService.delete(this.id);
    }
    this.router.navigateByUrl('admin/products');
  }
  ngOnInit() {
  }

}
