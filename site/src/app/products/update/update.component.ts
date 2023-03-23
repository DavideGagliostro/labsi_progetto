import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/products';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  product!: Products;
  constructor(
    private ProductService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.ProductService.update(id, this.product).subscribe(
      data => {
        console.log(data);
        this.volver();
      },
      err => console.log(err)
    );
  }

  volver(): void {
    this.router.navigate(['/lista']);
  }

}