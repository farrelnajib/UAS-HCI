let specialists,
    doctors,
    bookingForm = {
        specialist: false,
        doctor: false,
        purpose: false,
        date: false,
        complaints: false,
        time: false,
    };

function addActive() {
    $('#home').parent().addClass('active');
}

function checkBooking(data) {
    let name = data.getAttribute('name');
    if (data.value) {
        bookingForm[name] = true;
    } else {
        bookingForm[name] = false;
    }

    validateBooking();
}

function validateBooking() {
    let valid = true;

    for (let form in bookingForm) {
        if (!bookingForm[form]) {
            valid = false;
            break;
        }
    }

    if (valid) {
        document.getElementById('bookButton').removeAttribute('disabled');
        document.getElementById('bookButton').classList.remove('disabled');
    } else {
        document.getElementById('bookButton').setAttribute('disabled', true);
        document.getElementById('bookButton').classList.add('disabled');
    }
}

$(document).ready(() => {
    specialists = $.get('database/doctors.json', (data) => {
        specialists = data;
        $('#specialist').append(`<option selected disabled>Choose specialist</option>`);

        for (let specialist in specialists) {
            $('#specialist').append('<option value="' + specialist + '">' + specialists[specialist]['nama'] + '</option>')
        }
    });

    validateBooking();
});

$('#specialist').change(() => {
    const specialist = $('#specialist').val();
    doctors = specialists[specialist]['dokter'];

    $('#doctor').html('<option selected disabled>Choose doctor</option>');
    doctors.forEach(doctor => {
        $('#doctor').append('<option value="' + doctor + '">' + doctor + '</option>')
    });
});

$('#bookButton').click(() => {
    swal('Success', 'Successfully booked your appointment', 'success')
        .then(() => {
            window.location = 'queue.html';
        });
});