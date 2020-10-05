$(document).ready(function(){

var hourArray = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
var militaryHoursArray = ["9","10","11","12","13","14","15","16","17"];

// Displays and updates the current time live
var currentTime = setInterval( function(){
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.getElementById("currentDay").innerHTML = time;  
});

// Changes the clss of the time blocks depending on if they have past, are current, or are still to come.
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

// Dynamically creates new rows for each time block and adds necessary information to it
function createRows() {
    for (var i = 0; i < hourArray.length;i++) {

        // gets the users input from local storage
        var savedText = localStorage.getItem(hourArray[i]);

        // ensures that a block without any saved information will show it's placeholder instead of saying "null"
        if (savedText === null){
            savedText="";
        };
        var newRow = $("<div>").addClass("row d-flex time-block past").attr("id", militaryHoursArray[i]);
        
        newRow.append($("<div>" + hourArray[i] + "</div>").addClass("col-2 hour"));

        newRow.append($("<textarea placeholder='Add Event'>" + savedText + "</textarea>").addClass("col-9"));

        newRow.append($("<button type='button submit' class='btn btn-primary saveBtn col-1'></button>").append("<i class='far fa-save fa-2x'></i>"));

        $(".container").append(newRow);
  
    };

    // saves the users input into local storage
    $(".saveBtn").on("click", function() {
        var userInput = $(this).siblings("textarea").val();
        var hour = $(this).siblings("div").text();
        console.log(userInput);
        console.log(hour);
        localStorage.setItem(hour, userInput);
    });
     
    // clears all saved events from local storage and clears all of the input fields
    // $("#clear-events").on("click", function(){
    //     // event.preventDefault();
    //     // window.localStorage.clear();
    //     // $(".time-block").remove();
    //     // createRows();
    //     var clearAll = confirm("Are you sure you would like to clear ALL of the events?");
    //     if (clearAll === true){
    //         // event.preventDefault();
    //         window.localStorage.clear();
    //     $(".time-block").remove();
    //     createRows();
    //     };
    // });
updateBlocks();
};

// clears all saved events from local storage and clears all of the input fields
$("#clear-events").on("click", function(event){
    event.preventDefault();
    // Double checks that you want to clear all events
    var clearAll = confirm("Are you sure you would like to clear ALL of the events?");
    if (clearAll === true){
        window.localStorage.clear();
    $(".time-block").remove();
    createRows();
    };
});

// This will run when the page is opened
createRows();

});
