//---------------------------------------------------------------
//This script generates the main menu in the header of a webpage
//---------------------------------------------------------------
"use strict";


//Header Menu
let links = new Map(
    [
        ['Logo', 'index.html'],
        ['Classes', 'classes.html'],
        ['Facility', 'facility.html'],
        ['Membership', 'membership.html'],
        ['Coaching', 'coaching.html'],
        ['Contact', 'contact.html'],
        ['Cross-Reference', 'cross-reference.html'],
        ['Locations', 'locations.html'],
        ['Schedule', 'schedule.html'],
        ['About', 'about.html'],
        ['Tools', 'tools.html'],
        ['Services', 'services.html']
    ]
)

let menu = ['Services','Membership','Facility','Coaching','Contact','Cross-Reference'];
const savedLocation = localStorage.getItem('selectedLocation');
let selected_location = savedLocation || "Select location";

let header = document.querySelector('body > header');
let nav = document.createElement('nav');
header.appendChild(nav);

menu.forEach( value => {
    let div = document.createElement('div');
    let a = document.createElement('a');
    a.setAttribute('href', links.get(value));
    // if (key === 'Logo') {
    //     let img = document.createElement('img');
    //     img.src = "images/logo.png";
    //     a.appendChild(img);
    // }
    // else
    a.textContent = value;
    div.appendChild(a);
    nav.appendChild(div);
    // div.setAttribute('position', 'relative');
});



//Header Sub-Menu
let subMenu = new Map(
    [
        ['Contact', ['Locations', 'About']],
        ['Services', ['Classes', 'Schedule', 'Tools']]
    ]
)

subMenu.forEach((value, key) => {
    for (let menu_div of nav.children) {
        console.log(menu_div.firstChild.textContent);
        if (menu_div.firstChild.textContent === key) {
            let submenu_div = document.createElement('div');
            menu_div.appendChild(submenu_div);
            menu_div.classList.add('dropdown');
            for (let submenu_item of value) {
                let submenu_link = document.createElement('a');
                submenu_link.textContent = submenu_item;
                submenu_link.setAttribute('href', links.get(submenu_item));
                submenu_div.appendChild(submenu_link);
            }
            // submenu_div.style.position = 'absolute';
            // submenu_div.style.display = 'none';

        }
    }
})

//Header "Select Location" Menu
let location_div = document.createElement('div');
let location_submenu_div = document.createElement('div');

location_div.setAttribute('id', 'location_menu');
location_div.innerHTML = "<a href='' onclick='return false'>" + selected_location + "</a>";
header.appendChild(location_div);
location_div.appendChild(location_submenu_div);

let locations = ["Location A", "Location B", "Location C", "Location D"];

locations.forEach(val => {
    let a = document.createElement('a');
    a.dataset.location = val;
    a.textContent = val;
    a.href="";
    a.addEventListener('click', e => e.preventDefault());
    location_submenu_div.appendChild(a);
})

location_div.firstChild.addEventListener('click', () => {
    location_submenu_div.classList.toggle('location_submenu_toggle');

})

location_submenu_div.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        console.log(event.target.dataset.location);
        console.log(location_div.querySelector('A').textContent);
        selected_location = event.target.dataset.location;
        location_div.querySelector('A').textContent = event.target.dataset.location;

        localStorage.setItem('selectedLocation', selected_location);
        location_submenu_div.classList.toggle('location_submenu_toggle');
    }
})



