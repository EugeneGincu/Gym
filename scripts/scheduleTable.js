"use strict"
//Using currying to pass the user's location to the populateTable function instead of a default Event object
window.onload = populateTable.bind(null, selected_location);


function populateTable(location) {
    let table = document.getElementById('schedule');
    table.tBodies[0].remove();
    table.createTBody();
    table.caption.textContent = location;

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
    cell.textContent = daySchedule(date.getDay(), location);//date.getDate() + "/" + (date.getMonth()+1) + "/Day: " + date.getDay();

    if (date.getDay() === 6) {
        table.tBodies[0].appendChild(row);
        row = document.createElement('tr');
    }
        date.setDate(date.getDate() + 1);
    table.tBodies[0].appendChild(row);
    }
}

//Returns a string that represents the classes that take place on the input day.
function daySchedule(day, location) {
    let schedule = "";

    switch (location) {
        case 'Calgary':
            if (day === 0 || day === 3) {
                schedule += "Spin Class";
            } else if (day === 1 || day === 4) {
                schedule += "Stretching Class";
            } else if (day === 2 || day === 5) {
                schedule += "Fitness Class"
            }
            break;
        case 'Vancouver':
            if (day === 1 || day === 4) {
                schedule += "Spin Class";
            } else if (day === 3 || day === 6) {
                schedule += "Stretching Class";
            } else if (day === 0  || day === 3) {
                schedule += "Fitness Class"
            }
            break;
        case 'Toronto':
            if (day === 1 || day === 2) {
                schedule += "Spin Class";
            } else if (day === 3 || day === 4) {
                schedule += "Stretching Class";
            } else if (day === 0 || day === 6) {
                schedule += "Fitness Class"
            }
            break;
        case 'Halifax':
            if (day === 3 || day === 4) {
                schedule += "Spin Class";
            } else if (day === 0 || day === 6) {
                schedule += "Stretching Class";
            } else if (day === 1 || day === 2) {
                schedule += "Fitness Class"
            }
            break;
        default:
            break;
    }
    return schedule;
}