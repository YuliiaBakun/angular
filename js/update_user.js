let updateForm = document.forms['upuser-form'];
updateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let updateId = localStorage.getItem('id');
    ajax.send({
        method: 'PATCH',
        url: `https://report.inventorsoft.co/app/users/${updateId}`,
        data: JSON.stringify({
            firstName: updateForm.elements.firstname.value,
            lastName: updateForm.elements.lastname.value
        }),
        headers: {'Content-type': 'application/json', Authorization: localStorage.getItem('token')},
        success: function() {
           window.location.assign('users.html');
        }
    });
});
