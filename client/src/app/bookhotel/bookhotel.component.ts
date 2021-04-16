import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'app-bookhotel',
  templateUrl: './bookhotel.component.html',
  styleUrls: ['./bookhotel.component.css']
})
export class BookhotelComponent implements OnInit {
  id: any
  hotel_name: any
  constructor(private _Activatedroute:ActivatedRoute, private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.hotel_name=this._Activatedroute.snapshot.paramMap.get("name");
    console.log(this.id)
    console.log(this.hotel_name)
  }
  
}
