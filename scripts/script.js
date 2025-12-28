"use strict"
//**************************************************************************************
//Form
//**************************************************************************************

//Form location is set to the location selected in the header menu.
document.addEventListener('DOMContentLoaded', event => {
    document.getElementById('form_location').value = selected_location;
});

//**************************************************************************************