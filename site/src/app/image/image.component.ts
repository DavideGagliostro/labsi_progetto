import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {

  constructor(private httpClient: HttpClient) { }

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  //Gets called when the user selects an image
  public onFileChanged(event : any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
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
}