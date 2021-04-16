import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, private router: Router, private apollo: Apollo) { }
  hide = true;
  user: any
  username: any
  password: any
  loginForm: FormGroup;
  ngOnInit() {
    let val = localStorage.getItem('IsValidUser')
    if (val != null && val == 'true'){
      this.router.navigate(['/home'])
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  usernameInput(event){
    this.username = event.target.value
  }

  passwordInput(event){
    this.password = event.target.value
  }
  login() {
    this.apollo.query<any>({
      query: gql`
        query loginUser($username: String!, $password: String!){
          loginUser(username: $username, password: $password){
          user_id
          username
          password
        }
      }
    `, variables: {username: this.username, password: this.password}
    })
      .subscribe(({ data, loading }) => {
        this.user = data.loginUser
        console.log(this.user)
        if(this.user != null){
          localStorage.setItem('IsValidUser', 'true')
          localStorage.setItem('user_id', this.user.user_id)
          this.router.navigateByUrl('home');
        }else{
          localStorage.setItem('IsValidUser', 'false')
          alert("invalid username or password. please try again")
        }
      });
    
  }
  navigate(){
    this.router.navigateByUrl('signup')
  }
}
