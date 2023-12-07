import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Model/productService';
import { AppServiceService } from 'src/app/Service/app-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id: number = 0;

  product = {
    id: 0,
    serviceName: '',
    quantity: 0,
    unit: '',
  };

  constructor(
    private appService: AppServiceService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.id = params['id'];
    });
    if (this.id) {
      this.appService.getSingleProduct(this.id).subscribe({
        next: (data) => {
          this.product = data;
        },
      });
    }
  }

  onUpdateForm(): void {
    const updatedProduct: ProductService = {
      serviceName: this.product.serviceName,
      quantity: this.product.quantity,
      unit: this.product.unit,
    };

    this.appService.updateProduct(this.id, updatedProduct).subscribe({
      next: (data) => {
        this.router.navigateByUrl('');
      },
    });
  }
}
