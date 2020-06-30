"use strict";

let email = false;
let password = false;

window.onload = function () {
    $(".pre-loader-icon").fadeOut("slow");
}

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

$('#navbar').on('click', '#loginModalButton', () => {
    $('#email').val('');
    $('#password').val('');

    $('#email').removeClass('is-invalid');
    $('#password').removeClass('is-invalid');

    $('#email').removeClass('is-valid');
    $('#password').removeClass('is-valid');
});

$('#navbar').ready(() => {
    $.get('partials/navbar.html', (data) => {
        $('#navbar').html(data);
        addActive();
        checkLogin();
    });
});

$('#login').ready(() => {
    $.get('partials/modal.html', (data) => {
        $('#login').html(data);
    });
});

function checkLogin() {
    let loginData = sessionStorage.getItem('loggedInUser');
    if (loginData) {
        $('#nav-button').html(`
        <div class="dropdown">
            <button class="btn btn-primary tombol dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Profile
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Profile</a>
                <a class="dropdown-item" href="#" onclick="logout()">Logout</a>
            </div>
        </div>
        `);
    } else {
        $('#nav-button').html(`
            <button class="btn btn-primary tombol" data-toggle="modal" data-target="#loginModal"
            id="loginModalButton">Login</button>
        `);
    }
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    $.notify({
        title: 'Successfully logged out!',
        message: ''
    }, {
        type: 'success'
    });

    checkLogin();
}

$('#login').on('click', '#loginButton', () => {
    let inputEmail = $('#email').val(),
        inputPassword = $('#password').val();

    const users = JSON.parse(sessionStorage.getItem('user'));

    if (users != null) {
        if (users.email == inputEmail) {
            if (users.password == inputPassword) {
                swal("Success", "Successfully logged in!", 'success').then(() => {
                    $('#loginModal').modal('hide');
                    sessionStorage.setItem('loggedInUser', JSON.stringify(users))
                    checkLogin();
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
    } else {
        $.notify({
            title: 'Email is not registered!',
            message: ''
        }, {
            type: 'danger'
        });
    }
});

$.notifyDefaults({
    element: "body",
    allow_dismiss: true,
    placement: {
        from: "top",
        align: "center"
    },
    z_index: 3000,
    delay: 5000,
    animate: {
        enter: 'animate__fadeInDown',
        exit: 'animate__fadeOutUp'
    },
    template: `
        <div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} animate__animated animate__faster" role="alert">
            <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
            <span data-notify="icon"></span>
            <span data-notify="title">{1}</span>
            <span data-notify="message">{2}</span>
            <div class="progress" data-notify="progressbar">
                <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
            </div>
        </div>`
});