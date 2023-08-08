getProductDTOByVendor(0)

function getProductDTOByVendor(page) {
    let vendorId = localStorage.getItem("vendorId");
    let token = localStorage.getItem("token");
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: "http://localhost:8080/product/shop/" + vendorId + "?page=" + page,

        success: function (data) {
            console.log(data)
            showProduct(data)
        },
        error: function (err) {

        }
    })
}

function clickOnProduct(id) {
    localStorage.setItem("productId", id);
}

function showProduct(productDTOPage) {
    let str = "";
    for (const pd of productDTOPage.content) {
        console.log(pd)
        str += `
        <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 ">
             <div class="ps-product">
                   <div class="ps-product__thumbnail"><a href="product-default.html"><img src="${pd.image.image}" alt="" /></a>
                       <ul class="ps-product__actions">
                            <li><a href="#" data-toggle="tooltip" data-placement="top"  onclick="addBillDetail(${pd.id})"><i class="icon-bag2"></i></a></li>
                            <li><a href="#" data-placement="top" title="Quick View" data-toggle="modal" data-target="#product-quickview"><i class="icon-eye"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-placement="top" title="Add to Whishlist"><i class="icon-heart"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-placement="top" title="Compare"><i class="icon-chart-bars"></i></a></li>
                       </ul>
                   </div>
                   <div class="ps-product__container"><a class="ps-product__vendor" href="#">${pd.account.username}</a>
                       <div class="ps-product__content"><a class="ps-product__title" href="product-default.html" onclick="clickOnProduct(${pd.id})">${pd.name}</a>
                            <p class="ps-product__price">${'Price: $' + pd.price}</p>
                       </div>
                       <div class="ps-product__content hover"><a class="ps-product__title" href="product-default.html" onclick="clickOnProduct(${pd.id})">${pd.name}</a>
                            <p class="ps-product__price">${'Price: $' + pd.price}</p>
                       </div>
                   </div>
             </div>
        </div>
        `
    }
    let str1 = `<ul class="pagination">`;
    if (productDTOPage.number > 0) {
        str1 += `<li><a  onclick="getProductDTOByVendor(${productDTOPage.content[0].account.id},${productDTOPage.number - 1})"><i class="icon-chevron-left"></i>Back Page</a></li>`
    }
    for (let i = 0; i < productDTOPage.totalPages; i++) {
        if (productDTOPage.number == i) {
            str1 += `<li class="active"><a href="#" >${productDTOPage.number + 1}</a></li>`
        } else {
            str1 += `<li><a  onclick="getProductDTOByVendor(${productDTOPage.content[0].account.id},${i})">${i + 1}</a></li>`
        }
    }
    if (productDTOPage.number < productDTOPage.totalPages - 1) {
        str1 += `<li><a onclick="getProductDTOByVendor(${productDTOPage.content[0].account.id},${productDTOPage.number + 1})">Next Page<i class="icon-chevron-right"></i></a></li>`
    }
    str1 += `</ul>`;

    let str2 = `
        <p>VENDOR: <strong>${productDTOPage.content[0].account.username}</strong></p> 
        <a class="ps-btn" onclick="chatToVendor(${productDTOPage.content[0].account.id})">Send Message</a>
    `;


    document.getElementById("numberProducts").innerHTML = productDTOPage.totalElements;
    document.getElementById("showProduct").innerHTML = str;
    document.getElementById("pageable").innerHTML = str1;

    $("#sellerChat").html(str2);

}

function chatToVendor(id) {
    localStorage.setItem("targetChat", id);
    let senderId = JSON.parse(localStorage.getItem("user")).id;
    let receiverId = id;
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
            if (data[0] == null) {
                hiMessage(senderId, receiverId);
            } else {
                location.href = "white_chat.html";
            }
        },
        error : function (error) {
            console.log(error);
        }
    })
}

function hiMessage(senderId, receiverId) {
    $.ajax({
        type: "POST",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/message/hi/" + senderId + "/" + receiverId,
        success : function () {
            location.href = "white_chat.html";
        },
        error : function (error) {
            console.log(error);
        }
    })
}


