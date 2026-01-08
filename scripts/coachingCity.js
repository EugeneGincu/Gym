"use strict"


let location_temp = document.getElementById('location_menu').firstElementChild.textContent;
let current_city = document.createElement('h1');
current_city.textContent = "Coaches in " + location_temp;
document.getElementById('coach_grid')
    .insertAdjacentElement("beforebegin", current_city);
coachingLocation(location_temp);

function coachingLocation(location) {
    let divs = document.getElementById('coach_grid');

    current_city.textContent = "Coaches in " + location;

    let cities = new Map([
        ['Calgary', divs.querySelectorAll('div.Calgary')],
        ['Vancouver', divs.querySelectorAll('div.Vancouver')],
        ['Toronto', divs.querySelectorAll('div.Toronto')],
        ['Halifax', divs.querySelectorAll('div.Halifax')]
    ]);

    //Hide all cities when location is changed by user.
    cities.values().forEach(divs => {
        divs.forEach( div => {
            div.hidden = true;
        })
    });

    //Show only city that matches location selected by user.
    cities.get(location).forEach(div => {
        div.hidden = false;
    });
}






//**************************************************************************************