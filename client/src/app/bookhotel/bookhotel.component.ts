import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-bookhotel',
  templateUrl: './bookhotel.component.html',
  styleUrls: ['./bookhotel.component.css']
})
export class BookhotelComponent implements OnInit {
  hotel_id: any
  user_id = localStorage.getItem('user_id')
  dateRegex = /\b(?:0?[1-9]|1[012])[- /.](?:0?[1-9]|[12][0-9]|3[01])[- /.](?:19|20)\d\d\b/;
  hotel_name: any
  booking_start: any
  booking_end: any
  date = new Date();
  dd = String(this.date.getDate())
  mm = String(this.date.getMonth() + 1) //January is 0!
  yyyy = this.date.getFullYear();
  today = this.mm + '/' + this.dd + '/' + this.yyyy;
  bookForm: FormGroup

  constructor(public fb: FormBuilder,private _Activatedroute:ActivatedRoute, private router: Router, private apollo: Apollo) { }
  startInput(event){
    this.booking_start = event.target.value
    console.log((this.booking_start.getMonth() + 1) + '/' + this.booking_start.getDate() + '/' + this.booking_start.getFullYear())
    this.booking_start = (this.booking_start.getMonth() + 1) + '/' + this.booking_start.getDate() + '/' + this.booking_start.getFullYear()
  }

  endInput(event){
    this.booking_end = event.target.value
    console.log((this.booking_end.getMonth() + 1) + '/' + this.booking_end.getDate() + '/' + this.booking_end.getFullYear())
    this.booking_end = (this.booking_end.getMonth() + 1) + '/' + this.booking_end.getDate() + '/' + this.booking_end.getFullYear()
  }
  ngOnInit(): void {
    this.hotel_id=this._Activatedroute.snapshot.paramMap.get("id");
    this.hotel_id = Number(this.hotel_id)
    this.hotel_name=this._Activatedroute.snapshot.paramMap.get("name");
    console.log(this.hotel_id)
    console.log(this.hotel_name)
    console.log(this.today)
    this.bookForm = this.fb.group({
      booking_start: ['', [Validators.required]],
      booking_end: ['', [Validators.required]],
    })
  }
  book(){
    if(this.dateRegex.test(String(this.booking_start)) != true){
      alert('invalid start date: ' + this.booking_start)
      return
    }
    else if(this.dateRegex.test(String(this.booking_end)) != true){
      alert('invalid end date')
      return
    }
    this.apollo.mutate<any>({
      mutation: gql`
        mutation bookHotel(
          $hotel_id: Int!, $booking_date: String!, $booking_start: String!, $booking_end: String!, $user_id: String!){
          bookHotel(hotel_id: $hotel_id, booking_date: $booking_date, booking_start: $booking_start, booking_end: $booking_end, user_id: $user_id){
          user_id
          hotel_id
          booking_date
          booking_start
          booking_end
        }
      }
    `, variables: {hotel_id: this.hotel_id, booking_date: this.today, booking_start: this.booking_start, booking_end: this.booking_end, user_id: this.user_id}
    })  .subscribe(({ data, errors}) => {
        const booking = data.bookHotel
        console.log(booking)
        alert("Booking created sucessfully")
        localStorage.setItem('reload', 'true')
        this.router.navigateByUrl('home');
        return
    });
  }
}
