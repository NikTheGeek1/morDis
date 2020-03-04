$(document).ready(function(){
  var q_order =  [0,1,2,3,4]//$("#questionnaires_order").val().split(","); // change this to let participants choose wich questionnaire to complete
  shuffle(q_order)
  var responses_ojb = {};
  responses_ojb['user_id'] = makeid(7); // making user id
  // enable the debrief button when all questions have been answered
  posttest_button_disabler = function () {
  	if($("#age").val() === '' || $("#sex").val() === 'noresp' ||
    $("#focus_question").val() === '--' || $("#pol_orientation").val() === '--') {
  		$('#debrief-button').prop('disabled', true);
      $('#debrief-button').css( "background-color", "grey");
  	} else{
  		$('#debrief-button').prop('disabled',false);
      $('#debrief-button').css( "background-color", "green");

  	}
  }

  //Assign the (dis)abler function to all posttestQ class objects
  $(".posttestQ").change(function () {
  	posttest_button_disabler();
  })

  // we show the first participant's option at the beginning
  $("#ethics-div").show();
  $("#QuestNum").html(q_order.length)
  // ethics button
  $("#button-ethics").on('click', function(){
    $("#ethics-div").hide();
    $("#q"+q_order[0]+"_div").show();
  });
  // debrief button
  $("#debrief-button").on('click', function(){
    // collecting data
    responses_ojb['age'] = $("#ageinput").val();
    responses_ojb['sex'] = $("#sex").val();
    responses_ojb['focus'] = $("#focus_question").val();
    responses_ojb['political_or'] = $("#pol_orientation").val();
    // storing them to responses_ojb
    saveToMongodb(responses_ojb); // passing the data on mongoDB
    $("#debrief").hide();
    $("#thank-u-div").show();
    $("#q"+q_order[0]+"_div").show();
  });


  for(let i = 0; i < q_order.length; i++) {

      $("#button"+q_order[i]).on('click', function(){
          var responses = [];
          // collecting data
          $('#form'+q_order[i]+' input:checked').each(function(){
            responses.push(this.value);
          });
          // checking if responses are as many as they are supposed to be
          // first we take the number of UNIQUE inputs based on their name
          var inputs = $('#form'+q_order[i]+' input')
          var inputNames = []
          inputs.each(function(){
            inputNames.push(this.name);
          });
          var counts = {}; // counting the number of unique names
          for (let i = 0; i < inputNames.length; i++) {
              counts[inputNames[i]] = 1 + (counts[inputNames[i]] || 0);
          }
          // checking if the length of the unique inputs is the same as the given answers
          var isUnanswered = Object.keys(counts).length !== responses.length;
          if (isUnanswered) {
            alert('You must answer all questions.')
          } else{
            $(window).scrollTop(0); // scrolling to the top
            // stonring data in responses object
            responses_ojb["q"+i] = responses

            // which ones we take out when the button is pressed?
            $("#q"+q_order[i]+"_div").hide();

            if((i+1) === q_order.length){ // if it's the final quest. then we bring in deb
              $("#questionnaires-div").hide();
              $("#debrief").show();
              $('#user_id').html(responses_ojb['user_id']);
            } else{ // if it's not the final questionnaire we bring in the next one
              // which ones we bring in when the button is pressed?
              $("#q"+q_order[i+1]+"_div").show();
            } // end of inner else

          } // end of outter else


        }); // end of .on click handler

} // for loop

// debrief button storing data

});
