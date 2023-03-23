import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkout } from './checkout';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  api= "http://localhost:8081/products";
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};

  constructor(private http:HttpClient) { }
  

  public getAll(): Observable<Products[]>{
    return this.http.get<Products[]>(this.api+'/allProduct',this.httpOptions);

  }


  public create(Products: Products): Observable<any> {
    return this.http.post<any>(this.api + '/create', Products, this.httpOptions);
  }

  


  public addCart(id:String | undefined,Checkout: Products): Observable<any> {
    console.log(Checkout)
    return this.http.post<any>(`http://localhost:8081/checkout/addCart/${id}`,Checkout,this.httpOptions);
    }

  public update(id: number, product: Products): Observable<any> {
    return this.http.put<any>(this.api + `/update/${id}`, product, this.httpOptions);
  }

  public expand(id: number): Observable<Products> {
    return this.http.get<Products>(this.api + `/expand/${id}`, this.httpOptions);
  }

  public changeQuantity(id: number,quantity: number): Observable<Products> {
    return this.http.post<any>(this.api + `/expand/${id}/change/${quantity}`, this.httpOptions);
  }


  public crech(Products: Products): Observable<any> {
  return this.http.post<any>("http://localhost:8081/checkout/create",Products,this.httpOptions);
  }

  public crech1(Checkout: Checkout): Observable<any> {
    console.log(Checkout)
    return this.http.post<any>("http://localhost:8081/checkout/create",Checkout,this.httpOptions);
    }


  public list(): Observable<String[]> {
    return this.http.get<String[]>(this.api + '/list', this.httpOptions);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + `/delete/${id}`, this.httpOptions);
  }

  public getProduct(id: number): Observable<String>{
    return this.http.get<String>(this.api + `/get/${id}`,this.httpOptions)
  }  
  public getProductU(id: number|undefined): Observable<String>{
    return this.http.get<String>(this.api + `/get/${id}`,this.httpOptions)
  }  
  public getProductUn(id: number|undefined): Observable<String>{
    return this.http.get<String>(this.api + `/get/${id}`,this.httpOptions)
  }  

  public getProduct2(barcodeg:String): Observable<String>{
    return this.http.get<String>(this.api + `/getB/${barcodeg}`,this.httpOptions)
  }  

  public change(id: number): Observable<String>{
    return this.http.get<String>(this.api + `/change`,this.httpOptions)
  }  


}

