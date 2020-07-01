let specialists,
    doctors,
    bookingForm = {
        specialist: false,
        doctor: false,
        purpose: false,
        date: false,
        complaints: false,
        time: false,
    },
    doctorsCollection = {
        "umum": {
            "nama": "Poli Umum",
            "dokter": [
                "Dr. KevinA",
                "Dr. MalvinK"
            ]
        },
        "kebidanan": {
            "nama": "Poli Kebidanan",
            "dokter": [
                "Dr. Reta",
                "Dr. Vaness"
            ]
        },
        "gigi": {
            "nama": "Poli Gigi",
            "dokter": [
                "Drg. Farrel",
                "Drg. Emon"
            ]
        },
        "fisioterapi": {
            "nama": "Poli Fisioterapi",
            "dokter": [
                "Dr. Culphin",
                "Dr. Joy"
            ]
        }
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
    specialists = doctorsCollection;
    $('#specialist').append(`<option selected disabled>Choose specialist</option>`);

    for (let specialist in specialists) {
        $('#specialist').append('<option value="' + specialist + '">' + specialists[specialist]['nama'] + '</option>')
    }

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
    let loginData = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loginData == null) {
        $.notify({
            title: 'Please login first',
            message: ''
        }, {
            type: 'danger'
        });
    } else {
        const formData = $('form#bookForm').serializeArray();
        let storedData = {};
        storedData['nama'] = loginData.nama
        formData.forEach(data => {
            storedData[data.name] = data.value;
        });
        console.log(doctorsCollection[storedData['specialist']].nama);
        storedData['specialist'] = doctorsCollection[storedData['specialist']].nama;

        sessionStorage.setItem('appointment', JSON.stringify(storedData));
        swal('Success', 'Successfully booked your appointment', 'success')
            .then(() => {
                window.location = 'queue.html';
            });
    }
});