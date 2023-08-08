getAllCartDetail(1)


function showCart(billDto) {
    let str = '';
    for (let i = 0; i < billDto.bills.length; i++) {

        str += `<tr>
                    <td></td>
                </tr>
                <tr>
                    <th colspan="5" >Shop : <strong>${billDto.bills[i].vendor.username}</strong></th>
                   
                </tr>`
        for (let j = 0; j < billDto.billDetailDTOs.length; j++) {

            if (billDto.bills[i].id === billDto.billDetailDTOs[j].bill.id) {
                str += `
                 <tr>
                            <td data-label="Product">
                                <div class="ps-product--cart">
                                    <div class="ps-product__thumbnail"><a href="product-default.html"><img
                                            src="${billDto.billDetailDTOs[j].image.image}" alt=""/></a></div>
                                    <div class="ps-product__content"><a href="product-default.html">${billDto.billDetailDTOs[j].product.name}</a>
                                   
                                    </div>
                                </div>
                            </td>
                            <td style="text-align: center" class="price" data-label="Price" id="price_product${billDto.billDetailDTOs[j].id}">${'$' + billDto.billDetailDTOs[j].product.price}</td>
                            <td style="text-align: center" data-label="Quantity">
                                <div class="form-group--number">
                                    <button class="up" onclick="increaseQuantity(${billDto.billDetailDTOs[j].id})">+</button>
                                    <button class="down" onclick="reduceQuantity(${billDto.billDetailDTOs[j].id})">-</button>
                                    <input class="form-control" id="quantity_product_by_cart${billDto.billDetailDTOs[j].id}" type="text" placeholder="1" value="${billDto.billDetailDTOs[j].quantity}">
                                </div>
                            </td>
                            <td style="text-align: center" data-label="Total" id="total_price_by_product${billDto.billDetailDTOs[j].id}">${'$ ' + billDto.billDetailDTOs[j].product.price * billDto.billDetailDTOs[j].quantity}</td>
                            <td data-label="Actions"><button onclick='deleteProductByCart(${billDto.billDetailDTOs[j].id})'><i class="icon-cross"></i></button></td>
                     
                        </tr>
                `
            }

        }
        str += `
            <tr>
                <th colspan="2"></th>
                <th style="text-align: right"><h4>Total payment amount :</h4></th>
                <th style="text-align: center"><h4>$ ${billDto.bills[i].total}</h4></th>
            </tr>
            <tr>
                <th colspan="3"></th>
                <th><a href="shopping-cart-pay.html" class="p-2 ps-btn" onclick='showBill(${JSON.stringify(billDto.bills[i])})'>Pay The Bill</a></th>
           
            </tr>
            `

    }
    let obj = document.getElementById("showCart")
    if (obj != null) {
        obj.innerHTML = str;
    }
}


// Lấy ra các giỏ hàng theo trạng thái của Bill
function getAllCartDetail(idStatus) {
    let token = localStorage.getItem("token");
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: "http://localhost:8080/billDetail/byStatus?idStatus=" + idStatus,
        success: function (data) {
            showCart(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// Thêm sản phẩm vào giỏ hàng
function addBillDetail(id) {
    let token = localStorage.getItem("token");
    // let idProduct = $("#idProduct").val();
    let quantity = $("#quantity").val();

    if (quantity == undefined) {
        quantity = 1;
    }

    let billDetail = {
        product: {
            id: id
        },
        quantity: quantity
    };

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: "http://localhost:8080/billDetail/addBillDetail",
        data: JSON.stringify(billDetail),
        success: function (data) {

        },
        error: function (err) {
            console.log(err);
        }
    })
}

// Xóa sản phẩm trong giỏ hàng
function deleteProductByCart(idBillDetail) {
    let token = localStorage.getItem("token");

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: "http://localhost:8080/billDetail/deleteProductByCart?idBillDetail=" + idBillDetail,
        success: function (data) {
            getAllCartDetail(1);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

$(document).ready(function () {
    $("#quantity_product_by_cart").change(function () {

    });
});


//Sửa số lượng sản phẩm trong giỏ hàng
function increaseQuantity(id) {
    let quantity = parseInt($("#quantity_product_by_cart" + id).val());
    $("#quantity_product_by_cart" + id).val(quantity + 1);
    updateBillDetail(quantity + 1, id);

}

function reduceQuantity(id) {
    let quantity = parseInt($("#quantity_product_by_cart" + id).val());
    if (quantity > 0) {
        $("#quantity_product_by_cart" + id).val(quantity - 1);
        updateBillDetail(quantity - 1, id);
    }
}

function updateBillDetail(quantity, id) {
    let priceStr = $("#price_product" + id).html();
    let price = parseInt(priceStr.slice(1));
    let total_price = price * quantity;
    $("#total_price_by_product" + id).html('$' + total_price);

// Cập nhật số lượng trong DB
    let token = localStorage.getItem("token");
    let billDetailDto = {
        id: id,
        quantity: quantity
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: "http://localhost:8080/billDetail/updateQuantityBillDetail",
        data: JSON.stringify(billDetailDto),
        success: function (data) {
            getAllCartDetail(1);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showBill(bill) {
    localStorage.setItem("bill", JSON.stringify(bill));
    // window.location.href = "shopping-cart-pay.html";
}

