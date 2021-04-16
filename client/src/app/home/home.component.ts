import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Hosted } from 'protractor/built/driverProviders';
import { LoginComponent } from '../login/login.component';
const GET_HOTELS = gql`
  {
    listHotels{
      hotel_id
      hotel_name
      street
      city
      postal_code
      price
      email
    }
  }
`;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels: any
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    {
      this.apollo.watchQuery<any>({
        query: GET_HOTELS
      }).valueChanges
        .subscribe(({ data, loading }) => {
        this.hotels = data.listHotels
        console.log(this.hotels)
        });
    }
  }
  logout(){
    localStorage.setItem('IsValidUser', 'false')
    localStorage.setItem('user_id', null)
    this.router.navigateByUrl('login')
  }
}
