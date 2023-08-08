function scrollToBottom() {
    const chatMessages = document.getElementById('chat-content');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function getSenderAndChatContent() {
    $.ajax({
        type: "POST",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/account/current",
        success : function (data) {
            showSenderAndGetReceivers(data)
        },
        error : function (error) {
            console.log(error);
        }
    })
}

function showSenderAndGetReceivers(sender) {
    $("#senderId").val(sender.id);
    $.ajax({
        type: "POST",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/account/receivers/" + sender.id,
        success : function (data) {
            showReceivers(data)
        },
        error : function (error) {
            console.log(error);
        }
    })
}

function showReceivers(receivers) {
    let targetChat = localStorage.getItem("targetChat");
    if (targetChat == 0 || targetChat == null) {
        setReceiver(receivers[0].id);
    } else {
        setReceiver(targetChat);
        localStorage.setItem("targetChat", "0");
    }
    let str = "";
    for (const receiver of receivers) {
        str += `
            <a onclick="setReceiver(${receiver.id})" class="list-group-item list-group-item-action border-0">
                <div class="d-flex align-items-start">
                    <img src="${receiver.avatar}" class="rounded-circle mr-1"
                         alt="" width="40" height="40">
                    <div class="flex-grow-1 ml-3">
                        ${receiver.username}
                    </div>
                </div>
            </a>
        `;
    }
    $("#receivers").html(str);
}

function setReceiver(id){
    $("#receiverId").val(id);
    let userId = JSON.parse(localStorage.getItem("user")).id;

    let roomId = "/topic/hi/";
    if (userId < id) {
        roomId += userId + "_" + id;
    } else {
        roomId += id + "_" + userId;
    }
    forceDisconnect();
    connect(roomId)
    $.ajax({
        type: "GET",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/account/receiver/" + id,
        success : function (data) {
            showReceiver(data)
        },
        error : function (error) {
            console.log(error);
        }
    })

    getChatContent();
}

function showReceiver(account) {
    let str = `
        <div class="position-relative">
            <img src="${account.avatar}"
                 class="rounded-circle mr-1" alt="" width="40" height="40">
        </div>
        <div class="flex-grow-1 pl-3">
            <strong>${account.username}</strong>
        </div>
    `;
    $("#receiverInfo").html(str);

}

function getChatContent() {
    let senderId = $("#senderId").val();
    let receiverId = $("#receiverId").val();
    let message = {
        "sender" : {
            "id" : senderId
        },
        "receiver" : {
            "id" : receiverId
        }
    };
    $.ajax({
        type: "POST",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/message/allBySenderAndReceiver",
        data : JSON.stringify(message),
        success : function (data) {
            showChatContent(data)
        },
        error : function (error) {
            console.log(error);
        }
    })
}

function showChatContent(messages) {
    let senderId = $("#senderId").val();
    let str = "";
    for (const message of messages) {
        if (message.sender.id == senderId) {
            str += `
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
            str += `
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
            `
        }
        $("#chat-content").html(str);
        scrollToBottom();
    }
}



















