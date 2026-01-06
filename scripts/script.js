"use strict"
//**************************************************************************************
//Form
//**************************************************************************************

//Form location is set to the location selected in the header menu.
document.addEventListener('DOMContentLoaded', event => {
    document.getElementById('form_location').value = selected_location;
});

let form = document.querySelector('form#contact_form');
form.addEventListener('change', event => {
    let form_service = form.querySelector('#form_service');
    if (event.target !== form_service) return;

    form.querySelector('#membership_selector').hidden = true;
    form.querySelector('#coaching_selector').hidden = true;
    form.querySelector('#booking_selector').hidden = true;

    if (form_service.value === 'membership'){
        form.querySelector('#membership_selector').hidden = false;
    } else if (form_service.value === 'personal_coaching'){
        form.querySelector('#coaching_selector').hidden = false;
    } else if (form_service.value === 'booking') {
        form.querySelector('#booking_selector').hidden = false;
    }
})

//**************************************************************************************