import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular';

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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private router: Router, private apollo: Apollo) { }
  name: any
  hotels = []
  search: any
  ngOnInit(): void {
    this.name=this._Activatedroute.snapshot.paramMap.get("name");
    this.apollo.watchQuery<any>({
      query: GET_HOTELS
    }).valueChanges
      .subscribe(({ data, loading }) => {
      const allHotels= data.listHotels
      allHotels.forEach(hotel=>{
        if(this.name.toLowerCase() === hotel.hotel_name.toLowerCase() || this.name.toLowerCase() == hotel.city.toLowerCase()){
          this.hotels.push(hotel)
        }
      })
      });
  }
  searchInput(event){
    this.search = event.target.value
  }
}
