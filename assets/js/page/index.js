let specialists,
    doctors;

function addActive() {
    $('#home').parent().addClass('active');
}

$(document).ready(() => {
    specialists = $.get('database/doctors.json', (data) => {
        specialists = data;
        $('#specialist').append(`<option selected disabled>Choose specialist</option>`);

        for (let specialist in specialists) {
            $('#specialist').append('<option value="' + specialist + '">' + specialists[specialist]['nama'] + '</option>')
        }
    });
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