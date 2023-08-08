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

    let str = `
        <img src="${account.avatar}" alt=""/>
        <figure>
            <figcaption>${account.username}</figcaption>
        </figure>
    `;
    $("#userInfo").html(str);

    let str2 = `
        <ul>
            <li class="active"><a href="#"><i class="icon-user"></i> Account Information</a></li>
            <li><a href="white_chat.html"><i class="icon-mailbox-full"></i> Messages</a></li>
    `;

    if (account.role.id == 2) {
        str2 += `<li><a href="vendor-dashboard-products.html"><i class="icon-papers"></i> My Shop</a></li>`;
    } else {
        str2 += `<li><a href="customer-invoice.html"><i class="icon-papers"></i> Invoices</a></li>`;
    }
    str2 += `
            <li><a href="#"><i class="icon-map-marker"></i> Address</a></li>
            <li><a href="#"><i class="icon-store"></i> Recent Viewed Product</a></li>
            <li><a href="#"><i class="icon-heart"></i> Wishlist</a></li>
            <li><a href="#" onclick="logout()"><i class="icon-power-switch" ></i>Logout</a></li>
        </ul>
    `;

    $("#vendorOrCustomer").html(str2);
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
