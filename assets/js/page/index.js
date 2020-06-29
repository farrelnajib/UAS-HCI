let email = false;
let password = false;

function validate() {
    if (email && password) {
        document.getElementById('loginButton').removeAttribute('disabled');
        document.getElementById('loginButton').classList.remove('disabled');
    } else {
        document.getElementById('loginButton').setAttribute('disabled', true);
        document.getElementById('loginButton').classList.add('disabled');
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function validateInput(element) {
    let name = element.getAttribute('name');
    let val = element.value;
    if (val == '') {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        if (name == 'email') {
            email = false;
        } else {
            password = false;
        }
    } else if (name == 'email') {
        if (!isEmail(val)) {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            email = false;
        } else {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            email = true;
        }
    } else {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        if (name == 'email') {
            email = true;
        } else {
            password = true;
        }
    }

    validate();
}

$(document).ready(() => {
    $.get('partials/navbar.html', (data) => {
        $('#navbar').html(data);
        $('#home').parent().addClass('active');

        checkLogin();
    });
});

function checkLogin() {
    let loginData = localStorage.getItem('session');
    if (loginData) {
        $('#loginModalButton')
            .html('Profile')
            .removeAttr('data-toggle')
            .removeAttr('data-target');
    } else {
        $('#loginModalButton')
            .html('Login')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#loginModal');
    }
}

$('#loginButton').click(() => {
    let inputEmail = $('#email').val(),
        inputPassword = $('#password').val();

    const users = JSON.parse(sessionStorage.getItem('user'));
    let isEmail = false;

    if (users.email == inputEmail) {
        if (users.password == inputPassword) {
            swal({
                title: 'Success!',
                message: 'Successfully logged in',
                icon: 'success',
                button: 'Proceed'
            }).then(() => {
                $('#loginModal').modal('hide');
            });
        } else {
            $.notify({
                title: 'Invalid password!',
                message: ''
            }, {
                type: 'danger'
            });
        }
    } else {
        $.notify({
            title: 'Email is not registered!',
            message: ''
        }, {
            type: 'danger'
        });
    }
});