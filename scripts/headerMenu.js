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
// let menu = new Map(
//     [
//         // ['Logo', 'index.html'],
//         ['Classes', 'classes.html'],
//         ['Membership', 'membership.html'],
//         ['Facility', 'facility.html'],
//         ['Coaching', 'coaching.html'],
//         ['Contact', 'contact.html'],
//         ['Cross-Reference', 'cross-reference.html']
//     ]
// );

let menu = ['Services','Membership','Facility','Coaching','Contact','Cross-Reference'];

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
    a.setAttribute('position', 'relative');
});

let span = document.createElement('span');
span.textContent = "Select location";
header.appendChild(span);

//Header Sub-Menu
let subMenu = new Map(
    [
        ['Contact', ['Location', 'About']],
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
            submenu_div.style.position = 'absolute';
            // submenu_div.style.display = 'none';

        }
    }
})



