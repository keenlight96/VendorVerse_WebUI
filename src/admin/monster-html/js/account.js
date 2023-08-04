function getAllAccountVendor() {
    $.ajax({
        type: "GET",
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json'
        },
        url: `http://localhost:8080/account`,
        success: function (data) {
            showAccountVendor(data)
        }
    })
}

function showAccountVendor(arrAccount) {
    let str1 = ``
    for (const arr of arrAccount) {
        if (arr.role.id == 2) {
            str1 += `
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
                                            <button class="btn  btn-success" onclick="">Product
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn  btn-success" onclick="">Bill
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
            document.getElementById("account-vendor").innerHTML = str1;
        }
    }
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
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/account",
        data: JSON.stringify(obj),
        success: function () {
            getAllAccountVendor()
        }
    })
}

function showEditVendor(id) {
    $.ajax({
        headers: {
            "Authorization": localStorage.getItem("token"),

        },
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
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: `http://localhost:8080/account/edit`,
        data: JSON.stringify(obj),
        success: function () {
            getAllAccountVendor()
        }
    })
}

function removeVendor(id) {
    let account = {
        id: id,
    }

    if (confirm("You want to delete?")) {
        $.ajax({
            type: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            url: `http://localhost:8080/account/delete`,
            data: JSON.stringify(account),
            success: function () {
                getAllAccountVendor()
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
        headers: {
            "Authorization": localStorage.getItem("token"),

        },
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
        headers: {
            "Authorization": localStorage.getItem("token"),
        },
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

function getAllCustomer() {
    $.ajax({
        type: "GET",
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json'
        },
        url: `http://localhost:8080/account`,
        success: function (data) {
            showAccountCustomer(data)
        }
    })
}

function showAccountCustomer(arrCustomer) {
    let str2 = ``
    for (const arr of arrCustomer) {
        if (arr.role.id === 3) {
            str2 += `
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
                                            <button class="btn  btn-success" onclick="">Bill
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-info" onclick="showEditCustomer(${arr.id})" data-bs-toggle="modal"
                                                    data-bs-target="#myModalEdit">Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-danger" onclick="removeCustomer(${arr.id})">Delete</button>
                                        </td>
                                    </tr>
            `
        }
    }
    document.getElementById("account-customer").innerHTML = str2;
}


function createCustomer() {
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
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/account",
        data: JSON.stringify(obj),
        success: function () {
            getAllCustomer()
        }
    })
}

function showEditCustomer(id) {
    $.ajax({
        headers: {
            "Authorization": localStorage.getItem("token"),
        },
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

function editCustomer() {
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
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: `http://localhost:8080/account`,
        data: JSON.stringify(obj),
        success: function () {
            getAllCustomer()
        }
    })
}

function removeCustomer(id) {
    console.log(id)
    let account = {
        id: id
    }
    if (confirm("You want to delete?")) {
        $.ajax({
            type: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            url: `http://localhost:8080/account/delete`,
            data: JSON.stringify(account),
            success: function () {
                getAllCustomer()
            }
        })
    }
}
