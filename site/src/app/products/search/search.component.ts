import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  api= "http://localhost:8081/products";
  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})};
  products: any;
  nome: any;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,  private router: Router
    ) { }

  ngOnInit(): void {
 const name = this.activatedRoute.snapshot.params['name'];
 console.log(name)
  this.searchP(name).subscribe(
    data => {
      this.products = data;
      
      console.log(this.products.name)

    },
    err => console.log(err)
  );
  
    
    
    
  
    
  }



  


  public searchP(name: String): Observable<String[]> {
    return this.http.get<String[]>(this.api + `/search/${name}`, this.httpOptions);
  }



}
