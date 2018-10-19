/** Purpose         : Login page
 *  @description
 *  @file           : login.component.ts
 *  @author         : Arghya Ray
*/


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {

  }
  data:any={}
  ngOnInit() {
    $("#mail_err").hide();                  //initially to hide the message
    $("#pwd_err").hide();

    $("#btn").click(function(){
      var mail=$("#email").val();
      var password=$("#pwd").val();
      var index1=mail.indexOf("@");
      var index2=mail.indexOf(".");
      var diff=index2-index1;

      if(index1==undefined||index2==undefined||index1==0||index2<index1||diff<=2)
      {
        $("#mail_err").show();                 //email validation
        return;
      }
      if(password.length<4||password==undefined)
      {
        $("#pwd_err").show();
        return;                                        //password validation
      }


  $.ajax({
    url: "http://34.213.106.173/api/user/adminLogin",
    type: "POST",
    data: {
      "email": mail,
      "password": password                                //admin login api calling
    },
    dataType: "json",
    success:function(response){
      if(response){
        console.log(response);
        localStorage.setItem('token',response.id)
        alert("Log In Successful");
        window.location.href="/dash";
      }
    },
    error:function(err)
    {
      alert("Invalid credintials");
    }
  });
  

});

  }

  }
