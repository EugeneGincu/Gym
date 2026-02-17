"use strict"

let figure = document.getElementsByTagName('figure')[0];
let images = [
    'images/Hero1.png',
    'images/Hero2.png',
    'images/Hero3.png'
];
let index = 0;

function changeImage() {
    figure.innerHTML = `<img src=${images[index]} alt="People working out."/>`;
    index = (index + 1) % 3;
}

changeImage();

setInterval(changeImage, 5000);