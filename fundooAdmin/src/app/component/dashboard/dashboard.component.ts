
/** Purpose         : Dashboard page
 *  @description
 *  @file           : dashboard.component.ts
 *  @author         : Arghya Ray
*/
import { Component, OnInit } from '@angular/core';
import "datatables.net" ;             //inmporting data tables
import * as $ from 'jquery';              //importing jquery
import 'datatables.net-responsive';      //importing datatables-responsive

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    try{
    var token=localStorage.getItem("token") //getting the token
    console.log(token)
    $(document).ready(function () {
    $.ajax({                                        //getting the user statics api
      url: "http://34.213.106.173/api/user/UserStatics",
      headers:{
        'Authorization':token
      },
      type: "GET",
      success: function (response) { console.log(response.data.details)
        var arr = response.data.details

                                                //taking cards for displaying in frontend
var html='';
        for (let index = 0; index < arr.length; index++) {
          html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card'style='border: 2px solid #fb0;box-shadow: 0 0 30px 0 rgb(2, 10, 17);'>";
          html += "<div class='card-header'style='background-color:#fb0; text-align: center'>"+ arr[index].service+" </div>";
          html += "<div class='card-body' style='background-color:rgb(229, 226, 240); text-align: center'>" +"Users:"+ arr[index].count+" </div>";
          html +="</div></div>";
        }

        $("#services").html(html);
      }

    });
      $.ajax({
        url: "http://34.213.106.173/api/user/getAdminUserList",

        type: "GET",                                 //for getting the userlist
        success: function (response) {
          console.log(response.data.data)
          var list=[];
          for(let i=1;i<response.data.data.length;i++){
            list.push([i,response.data.data[i].firstName, response.data.data[i].lastName, response.data.data[i].email,
              response.data.data[i].service,response.data.data[i].role,response.data.data[i].createdDate,response.data.data[i].emailVerified
            ,response.data.data[i].phoneNumber ==undefined ?"" :response.data.data[i].phoneNumber] );
          }            //pushing the data in the list
          console.log(list)
          $('#tableList').DataTable({
              data:list,                //responsive datatables used for showing the details

                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal( {
                            header: function ( row ) {
                                var data = row.data();
                                return 'Details for '+data[1]+' '+data[2];
                            }
                        } ),
                        renderer: $.fn.dataTable.Responsive.renderer.tableAll()
                    }                       //for rendering all the tabledata
                },

                "columnDefs": [
                  {
                      "targets": [ 5 ],            //for hiding some details from tables
                      "visible": false,
                      "searchable": false
                  },
                  {
                      "targets": [ 6 ],
                      "visible": false
                  },
                  {
                    "targets": [ 7],
                    "visible": false,
                    "searchable": false
                },
                {
                  "targets": [ 8 ],
                  "visible": false,
                  "searchable": false
              }
              ]
          });
         }
  })
  $("#logout").click(function(){
    $.ajax({
      url: "http://34.213.106.173/api/user/logout",
      headers:{
        'Authorization':token                          //log out api call
      },
      type: "POST",
      success: function () {
        console.log("SUCCESS");
        localStorage.removeItem("token");//removing the token
         window.location.replace("/login")
      }
  })
  })
  $("#question").click(function(){
    window.location.replace("/question");
  })

    })
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
