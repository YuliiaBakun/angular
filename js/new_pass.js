let newPassForm = document.forms['new_pass-form'];

newPassForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let emailValue = newPassForm.elements.mailValue.value;
    ajax.send({
        method: 'POST',
        url: `https://report.inventorsoft.co/app/no-auth/forgetPassword?email=${encodeURIComponent(emailValue)}`,

        headers: {'Content-type': 'application/json' , Authorization: localStorage.getItem('token')},
        success: function() {
            window.location.assign('reset_pass.html');
        }
    });
});
