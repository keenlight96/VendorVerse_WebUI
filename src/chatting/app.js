let stompClient = null;
connect();

function connect() {
    let socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("ok")
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/hi', function (message) {
            console.log("anh ok")
            console.log(message)
            showMessage(JSON.parse(message.body).greeting);

        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

// function sendMessage() {
//     console.log("send ok")
//     stompClient.send("/gkz/hello", {}, JSON.stringify({
//         "sender" : $("#senderId").val(),
//         'message': $("#textMessage").val()
//     }));
// }

function sendMessage() {
    console.log("send ok")
    let sender = JSON.parse(localStorage.getItem("user"));
    let message = {
        "sender" : {
            id : sender.id,
            username : sender.username,
            avatar : sender.avatar
        },
        "receiver" : {
            id : $("#receiverId").val()
        },
        'message': $("#textMessage").val()
    }
    console.log(message);
    stompClient.send("/gkz/hello", {}, JSON.stringify(message));
}


function showMessage(message) {
    // document.querySelector("#textAreaMessage").innerHTML += `<p>${message}</p>`;
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.id)
    console.log(message.sender.id)
    let str = "";
    if (user.id == message.sender.id) {
        str = `
            <div class="chat-message-right pb-4">
                <div>
                    <img data-lazysrc="${message.sender.avatar}" loading="lazy"
                         class="rounded-circle mr-1" alt="" width="40" height="40">
                    <div class="text-muted small text-nowrap mt-2">2:33 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div class="font-weight-bold mb-1">You</div>
                    ${message.message}
                </div>
            </div>
        `;
    } else {
        str = `
            <div class="chat-message-left pb-4">
                <div>
                    <img data-lazysrc="${message.sender.avatar}" loading="lazy"
                         class="rounded-circle mr-1" alt="" width="40" height="40">
                    <div class="text-muted small text-nowrap mt-1">12:34</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div class="font-weight-bold mb-1">${message.sender.username}</div>
                    ${message.message}
                </div>
            </div>
        `
    }

    document.querySelector("#chat-content").innerHTML += str;
    // $("#chat-content").html(str);
    $("#textMessage").val("")

}
$(function () {
    connect();
    $("#send" ).click(function(){ sendMessage() });
});