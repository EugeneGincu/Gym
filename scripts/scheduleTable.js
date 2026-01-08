"use strict"
window.onload = populateTable;


function populateTable() {
    let table = document.getElementById('schedule');
    // let body = table.body;
    // console.log("Body" + body);
    let date = new Date();
    date.setHours(3);
    date.getDay();
    let row = document.createElement('tr');

    //Premake table cells for current week days that have passed
    if (date.getDay() > 0) {
        for (let i = 0; i < date.getDay(); i++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
        }
    }

    //Creates 30 cells and appends them to a new table row each Sunday
    for (let i = 0; i < 31; i++) {
    let cell = document.createElement('td');
    row.appendChild(cell);
    cell.textContent = daySchedule(date.getDay());//date.getDate() + "/" + (date.getMonth()+1) + "/Day: " + date.getDay();

    if (date.getDay() === 6) {
        table.tBodies[0].appendChild(row);
        row = document.createElement('tr');
    }
        date.setDate(date.getDate() + 1);
    table.tBodies[0].appendChild(row);
    }
}

//Returns a string that represents the classes that take place on the input day.
function daySchedule(day) {
    let schedule = "";

    if (day === 0 || day === 3) {
        schedule += "Spin Class";
    } else if (day === 1 || day === 4) {
        schedule += "Stretching Class";
    } else if (day === 2 || day === 5) {
        schedule += "Fitness Class"
    }

    return schedule;
}