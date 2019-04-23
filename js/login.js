// login
let logForm = document.forms['logForm'];
logForm.addEventListener('submit', function(e) {
    e.preventDefault();

    ajax.send({
        method: 'POST',
        url: 'https://report.inventorsoft.co/app/no-auth/login',
        data: JSON.stringify({
            password: logForm.elements.pass.value,
            userName: logForm.elements.mail.value
        }),
        headers: {'Content-type': 'application/json'},
        success: function(res) {
            localStorage.setItem('token',res);
            location.assign('users.html');
        }
    });
});

// forgot password
document.querySelector('.forgot-pass').addEventListener('click', function() {
    location.assign('new_pass.html');
});


