// error modal
function errFunc(xhrObj) {
    $('#errorModal').modal('show',
        $('#numberError').text(xhrObj.status)
    );
}

// refresh token
setInterval(function() {
    ajax.send({
        method: 'GET',
        url: `https://report.inventorsoft.co/app/refresh-token`,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function(res) {
            console.log(res);
            localStorage.setItem('token', res);
        }
    });
}, 1000 * 60 * 5);
