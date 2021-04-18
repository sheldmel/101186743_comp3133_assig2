import { Component, OnInit, OnDestroy } from '@angular/core';
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
const GET_BOOKINGS = gql`
query getBookingsByID($user_id: String!){
  getBookingsByID(user_id: $user_id){
  hotel_id
  booking_date
  booking_start
  booking_end
}
}
`
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels: any
  query1: any
  query2: any
  search: any
  bookings: any
  user_id = localStorage.getItem('user_id')
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('reload') == 'true') { 
      localStorage.setItem('reload', 'false') 
      location.reload() 
    }
    {
      this.query1 = this.apollo.watchQuery<any>({
        query: GET_HOTELS
      }).valueChanges
        .subscribe(({ data, loading }) => {
        this.hotels = data.listHotels
        console.log(this.hotels)
        });

        this.query2 =this.apollo.watchQuery<any>({
          query: GET_BOOKINGS
          , variables: {user_id: this.user_id}
        }).valueChanges
          .subscribe(({ data, loading }) => {
          this.bookings = data.getBookingsByID
          console.log(this.bookings)
          });
    }
  }
  ngOnDestroy(){
    this.query1.unsubscribe()
    this.query2.unsubscribe()
  }

  searchInput(event){
    this.search = event.target.value
  }

  logout(){
    localStorage.setItem('IsValidUser', 'false')
    localStorage.setItem('user_id', null)
    this.router.navigateByUrl('login')
  }
}
