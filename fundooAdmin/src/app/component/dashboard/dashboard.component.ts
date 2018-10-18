import { Component, OnInit } from '@angular/core';
import "datatables.net" ;
import * as $ from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var token=localStorage.getItem("token")
    console.log(token)
    $(document).ready(function () {
    $.ajax({
      url: "http://34.213.106.173/api/user/UserStatics",
      headers:{
        'Authorization':token
      },
      type: "GET",
      success: function (response) { console.log(response.data.details)
        var arr = response.data.details


var html='';
        for (let index = 0; index < arr.length; index++) {
          html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card'style='border: 2px solid #fb0;box-shadow: 0 0 30px 0 rgb(2, 10, 17);'>";
          html += "<div class='card-header'style='background-color:#fb0'>" + arr[index].service+" </div>";
          html += "<div class='card-body'>" + arr[index].count+" </div>";
          html +="</div></div>";
        }

        $("#services").html(html);
      }

    });
      $.ajax({
        url: "http://34.213.106.173/api/user/getAdminUserList",
        // headers: {
        //   'Authorization': token
        // },
        type: "GET",
        success: function (response) {
          console.log(response.data.data)
          var list=[]
          for(let i=0;i<response.data.data.length;i++){
            list.push([i,response.data.data[i].firstName, response.data.data[i].lastName, response.data.data[i].email,
              response.data.data[i].service]);
          }
          console.log(list)
          $('#tableList').DataTable({
              data:list
          });
         }
  })
  $("logout").click(function(){
    localStorage.removeItem("token");
    window.location.href="/login"
  })
  }
    )}

}
