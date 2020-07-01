function addActive() {
    $('#queue').parent().addClass('active');
}

$(document).ready(() => {
    const appointment = JSON.parse(sessionStorage.getItem('appointment'));
    if (appointment) {
        $('#no-booking-data').css('display', 'none');
        $('#patient-name').html(appointment.nama);
        $.get('database/doctors.json', (data) => {
            $('#specialist-doctor').html(data[appointment.specialist].nama + ' - ' + appointment.doctor);
        });

        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date(appointment.date);
        let time = '';
        time += date.getDate() + ' ';
        time += month[date.getMonth()] + ' ';
        time += date.getFullYear() + ' @';
        time += appointment.time;
        $('#booking-time').html(time);

    } else {
        $('#booking-data').css('display', 'none');
    }
});