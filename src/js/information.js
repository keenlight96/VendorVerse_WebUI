let idEdit;

function showInfo() {
    let user = JSON.parse(localStorage.getItem("user"));
    let id = user.id;
    $.ajax({
        type: "GET",
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/account/${id}`,
        success: function (account) {
            showInfo2(account);
        },
        error: function () {
            alert(1)
        }
    })
}

function showInfo2(account) {
    console.log(4)
    console.log(account)
    console.log($('#usernameEdit').val())
    $('#usernameEdit').val(account.username);
    $('#avatarEdit').val(account.avatar);
    $('#birthdayEdit').val(account.birthday);
    $('#phoneNumberEdit').val(account.phoneNumber);
    $('#roleEdit').val(account.role.name);
}


function updateInfo() {
    let user = JSON.parse(localStorage.getItem("user"));
    let id = user.id;
    let username = $('#usernameEdit').val()
    let password = $('#passwordEdit').val();
    let avatar = $('#avatarEdit').val();
    let birthday = $('#birthdayEdit').val();
    let phoneNumber = $('#phoneNumberEdit').val();
    let role = $('#roleEdit').val()
    let account = {
        id: id,
        password: password,
        avatar: avatar,
        birthday: birthday,
        phoneNumber: phoneNumber,
    }

    $.ajax({
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/updateInfo/editAccount`,
        data: JSON.stringify(account),
        success: function (data) {
            if (data.role.name === "ROLE_VENDOR") {
                location.href = "vendor-dashboard-free.html"
            } else if (data.role.name === "ROLE_CUSTOMER") {
                location.href = "home-marketplace.html"
            }
        },
        error: function () {
            alert(2)
        }
    })
}
