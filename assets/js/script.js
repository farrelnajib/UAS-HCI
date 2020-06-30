"use strict";

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
    let loginData = localStorage.getItem('loggedInUser');
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

$('#login').on('click', '#loginButton', () => {
    let inputEmail = $('#email').val(),
        inputPassword = $('#password').val();

    const users = JSON.parse(sessionStorage.getItem('user'));

    if (users != null) {
        if (users.email == inputEmail) {
            if (users.password == inputPassword) {
                swal("Success", "Successfully logged in!", 'success').then(() => {
                    $('#loginModal').modal('hide');
                    localStorage.setItem('loggedInUser', users)
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