$(document).ready(function(){
//  DOM variables

// Javascript variables
var hourArray = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
var militaryHoursArray = ["9","10","11","12","13","14","15","16","17"];
// function definitions


var currentTime = setInterval( function(){
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.getElementById("currentDay").innerHTML = time;  
});


function updateBlocks(){
var currentHour = moment().hours();
$(".time-block").each(function(){
    var blockHour = parseInt($(this).attr("id"));
    console.log(blockHour);
    if (blockHour < currentHour){
        $(this).addClass("past");
    } else if (currentHour === blockHour){
        $(this).removeClass("past");
        $(this).addClass("present");
    } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
    }
})
};

function createRows() {
    for (var i = 0; i < hourArray.length;i++) {

        var savedText = localStorage.getItem(hourArray[i]);
        if (savedText === null){
            savedText="";
        };
        var newRow = $("<div>").addClass("row d-flex time-block past").attr("id", militaryHoursArray[i]);
        
        newRow.append($("<div>" + hourArray[i] + "</div>").addClass("col-2 hour"));

        newRow.append($("<textarea placeholder='Add Event'>" + savedText + "</textarea>").addClass("col-9"));

        newRow.append($("<button type='button submit' class='btn btn-primary saveBtn col-1'></button>").append("<i class='far fa-save fa-2x'></i>"));

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
updateBlocks();
};



//  function calls
createRows();
// event listeners


});
