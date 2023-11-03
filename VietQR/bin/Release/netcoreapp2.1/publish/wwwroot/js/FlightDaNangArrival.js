document.title = "Flight Schedule Online";
const pageCount = 2;
const startPage = 1;
const pageSize = 15;
const maxPage = startPage + pageCount - 1;
var currentPage = startPage;
var updateHourTimeOut;
var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");
// Check if page_view entry is present
if (visitCount) {
    visitCount = Number(visitCount) + 1;
    localStorage.setItem("page_view", visitCount);
} else {
    visitCount = 1;
    localStorage.setItem("page_view", 1);
}
$(function () {
    getData("");
 });

function getData(ButtonClick) {
    $.ajax({
        url: '/Flight/DANANG_ARRIVAL',
        type: 'post',
        data: {
            page: currentPage
        },
        success: function (res) {
            if (pageCount != 1) {
                if (currentPage == maxPage) {
                    currentPage = startPage;
                }
                else {
                    currentPage = currentPage + 1;
                }
            }
            if (ButtonClick != "") {
                clearTimeout(timeOutID);
            }
            $(".imgNotice").fadeOut(500);
            $(".bodyContent").fadeIn(500);

            var html = "";
            var flights = res;
            console.log(flights);
            for (var flight of flights) {

                var tdFlight;
                var reMark = flight.remarkVn;
                var remarkStyle = flight.remarkColor != null && flight.remarkColor != "" ? "color:" + flight.remarkColor + ";" : "";
                if (flight.codeShare != null && flight.codeShare != "") {
                    tdFlight = "<span class='primaryFlight'>" + flight.flightNo + "</span><span  class='codeShare' style='display:none;'>" + flight.codeShare + "</span>";
                }
                else {
                    tdFlight = flight.flightNo;
                }
                if (flight.remarkVn.includes("ki")) {
                    reMark = flight.remarkVn + " (*)"
                }


                html += "<tr>"
                    + "<td class='scheduled'>" + flight.scheduled + "</td>"
                    + "<td class='estimated'>" + flight.estimated + "</td>"
                    + "<td class='from'>" + flight.airport + "</td>"
                    + "<td class='flight'>" + tdFlight + "</td>"
                    + "<td class='belt-data'>" + flight.belt + "</td>"
                    + "<td class='remark' style=" + remarkStyle + "><span class='vn'>" + reMark + "</span><span class='eng' style='display:none;'>" + flight.remarkVn + "</span></td>"
                    + "</tr>";
                if (currentPage == 2) {
                    document.getElementById("page").innerHTML = "1/2";
                }
                else if (currentPage == 1) {
                    document.getElementById("page").innerHTML = "2/2";
                }

            }
            for (var i = 0; i < pageSize - flights.length; i++) {
                html += "<tr>"
                    + "<td class='scheduled'></td>"
                    + "<td class='estimated'></td>"
                    + "<td class='from'></td>"

                    + "<td class='flight'></td>"
                    + "<td class='belt-data'></td>"
                    + "<td class='remark'></td>"
                    + "</tr>";
            }
            $("tbody").html(html);
            timeOutID = setTimeout(function () {
                getData("");
            }, 10000);
            setTimeout(function () {
                $(".vn").hide();
                $(".eng").fadeIn(500);
            }, 10000);
            var f = true;
            var interval = setInterval(function () {
                if (f) {
                    $(".primaryFlight").hide();
                    $(".codeShare").slideDown(1000);
                }
                else {
                    $(".codeShare").hide();
                    $(".primaryFlight").slideDown(1000);
                }
                f = !f;
            }, 4000);
            setTimeout(function () { clearInterval(interval) }, 21000);



        },
        error: function () {
            $(".bodyContent").fadeOut(500);
            $(".imgNotice").fadeIn(500);
            setTimeout(getData, 23000);
        }

    });
}

var ButtonNext = () => {
    if (currentPage == 2) {
        currentPage = 2;
    }
    else {
        currentPage = 1;
    }
    var pause = document.getElementById("ButtonPause");
    pause.style = "padding-right:20px";

    getData("Next");
}
var ButtonPrev = () => {
    if (currentPage == 2) {
        currentPage = 2;
    }
    else {
        currentPage = 1;
    }
    var pause = document.getElementById("ButtonPause");
    pause.style = "padding-right:20px";

    getData("Prev");

}
var ButtonPause = () => {
    var pause = document.getElementById("ButtonPause");
    var computedStyle = window.getComputedStyle(pause);
    var textColor = computedStyle.color;

    if (textColor === "red") {
        pause.style = "padding-right:20px";
        ButtonNext();
    }
    else {
        pause.style = "color:red;padding-right:20px";
        clearTimeout(timeOutID);
    }

}