import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/products';
import { ProductsService } from './../../products.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

 
  product? :Products;
  ProductName?: string;
  barCode?: string;
  description?: string;
  price?: number;
  quantity?: number;
  barcodeg?: string;
  image?: string;


  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private httpClient: HttpClient
  ) { }



  public onFileChanged(event : any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

 

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    console.log(this.imageName)
    this.httpClient.get('http://localhost:8081/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picbyte;
          console.log(this.imageName)

          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrievedImage)



        }
      );
  }



  ngOnInit(): void {
  }

  onCreate(): void {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    console.log(uploadImageData);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post<any>("http://localhost:8081/image/upload", uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );

    this.product = new Products(undefined,this.ProductName,this.barCode,this.description,this.price,this.quantity,this.barcodeg,this.selectedFile.name)
    console.log(this.product)
    this.productService.create(this.product).subscribe(
      data => {
        console.log(data);
        this.volver();
      },
      err => console.log(err)
    );
  }

  volver(): void {
    this.router.navigate(['/products']);
  }


}