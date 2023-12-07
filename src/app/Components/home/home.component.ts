import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailTable } from 'src/app/Model/DetailTable';
import { MasterTable } from 'src/app/Model/MasterTable';
import { ProductService } from 'src/app/Model/productService';
import { AppServiceService } from 'src/app/Service/app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadedNames: any[] = [];
  loadedProducts: any[] = [];
  selectedUnit: string = '';
  selectedDropdownItem: string = '';
  selectedQuantity: number = 0;

  customerDetail: MasterTable = {
    customerName: '',
    dateandTime: new Date(),
    meetingPlace: '',
    clientSide: '',
    HostSide: '',
  }

  meetingDetail: DetailTable = {
    meetingAgenda: '',
    meetingDiscussion: '',
    meetingDecision: ''
  }

  constructor(private appService: AppServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadInterestedProduct();
  }

  loadInterestedProduct() {
    this.appService.getProductDetails().subscribe({
      next: data => {
        this.loadedProducts = data;
      }
    })
  }

  onCustomerTypeChange(customerType: string): void {
    this.appService.getCustomerData(customerType).subscribe({
      next: (data) => {
        this.loadedNames = data;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onChangeDropDownList(): void {
    if (this.selectedDropdownItem) {
      const selectedProduct = this.loadedProducts.find(product => product.serviceName === this.selectedDropdownItem)
      if (selectedProduct) {
        this.selectedUnit = selectedProduct.unit;
      } else {
        this.selectedUnit = '';
      }
    }
  }

  onAddProductService() {
    let productService: ProductService = {
      serviceName: this.selectedDropdownItem,
      unit: this.selectedUnit,
      quantity: this.selectedQuantity
    }

    this.appService.addProductDetails(productService).subscribe({
      next: (data) => {
        this.selectedDropdownItem = '';
        this.selectedUnit = '';
        this.selectedQuantity = 0;
        //Refresh Product List
        this.loadInterestedProduct();
      }
    });

  }

  onDelete(id: number): void {
    this.appService.deleteProduct(id).subscribe({
      next: (data) => {
        console.log('Data Deleted Successfully');
        this.loadInterestedProduct();
      }
    })
  }

  isFormValid(): boolean {
    if (
      this.customerDetail.customerName.trim() === '' ||
      this.customerDetail.meetingPlace.trim() === '' ||
      this.customerDetail.clientSide.trim() === '' ||
      this.customerDetail.HostSide.trim() === ''
    ) {
      return false;
    }
    if (
      this.meetingDetail.meetingAgenda.trim() === '' ||
      this.meetingDetail.meetingDiscussion.trim() === '' ||
      this.meetingDetail.meetingDecision.trim() === ''
    ) {
      return false;
    }

    return true;
  }

  clearForm(): void {
    this.customerDetail.customerName = '';
    this.customerDetail.meetingPlace = '';
    this.customerDetail.clientSide = '';
    this.customerDetail.HostSide = '';

    this.meetingDetail.meetingAgenda = ''
    this.meetingDetail.meetingDiscussion = ''
    this.meetingDetail.meetingDecision = ''
  }

  storeProcedureForMasterTable(data: MasterTable) {
    this.appService.executeMasterTableSP(data).subscribe({
      next: (data) => {
      }, error: err => {
        console.log(err);
      }
    })
  }

  storeProcedureForDetailTable(data: DetailTable) {
    this.appService.executeDetailTableSP(data).subscribe({
      next: (data) => {
      }, error: err => {
        console.log(err);
      }
    })
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.storeProcedureForMasterTable(this.customerDetail);
      this.storeProcedureForDetailTable(this.meetingDetail);
    }
  }

  onRefresh(): void{
    this.clearForm();
  }

}
