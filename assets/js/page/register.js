let forms1 = {
    'username': false,
    'email': false,
    'password1': false,
    'password2': false
};
let forms2 = {
    'nama': false,
    'alamat': false,
    'gender': false,
    'telepon': false,
    'dob': false,
};
let currentStep = 0;
showTab(currentStep);
validate(currentStep);

window.onload = function () {
    $(".pre-loader-icon").fadeOut("slow");
}

function showTab(n) {
    let tab = $('.tab');
    let button = $('#nextButton');
    tab[n].style.display = 'block';
    fixStepIndicator(n)

    if (n == 0) {
        button.html(`Next &ThickSpace; <i class="fa fa-chevron-right"></i>`);
        $('.step')[0].removeAttribute('onclick');
    } else {
        button.html('Submit');
        $('.step')[0].setAttribute('onclick', 'next(-1)');
    }
}

function submit() {
    const formData = $('form#registerForm').serializeArray();
    let storedData = {};
    formData.forEach(data => {
        if (data.name == 'password1' || data.name == 'password2') {
            data.name = 'password';
        }
        storedData[data.name] = data.value;
    });

    sessionStorage.setItem('user', JSON.stringify(storedData));
    swal("Success", "Successfully registered", 'success').then(() => {
        window.location = '././index.html';
    });
}

function next(n) {
    if (n == 1 && !validate(currentStep)) return false;
    if (currentStep == 1 && n == 1) {
        submit();
    } else {
        let tabs = $('.tab'),
            steps = $('.step');
        tabs[currentStep].style.display = 'none';
        if (n == 1) {
            steps[currentStep].classList.add('finish');
            steps[currentStep].style.cursor = 'pointer';
        } else {
            steps[currentStep - 1].classList.remove('finish');
            steps[currentStep - 1].style.cursor = 'default';
        }

        currentStep += n;
        showTab(currentStep);
        validate(currentStep);
        fixStepIndicator(currentStep);
    }
}

function checkEmpty(data) {
    let inputName = data.name; //name of input
    let nameField = $('input[name="' + inputName + '"]'); //Input element
    let dataInput = nameField.val(); //Value inputted

    let valid;
    let message;

    let whichInput = '';
    switch (inputName) {
        case 'username':
            whichInput = 'username';
            break;
        case 'email':
            whichInput = 'email address';
            break;
        case 'password1':
            whichInput = 'password';
            break;
        case 'password2':
            whichInput = 'password';
            break;
        case 'nama':
            whichInput = 'nama';
            break;
        case 'alamat':
            whichInput = 'alamat';
            break;
        case 'gender':
            whichInput = 'gender';
            break;
        case 'telepon':
            whichInput = 'telepon';
            break;
        case 'dob':
            whichInput = 'birth date';
        default:
            break;
    }

    if (dataInput == '') {
        valid = false;
        message = 'Please insert ' + whichInput + '.';
    } else if (inputName == 'email') {
        if (!isEmail(dataInput)) { //Check if email is valid
            valid = false;
            message = 'Email address is not valid.';
        } else {
            valid = true;
        }
    } else if (inputName == 'password2') {
        let password1 = $('input[name="password1"]');
        if (password1.val() != dataInput) {
            valid = false;
            message = 'Password doesn\'t match';
        } else {
            valid = true;
        }
    } else if (inputName == 'password1') {
        let password2 = $('input[name="password2"]');
        if (password2.val() != dataInput) {
            forms1['password2'] = false;

            password2.removeClass('is-valid');
            password2.addClass('is-invalid');

            password2.siblings('.invalid-feedback').remove();
            password2.after(`
                <div class="invalid-feedback">
                    Password doesn't match
                </div>
            `);
        } else {
            forms1['password2'] = true;

            password2.addClass('is-valid');
            password2.removeClass('is-invalid');
            password2.siblings('.invalid-feedback').remove();
        }

        if (dataInput.length < 6) {
            valid = false;
            message = 'Password must be more than 6 characters';
        } else if (!validPassword(dataInput)) {
            valid = false;
            message = 'Password must contains letters and numbers';
        } else {
            valid = true;
        }
    } else if (inputName == 'gender') {
        if ($('input[name="' + inputName + '"]:checked').val() == undefined) {
            valid = false;
            message = 'Gender must be selected';
        } else {
            valid = true;
        }
    } else {
        valid = true;
    }

    if (valid) {
        if (currentStep == 0) {
            forms1['' + inputName + ''] = true;
        } else {
            forms2['' + inputName + ''] = true;
        }

        nameField.addClass('is-valid');
        nameField.removeClass('is-invalid');
        nameField.siblings('.invalid-feedback').remove();
    } else {
        if (currentStep == 0) {
            forms1['' + inputName + ''] = false;
        } else {
            forms2['' + inputName + ''] = false;
        }

        nameField.removeClass('is-valid');
        nameField.addClass('is-invalid');

        nameField.siblings('.invalid-feedback').remove();
        nameField.after(`
            <div class="invalid-feedback">
                ` + message + `
            </div>
        `);
    }

    validate(currentStep);
}

function isEmail(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function validPassword(password) {
    let regex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    return regex.test(password);
}

function validate(n) {
    let valid = true,
        forms;
    if (n == 0) {
        forms = forms1;
    } else {
        forms = forms2;
    }

    for (let form in forms) {
        if (!forms[form]) {
            valid = false;
            break;
        }
    }

    if (valid) {
        document.getElementById('nextButton').removeAttribute('disabled');
        document.getElementById('nextButton').classList.remove('disabled');
    } else {
        document.getElementById('nextButton').setAttribute('disabled', true);
        document.getElementById('nextButton').classList.add('disabled');
    }

    return valid;
}

function fixStepIndicator(n) {
    let steps = $('.step');
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove('active');
    }

    steps[n].classList.add('active');
}

$('#nextButton').click(() => {
    blur();
});