//This script generates the main menu in the header of a webpage
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
        ['About', null],
        ['Calculators', 'calculators.html'],
        ['Services', null]
    ]
)

let menu = ['Services','Membership','Facility','Coaching','About','Cross-Reference'];


//Header Sub-Menu
let subMenu = new Map(
    [
        ['About', ['Contact', 'Locations']],
        ['Services', ['Classes', 'Schedule', 'Calculators']]
    ]
)

let header = document.querySelector('body > header');
let nav = document.createElement('nav');
header.appendChild(nav);


//Creates the header menu flexbox links
menu.forEach( value => {
    let div = document.createElement('div');
    let a = document.createElement('a');
    a.setAttribute('href', links.get(value));
    a.textContent = value;
    div.appendChild(a);
    if (subMenu.keys().toArray().includes(value))
        a.classList.add('dropdown_title');
    nav.appendChild(div);
    // div.setAttribute('position', 'relative');
});

//Clicking on header menu opens/closes submenu, clicking anywhere in document closes submenu.
header.addEventListener('click', event => {
    //If click is on logo, the link is allowed to go through
    if (event.target.closest('header > a')) return;

    event.preventDefault();

    //If click is within the header navigation, follow the href of the non-dropdown link or a submenu link
    if (event.target.closest('header > nav')) {
        let link = event.target.getAttribute('href') ?? event.target.firstElementChild.getAttribute('href') ?? '';
        if (links.values().toArray().includes(link))
            window.location.href = link;
    }

    //Mobile menu hamburger click
    if (event.target.closest('#mobile_menu')) {
        nav.classList.toggle('mobile_nav_show');
    }

    //Header mobile menu open/close
    if (window.getComputedStyle(nav).flexFlow === "column nowrap" &&
        (event.target.classList.contains('dropdown') || event.target.classList.contains('dropdown_title'))){
        let menu_div = event.target.tagName === "A"? event.target.parentNode : event.target;
        let mobile_submenu = menu_div.querySelector('div.submenu');
        if (!mobile_submenu.classList.contains('mobile_submenu_show')) {
            closeMobileDropdowns();
            mobile_submenu.classList.add('mobile_submenu_show');
        }
        else
            closeMobileDropdowns();
    } else
        closeMobileDropdowns();

    //Location submenu open/close
    let location_link = document.getElementById('location_link');
    if (event.target === location_link)
        location_submenu_div.classList.toggle('location_submenu_show');
    else
        location_submenu_div.classList.remove('location_submenu_show');
});

//Support function that closes all mobile dropdowns
function closeMobileDropdowns() {
    nav.querySelectorAll('div.submenu').forEach( div => {
        div.classList.remove('mobile_submenu_show');
    });
}

//Close all mobile header menu dropdowns when window is resized
window.addEventListener('resize', () => closeMobileDropdowns());

//Create hidden submenus for each header menu that has a dropdown submenu.
subMenu.forEach((value, key) => {
    for (let menu_div of nav.children) {
        if (menu_div.firstChild.textContent === key) {

            let submenu_div = document.createElement('div');
            submenu_div.classList.add('submenu');
            // menu_div.appendChild(submenu_div);
            menu_div.insertAdjacentElement('beforeend', submenu_div);//test
            menu_div.classList.add('dropdown');
            for (let submenu_item of value) {
                let submenu_link = document.createElement('a');
                submenu_link.textContent = submenu_item;
                submenu_link.setAttribute('href', links.get(submenu_item));
                submenu_div.appendChild(submenu_link);
            }
        }
    }
})


//**************************************************************************************
//Header "Your Location" Menu
//**************************************************************************************
const savedLocation = localStorage.getItem('selectedLocation');
let selected_location = savedLocation || "Calgary";
let location_div = document.createElement('div');
let location_submenu_div = document.createElement('div');

location_div.setAttribute('id', 'location_menu');
location_div.innerHTML = "<a href='' id='location_link' onclick='return false'>" + selected_location + "</a>";
header.appendChild(location_div);
location_div.appendChild(location_submenu_div);

//Mobile menu burger
let span = document.createElement('span');
let mobile_menu = document.createElement('span');
span.appendChild(mobile_menu)
mobile_menu.setAttribute('id', 'mobile_menu');
mobile_menu.innerHTML = "<img src='images/mobile_menu.png' style='width:40px' alt='Mobile Menu'/>";
location_div.insertAdjacentElement('afterbegin', span);

let locations = ["Calgary", "Vancouver", "Toronto", "Halifax"];

//Set up each location link
locations.forEach(val => {
    let a = document.createElement('a');
    a.dataset.location = val;
    a.textContent = val;
    a.href="";
    a.addEventListener('click', e => e.preventDefault());
    location_submenu_div.appendChild(a);
})

//Selecting a location also changes the coaches and class schedules for that city
location_submenu_div.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        selected_location = event.target.dataset.location;
        location_div.querySelector('A').textContent = event.target.dataset.location;

        localStorage.setItem('selectedLocation', selected_location);
        location_submenu_div.classList.toggle('location_submenu_show');

        //Form location is in sync with the header menu location selection.
        if (document.getElementById('form_location'))
            document.getElementById('form_location').value = selected_location;

        if (typeof coachingLocation === 'function')
            coachingLocation(selected_location);

        if (typeof populateTable === 'function')
            populateTable(selected_location);
    }
})
//********************************************************************************

