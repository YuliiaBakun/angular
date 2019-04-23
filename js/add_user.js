let addForm = document.forms['add_user-form'];
addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    ajax.send({
        method: 'POST',
        url: 'https://report.inventorsoft.co/app/users',
        data: JSON.stringify({
            firstName: addForm.elements.firstname.value,
            lastName: addForm.elements.lastname.value,
            email: addForm.elements.mail.value,
            password: addForm.elements.pass.value
        }),
        headers:
            {'Content-type': 'application/json', Authorization: localStorage.getItem('token')},
        success: function() {
           window.location.assign('users.html');
        }
    });
});