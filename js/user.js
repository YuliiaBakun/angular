let table = document.querySelector('.table tbody');
let addButton = document.querySelector('.add');
let searchForm = document.forms['search_user'];
let allUsers = document.querySelector('.all');
let pageSize = 5;
let page = 0;
let paginationBlock = document.querySelector('.pagination-block');

function getUsers() {
    ajax.send({
        method: 'GET',
        url: `https://report.inventorsoft.co/app/users?pageSize=${pageSize}&page=${page}&sortBy=id`,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function(res) {
            const response = JSON.parse(res);
            let arrUsers = response.content;
            drawUsers(arrUsers);
            let pag = response.totalPages;
            drawPages(pag);
        }
    });
}
getUsers();

function drawUsers(arr) {
    table.innerHTML = arr.map(function(obj){
        return `<tr><td data-label="Firstname">${obj.firstName}</td><td data-label="Lastname">${obj.lastName}</td><td data-label="ID">${obj.id}</td><td data-label="Action"><i class="fas fa-edit edit" data-id="${obj.id}"></i><i class="fas fa-trash-alt delete-user" data-id="${obj.id}" data-toggle="modal" data-target="#modalDelete" id="trash"></i></td></tr>`;
    }).join('');
}
function drawPages(pag) {
    for (let i = 0; i < pag; i++) {
        paginationBlock.innerHTML += `<button class="pag-btn" data-page="${page++}">${i+1}</button>`;
    }
}

//edit user
table.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
        let edit = e.target.dataset.id;
        localStorage.setItem('id', edit);
        window.location.assign('update_user.html');
    }
});

// pagination
paginationBlock.addEventListener('click', function(e) {
    if (e.target.classList.contains('pag-btn')) {
        let page = e.target.dataset.page;
        ajax.send({
            method: 'GET',
            url: `https://report.inventorsoft.co/app/users?pageSize=${pageSize}&page=${page}&sortBy=id`,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            success: function(res) {
                const response = JSON.parse(res);
                let arrUsers = response.content;
                drawUsers(arrUsers);
            }
        });
    }
});

// search user
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let inputSearch = searchForm.elements.search.value;
    ajax.send({
        method: 'GET',
        url: `https://report.inventorsoft.co/app/users?query=${inputSearch}`,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function(res) {
            paginationBlock.innerHTML = '';
            const response = JSON.parse(res);
            let arrUsers = response.content;
            drawUsers(arrUsers);
            let pag = response.totalPages;
            drawPages(pag);
            allUsers.classList.add('show');
        },
        error: function(err) {
            console.log(err);
        }
    });
});

// all users
allUsers.addEventListener('click', function() {
    window.location.assign('users.html');
});

// logout
document.querySelector('#logout').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.assign('login.html');
});

// add user
addButton.addEventListener('click', function() {
    window.location.assign('add_user.html');
});

// delete user
$('#modalDelete').on('shown.bs.modal', function (event) {
    // получить кнопку, которая его открыло
    let btn = $(event.relatedTarget);
    $('#confirmDelete').on('click', function() {
        let idUser = btn.data('id');
        let parent = btn.closest('tr');
        $("#modalDelete").modal('hide');
        parent.remove();

        $.ajax({
            type: "DELETE",
            url: `https://report.inventorsoft.co/app/users/${idUser}`,
            contentType: "application/json",
            headers: {"Authorization" : localStorage.getItem('token')},
            success: function (res) {
                console.log(res);
            },
            error: function (err) {
                $('#errorModal').modal('show',
                    $('#numberError').text(err.status),
                );
            }
        });
    })
});