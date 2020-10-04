$(document).ready(function(){
//  DOM variables

// var newRow = $("<tr>").addClass("d-flex");
// Javascript variables
var hourArray = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"]
// function definitions

function createRows() {
    

    for (var i = 0; i < hourArray.length;i++) {

        var savedText = localStorage.getItem(hourArray[i]);
        if (savedText === null){
            savedText="";
        };
        var newRow = $("<div>").addClass("row d-flex time-block past").attr("id", hourArray[i]);
        
        newRow.append($("<div>" + hourArray[i] + "</div>").addClass("col-1 hour"));

        newRow.append($("<textarea placeholder='Add Event'>" + savedText + "</textarea>").addClass("col-10"));

        newRow.append($("<button type='button submit' class='btn btn-primary saveBtn col-1'>Save</button>"));

        $(".container").append(newRow);

       
        
    };
    $(".saveBtn").on("click", function() {
        var userInput = $(this).siblings("textarea").val();
        var hour = $(this).siblings("div").text();
        console.log(userInput);
        console.log(hour);
        localStorage.setItem(hour, userInput);
    });
     
    $("#clear-events").on("click", function(event){
        event.preventDefault();
        window.localStorage.clear();
        $(".time-block").remove();
        createRows();
    })

};



//    function saveEvent() {
//        $(".btn").on("click", function(event){

//            var addEvent = JSON.parse(window.localStorage.getItem("userInput"));
//            window.localStorage.setItem("userInput", JSON.stringify(addEvent));
//            console.log(this);
//            console.log("User Input: " + addEvent);
           
//        }
//        );
//    }



// function changeColor() {
//     if (hourArray[5] < 12){
//         $(".time-block").addClass("past");
//     }
// }

//  function calls
createRows();
// saveEvent();
// changeColor();
// event listeners


});
