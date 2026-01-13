
"use strict"

let calculator_form = document.getElementById('calculators');
let calculators_list = document.querySelector('nav#calculators_list');

//Calculations and results for the Body composition calculator
function bodyComposition() {
    //Inputs
    let metric = document.getElementById('metric_body_comp').checked;
    let imperial = document.getElementById('imperial_body_comp').checked;
    let height = +document.getElementById('height').value;
    let weight = +document.getElementById('weight').value;
    let m_or_feet = +document.getElementById('height_m_or_feet').value;
    let gender = calculator_form.elements.gender.value;
    let age = +document.getElementById('age').value;
    let neck = +document.getElementById('neck').value;
    let waist = +document.getElementById('waist').value;
    let hip = +document.getElementById('hip').value;
    let frame_size = +calculator_form.elements.frame_size.value;

    //Outputs
    let bmi_result = document.getElementById('bmi_result');
    let bmr_result = document.getElementById('bmr_result');
    let body_fat_result = document.getElementById('body_fat_result');
    let ideal_weight_result = document.getElementById('ideal_weight_result');

    resetResults();

    //Metric formulas
    if (metric) {
        //BMI
        if (!!m_or_feet) {
            height += m_or_feet * 100;
        }
        bmi_result.textContent = Number(weight / ((height / 100) ** 2)).toPrecision(4);

        //BMR
        if (!!age) {
            if (gender === 'male')
                bmr_result.textContent = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5) + " Calories/day";
            else if (gender === 'female')
                bmr_result.textContent = Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161) + " Calories/day";
        }

        //Body Fat %
        if (!!neck && !!waist) {
            if (gender === 'male')
                body_fat_result.textContent = Number(495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450).toPrecision(4) + " %";
            else if (gender === 'female' && !!hip)
                body_fat_result.textContent = Number(495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450).toPrecision(4) + " %";
        }

        ideal_weight_result.textContent = "Min : " + Number(18.5 * (height/100) ** 2 * frame_size).toPrecision(4) +
            " kg, Max : " + Number(24.9 * ((height/100) ** 2) * frame_size).toPrecision(4) + " kg";

        //Imperial formulas
    } else if (imperial) {
        //BMI
        if (!!m_or_feet) {
            height += (m_or_feet * 12);
        }
        bmi_result.textContent = Number((weight / (height ** 2)) * 703).toPrecision(4);

        //BMR
        if (!!age) {
            if (gender === 'male')
                bmr_result.textContent = Math.round((4.536 * weight) + (15.875 * height) - (5 * age) + 5) + " Calories/day";
            else if (gender === 'female')
                bmr_result.textContent = Math.round((4.536 * weight) + (15.875 * height) - (5 * age) - 161) + " Calories/day";
        }

        //Body Fat %
        if (!!neck && !!waist) {
            if (gender === 'male')
                body_fat_result.textContent = Number(495 / (1.0324 - 0.19077 * Math.log10(waist * 2.54 - neck * 2.54) + 0.15456 * Math.log10(height * 2.54)) - 450).toPrecision(4) + " %";
            else if (gender === 'female' && !!hip)
                body_fat_result.textContent = Number(495 / (1.29579 - 0.35004 * Math.log10(waist * 2.54 + hip * 2.54 - neck * 2.54) + 0.22100 * Math.log10(height * 2.54)) - 450).toPrecision(4) + " %";
        }

        ideal_weight_result.textContent = "Min : " + Number(((18.5 * (height ** 2)) / 703)  * frame_size).toPrecision(4) +
            " lbs, Max : " + Number(((24.9 * (height ** 2)) / 703) * frame_size).toPrecision(4) + " lbs";
    }
}



//Calculations and results for the Workout calculators
function workoutTraining() {
	//Inputs
    let units = calculator_form.elements.units_workout.value;
	let met_value = +document.getElementById('met_value').value;
	let duration = +document.getElementById('duration').value;
	let weight = +document.getElementById('weight_calburn').value;
	let weight_lifted = +document.getElementById('weight_lifted').value;
	let reps = +document.getElementById('reps').value;
    //Outputs
    let calorie_burn_result = document.getElementById('calorie_burn_result');
    let one_rm_result = document.getElementById('one_rm_result');

    if (units === 'metric'){
        calorie_burn_result.textContent = Math.round(met_value * weight * duration / 60) + " calories";
        one_rm_result.textContent = Number(weight_lifted * (1 + (reps / 30 ))).toPrecision(4) + " kg";
    } else if (units === 'imperial'){
        calorie_burn_result.textContent = Math.round(met_value * (weight / 2.205) * (duration / 60)) + " calories";
        one_rm_result.textContent = Number(weight_lifted * (1 + (reps / 30))).toPrecision(4) + " lbs";
    }
}

//Submitting form calls appropriate calculator function
calculator_form.addEventListener('click', event => {
    if (event.target === document.getElementById('calculate_body_comp'))
        bodyComposition();
    else if (event.target === document.getElementById('calculate_workout'))
        workoutTraining();
});


//Navigation list of calculators displays only the selected calculator
calculators_list.addEventListener('click', event => {
    if (event.target === document.getElementById('show_body_comp')) {
        hideCalculators();
        document.getElementById('body_comp').hidden = false;
        document.getElementById('body_comp_results').hidden = false;

    } else if (event.target === document.getElementById('show_workout')) {
        hideCalculators();
        document.getElementById('workout').hidden = false;
        document.getElementById('workout_results').hidden = false;
    }
});

//Resets output results
function resetResults() {
    bmi_result.textContent = "";
    bmr_result.textContent = "";
    body_fat_result.textContent = "";
    ideal_weight_result.textContent = "";
}

//Hides all calculators, used with calculator navigation list
function hideCalculators() {
    document.getElementById('body_comp').hidden = true;
    document.getElementById('body_comp_results').hidden = true;
    document.getElementById('workout').hidden = true;
    document.getElementById('workout_results').hidden = true;
}

//Displays the Body composition calculator when the page loads
document.getElementById('show_body_comp').click();
