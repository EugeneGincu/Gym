//---------------------------------------------------------------
//This script generates the main menu in the header of a webpage
//---------------------------------------------------------------
"use strict";

let menu = new Map(
    [
        ['Logo', 'index.html'],
        ['Classes', 'classes.html'],
        ['Membership', 'membership.html'],
        ['Facility', 'facility.html'],
        ['Coaching', 'coaching.html'],
        ['Locations', 'contact.html'],
        ['Cross-Reference', 'cross-reference.html']
    ]
);


let header = document.createElement('header');
let nav = document.createElement('nav');

header.appendChild(nav);
document.getElementsByTagName('body')[0].appendChild(header);

menu.forEach( (value, key) => {
    let a = document.createElement('a');
    a.setAttribute('href', value);
    a.textContent = key;

    nav.appendChild(a);
});

let span = document.createElement('span');
span.textContent = "Select location";
nav.appendChild(span);


