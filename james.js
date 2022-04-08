// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
var today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY, HH:mm:ss"));
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
var saveBtn = $(".saveBtn");
saveBtn.on("click", function() {
    console.log("saving task " ,$(this))
    var time = $(this).siblings(".hour").text();
    var task = $(this).siblings(".task").val();
    // task will be save to local storage

    localStorage.setItem(time, task);
})


// WHEN I refresh the page
// THEN the saved events persist
function memory(){
    $(".hour").each(function() {
        var NOW = $(this).text();
        var toDO = localStorage.getItem(NOW);
        console.log(NOW);
        console.log(toDO);
        if (toDO !== null) {
            $(this).siblings(".task").val(toDO);
        }
    })
}

// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future

function BlockTimeColor(){
    var time = moment().hours();
    $(".time-block").each(function(){
        var currentTime = parseInt($(this).attr("id"));
    // console.log(currentTime);
        if (currentTime > time){
            $(this).addClass("future");
            $(this).removeClass("past");
            $(this).removeClass("present");
        } 
        else if (currentTime < time) { 
            $(this).addClass("past");
            $(this).removeClass("present");
            $(this).removeClass("future");
        }
        else{
            $(this).addClass("present");
            $(this).removeClass("past");
            $(this).removeClass("future");
        }
    })
}

BlockTimeColor();
memory();