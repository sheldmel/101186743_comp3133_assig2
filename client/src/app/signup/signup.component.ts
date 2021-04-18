import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular';
import { v4 as uuidv4 } from 'uuid';

const GET_USERS = gql`
  {
    listUsers{
      username
      email
    }
  }
`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public fb: FormBuilder, private router: Router, private apollo: Apollo) { }
  email: any
  hide = true;
  user: any;
  users: any
  username: any
  password: any
  signupForm: FormGroup;
  ngOnInit(): void {
    let val = localStorage.getItem('IsValidUser')
    if (val != null && val == 'true'){
      this.router.navigate(['/home'])
    }
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })

    this.apollo.watchQuery<any>({
      query: GET_USERS
    }).valueChanges
      .subscribe(({ data, loading }) => {
      this.users = data.listUsers
      console.log(this.users)
      });
  }
  usernameInput(event){
    this.username = event.target.value
  }
  emailInput(event){
    this.email = event.target.value
  }
  passwordInput(event){
    this.password = event.target.value
  }
  signup(){

    this.users.map((user)=>{
      if(this.email == user.email){
        alert("Email already registered. please try again")
        return
      }
      if(this.username == user.username){
        alert("Usernname already exists. please try again")
        return
      }
    })
    this.apollo.mutate<any>({
      mutation: gql`
        mutation createUser(
          $user_id: String!,$username: String!, $password: String!, $email: String!){
          createUser(user_id: $user_id, username: $username, password: $password, email: $email){
          user_id
          username
          password
          email
        }
      }
    `, variables: {user_id: uuidv4(), username: this.username, password: this.password, email: this.email}
    
    })
    .subscribe(({ data, errors}) => {
      this.user = data.createUser
      if(this.user != null){
        console.log(this.user)
        alert("Account created sucessfully")
        this.router.navigateByUrl('login');
        return
      }
      else{
        alert("duplicate username or email. please try again")
      };
    });
  }
}
