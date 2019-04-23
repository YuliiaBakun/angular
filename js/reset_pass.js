let resetPassForm = document.forms['reset_pass-form'];

resetPassForm.addEventListener('submit', function(e) {
    e.preventDefault();

    ajax.send({
        method: 'POST',
        url: 'https://report.inventorsoft.co/app/no-auth/forgetPassword/resetPassword',
        data: JSON.stringify({
            "password": resetPassForm.elements.pass.value,
            "token": resetPassForm.elements.tokenValue.value,
        }),
        headers: {'Content-type': 'application/json'},
        success: function() {
            window.location.assign('login.html');
        }
    });
});
