
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
            showSender(data)
            getChatContent()
        },
        error : function (error) {
            console.log(error);
        }
    })
}

function showSender(sender) {
    $("#senderId").val(sender.id);
}

function getChatContent() {
    let senderId = $("#senderId").val();
    let receiverId = $("#receiverId").val();
    let message = {
        "sender" : {senderId},
        "receiver" : {receiverId}
    };
    console.log(message)
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
            console.log(data);
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
                        <div class="text-muted small text-nowrap mt-2">2:33 am</div>
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
                        <div class="text-muted small text-nowrap mt-1">12:34</div>
                    </div>
                    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div class="font-weight-bold mb-1">${message.sender.username}</div>
                        ${message.message}
                    </div>
                </div>
            `
        }
        $("#chat-content").html(str);
    }
}



















