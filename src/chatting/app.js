let stompClient = null;
connect();

function connect(roomId) {
    let socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        // console.log("ok")
        console.log('Connected: ' + frame);
        stompClient.subscribe(roomId, function (message) {
            // console.log("anh ok")
            // console.log(message)
            showMessage(JSON.parse(message.body).greeting);

        });
    });
}

function forceDisconnect() {
    stompClient.disconnect();
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
    stompClient.send("/gkz/hello", {}, JSON.stringify(message));
}


function showMessage(message) {
    // document.querySelector("#textAreaMessage").innerHTML += `<p>${message}</p>`;
    let user = JSON.parse(localStorage.getItem("user"));
    let str = "";
    if (user.id == message.sender.id) {
        str = `
            <div class="chat-message-right pb-4">
                <div>
                    <img src="${message.sender.avatar}"
                         class="rounded-circle mr-1" alt="" width="40" height="40">
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
                    <img src="${message.sender.avatar}"
                         class="rounded-circle mr-1" alt="" width="40" height="40">
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div class="font-weight-bold mb-1">${message.sender.username}</div>
                    ${message.message}
                </div>
            </div>
        `;
    }

    $("#textMessage").val("");

    document.querySelector("#chat-content").innerHTML += str;
    scrollToBottom();

}

$(function () {
    connect();
    $("#send" ).click(function(){ sendMessage() });
});