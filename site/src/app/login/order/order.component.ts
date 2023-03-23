import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Products } from 'src/app/products';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  api= "http://localhost:8081/order";
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};
  allord:any;
  id2:any;
  constructor(private http: HttpClient,  private activatedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.getAllUser(id).subscribe(
      data => {
        this.allord = data;

  
      },
      err => console.log(err)
    );
  }


  
  public getAllUser(id: string |undefined): Observable<String[]>{
    console.log(this.api+`/list/${id}`)
    this.id2=id?.substring(1,)
    console.log(this.id2)
    return this.http.get<String[]>(this.api+`/list/${this.id2}`,this.httpOptions);
  }




  
  // order(){
  //   // console.log(this.mail)
  //   this.getAllUser(this.).subscribe(data=>{
  //     this.historyP=data;
  //   },
    
    
  //     err => console.log(err)
  //         );
  // ;
  // }
}
