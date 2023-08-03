getBillDetailByBill()

function showBill(billDetailDtos) {
    let str = ` <div class="ps-block--shopping-total">
                    <div class="ps-block__header">
                         <p>Items <span> ${billDetailDtos.length}</span></p>
                    </div>
                    <div class="ps-block__header">
                            <span class="ps-block__shop">Shop <strong>${billDetailDtos[0].bill.vendor.username}</strong></span>
                    </div>
                    <div class="ps-block__content">
                         <ul class="ps-block__product">`

    for (const bdt of billDetailDtos) {
        str += `<li>
                    <span class="ps-block__estimate">
                         <img style="width: 150px" src="${bdt.image.image}" >
                         <a style="display: inline-block" href="#"> ${bdt.product.name}</a>
                          <p style="text-align: right">X ${bdt.quantity}</p>
                    </span>
                 </li>
        `
    }
    str += ` </ul>
             <h3>Total <span>${'$' + billDetailDtos[0].bill.total}</span></h3>
        </div>
    </div>
    <button onclick='payTheBill(${JSON.stringify(billDetailDtos[0].bill)})' class="ps-btn ps-btn--fullwidth" >Pay The Bill</button>`

    document.getElementById("showBill").innerHTML = str
}

function getBillDetailByBill() {
    let bill = JSON.parse(localStorage.getItem("bill"));
    let token = localStorage.getItem("token");
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':  token
        },
        url: "http://localhost:8080/billDetail/getByBill",
        data: JSON.stringify(bill),
        success: function (data) {
            console.log(data)
            showBill(data)
        },
        error: function (err) {

        }
    })
}

function payTheBill(bill) {
    console.log(bill)
    if (confirm("Would you like to pay the bill with the amount: $" + bill.total)) {
        let token = localStorage.getItem("token");
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            url: "http://localhost:8080/bill/payTheBill?idBill=" + bill.id,

            success: function (data) {
                alert("PAYMENT SUCCESS!")
                localStorage.setItem("bill","")
                window.location.href = "shopping-cart.html"
            },
            error: function (err) {
                alert(`PAYMENT FAILED!
The product quantity is not enough to pay!`)

            }
        })
    }
}