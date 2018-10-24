/** Purpose         : Login page
 *  @description
 *  @file           : login.component.ts
 *  @author         : Arghya Ray
*/


import { Component, OnInit } from '@angular/core';


import * as $ from 'jquery';             //importing jquery

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
try{
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
      // if (validateEmail(sEmail)) {
      //   alert('Nice!! your Email is valid, now you can continue..');
      //   }
      //   else {
      //   alert('Invalid Email Address');
      //   e.preventDefault();
      //   }
      //   });
      // function validateEmail(sEmail) {
      //   var filter = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
      //   if (filter.test(sEmail)) {
      //   return true;
      //   }
      //   else {
      //   return false;
      //   }
      //   }

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
        localStorage.setItem('token',response.id) //setting the token to local storage
        alert("Log In Successful");
        window.location.replace("/dash");      //redirecting to dashboard
      }
    },
    error:function(err)
    {
      alert("Invalid credintials");
    }
  });


});
}
 catch(e)                        //error handling
{
  if(e instanceof ReferenceError|| e instanceof SyntaxError ||e instanceof TypeError)
  {
  console.log("something bad happened");
  }
}

  }

  }
