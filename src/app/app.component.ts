import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit{
  title = 'testApp';
  constructor(private http: HttpClient,private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.user.subscribe(
      user=>{
        if(user){
          this.getBook();
        }
      }
    )
  }
  getBook() {
     this.http.get("http://localhost:8080/api/v1/books").subscribe(
      {
        next: console.log,
        error: console.error
      }
     )
  }
  login() {
    return this.http.post<any>("http://localhost:8080/api/v1/auth/authenticate", {
      email: "admin@mail.com",
      password: "password"
    }).subscribe(
      {
        next: response=>{
          console.log(response);
          this.authService.token = response['access_token'];
          console.log( this.authService.token);
          this.authService.user.next("DJFDLG");
        },
        error: console.error

      }
    )
  }
}
