function getAllVendor() {
    $.ajax({
        type: "GET",
        headers: {'Accept': 'application/json'},
        url: `http://localhost:8080/account`,
        success: function (data) {
            showAccountVendor(data)
        }
    })
}

function showAccountVendor(arrVendor) {
    let str = ``
    for (const arr of arrVendor) {
        if (arr.role.id == 2) {
            str += `
            <tr>
                                        <td>${arr.id}</td>
                                        <td>${arr.username}</td>
                                        <td>${arr.password}</td>
                                        <td>${arr.avatar}</td>
                                        <td>${arr.birthday}</td>
                                        <td>${arr.phoneNumber}</td>
                                        <td>${arr.role.name}</td>
                                        <td>${arr.status.name}</td>
                                        <td>
                                            <button class="btn  btn-success" data-bs-toggle="modal"
                                                    data-bs-target="#myModalProduct">Product
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn  btn-success" data-bs-toggle="modal"
                                                    data-bs-target="#myModalBill">Bill
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-info" onclick="showEditVendor(${arr.id})" data-bs-toggle="modal"
                                                    data-bs-target="#myModalEdit">Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-danger" onclick="removeVendor(${arr.id})">Delete</button>
                                        </td>
                                    </tr>
            `
        }
    }
    document.getElementById("account-vendor").innerHTML = str;
}

function createVendor() {
    let username = $("#usernameC").val()
    let password = $("#passwordC").val()
    let avatar = $("#avatarC").val()
    let birthday = $("#birthdayC").val()
    let phoneNumber = $("#phoneNumberC").val()
    let idRole = $("#idRoleCreate").val()
    let idStatus = $("#idStatusCreate").val()

    let obj = {
        username: username,
        password: password,
        avatar: avatar,
        birthday: birthday,
        phoneNumber: phoneNumber,
        role: {
            id: idRole
        },
        status: {
            id: idStatus
        }
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/account",
        data: JSON.stringify(obj),
        success: function () {
            getAllVendor()
        }
    })
}

function showEditVendor(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/account/${id}`,
        success: function (account) {
            $("#idE").val(account.id)
            $("#usernameE").val(account.username)
            $("#passwordE").val(account.password)
            $("#avatarE").val(account.avatar)
            $("#birthdayE").val(account.birthday)
            $("#phoneNumberE").val(account.phoneNumber)
            $("#idRole").val(account.role.id)
            getStatusEdit()
        }
    })
}

function editVendor() {
    let id = $("#idE").val()
    let username = $("#usernameE").val()
    let password = $("#passwordE").val()
    let avatar = $("#avatarE").val()
    let birthday = $("#birthdayE").val()
    let phoneNumber = $("#phoneNumberE").val()
    let idRole = $("#idRole").val()
    let idStatus = $("#idStatusEdit").val()

    let obj = {
        id: id,
        username: username,
        password: password,
        avatar: avatar,
        birthday: birthday,
        phoneNumber: phoneNumber,
        role: {
            id: idRole
        },
        status: {
            id: idStatus
        }
    }

    $.ajax({
        type: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: `http://localhost:8080/account/${id}`,
        data: JSON.stringify(obj),
        success: function () {
            getAllVendor()
        }
    })
}

function removeVendor(id) {
    if (confirm("You want to delete?")) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/account/${id}`,
            success: function () {
                getAllVendor()
            }
        })
    }
}

// function getRoleUpdate() {
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/role",
//         success: function (data) {
//             console.log(data)
//             let str = ``
//             for (let i = 0; i < data.length; i++) {
//                 str += `<option value="${data[i].id}">${data[i].name}</option>`
//             }
//             $("#idRoleCreate").html(str)
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }

function getStatusCreate() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/accountStatus",
        success: function (data) {
            console.log(data)
            let str = ``
            for (let i = 0; i < data.length; i++) {
                str += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $("#idStatusCreate").html(str)
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getStatusEdit() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/accountStatus",
        success: function (data) {
            let str = ``
            for (let i = 0; i < data.length; i++) {
                str += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $("#idStatusEdit").html(str)
        },
        error: function (err) {
            console.log(err)
        }
    })
}
