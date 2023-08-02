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