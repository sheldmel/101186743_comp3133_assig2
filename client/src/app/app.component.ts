import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client'; 
  users: any
  constructor(private apollo: Apollo){}

  ngOnInit(){

  }
}
