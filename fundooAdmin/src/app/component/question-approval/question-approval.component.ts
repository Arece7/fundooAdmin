import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-question-approval',
  templateUrl: './question-approval.component.html',
  styleUrls: ['./question-approval.component.css']
})
export class QuestionApprovalComponent implements OnInit {

  constructor() { }

  ngOnInit() {

 /**calling jQuery's $ function, passing to it the document object */
    /** ready event occurs when the DOM loaded */
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var    questionArray = [];

      $("#home").click(function(){
              window.location.replace("/dash");
            })
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: {
          'Authorization': token,
        },

        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */

        success: function (response) {
          var questionId=[];
          console.log("successfull");
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i+1, response.data[i].message]);
            questionId.push(response.data[i])


          }

          var questionArray1 = $('#example').DataTable({
            data: questionArray,
            scroller: true,
            scrollY: 400,
            scrollX:false,
            // responsive: true,


            "columnDefs": [ {
              "targets": -1,
              "defaultContent":
              '<div class="btn-group">'+
              '<button class="newBtn btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" type="button">Approve</button>'+'<div>'+'</div>'
              + '<button class="Mybtn btn btn-info btn-sm" data-toggle="modal" data-target="#myModal1" style="margin-left:20px"  type="button">Reject</button>'
              +'</div>'
         } ]
          });
     parent;
    $('#example').on('click', '.newBtn', function () {

      var RowIndex = $(this).closest('tr');
      var data = questionArray1.row(RowIndex).data();
      console.log('quest',data);
      // console.log('questionid...',questionId[0].parentId);

      for (var i = 0; i < questionId.length; i++) {
     if(data[1] == questionId[i].message){
        this.parent=questionId[i].id;


      }

      }
      // console.log('questionid...',this.parent);

      $.ajax({
        type: 'POST',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/'+this.parent,
        dataType: "json",
        isApproved:true,
        headers: {
          'Authorization': token,
        },


        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */
        success: function (response) {
          console.log('success',response);
          console.log(response.data);

          location.reload(true);

        }

      });


  });
  var  parentNew;
  $('#example').on('click', '.Mybtn', function (e) {

    var RowIndex = $(this).closest('tr');
    var data = questionArray1.row(RowIndex).data();


    for (var i = 0; i < questionId.length; i++) {
   if(data[1] == questionId[i].message){
      this.parentNew=questionId[i].id;

    }

    }
    console.log('questionid...',this.parentNew);

    $.ajax({
      type: 'POST',
      url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/'+this.parentNew,
      dataType: "json",
      headers: {
        'Authorization': token,
      },

      /**error callback of $.ajax if error occcurs */
      error: function (response) {
        console.log('error');
        return false;

      },/**success is callback of $.ajax */
      success: function (response) {
        console.log('success',response);
        console.log(response.data);

        location.reload(true);


      }

    });


});

          return false;

        },

      });


    });


  }






}
