function register() {
    let username = $('#username').val();
    let password = $('#password').val();
    let role = $('#role').val();
    let newAccount = {
        username: username,
        password: password,
        role: {
            id: role
        }
    }
    let str = `<p>Account already exists</p>`
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/register",
        data: JSON.stringify(newAccount),
        success: function () {
            alert("Register successful")
        },
        error: function () {
            document.getElementById("message").innerHTML = str
        }

    })

}

function login() {
    let username = $("#nameLog").val();
    let password = $("#passLog").val();

    let account = {
        username: username,
        password: password
    };
    let str = `<p>Account isn't exist</p>`
    console.log(account)
    $.ajax({
        type: "Post",
        contentType: "application/json",
        url: "http://localhost:8080/login",
        data: JSON.stringify(account),
        success: function (data) {
            console.log(data)
            localStorage.setItem("token", "Bearer " + data.token);
            localStorage.setItem("user", JSON.stringify(data));
            if (data.role.name === "ROLE_VENDOR") {
                location.href = "vendor-dashboard-free.html"
            } else if (data.role.name === "ROLE_CUSTOMER") {
                location.href = "home-marketplace.html"
            }
        },
        error: function (err) {
            document.getElementById("message1").innerHTML = str;
        }
    })

}