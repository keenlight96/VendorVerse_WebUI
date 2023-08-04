getAllBill(2)
function getAllBill(idStatus) {
    let token = localStorage.getItem("token");
    console.log(token)
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: "http://localhost:8080/billDetail/byStatus?idStatus=" + idStatus,
        success: function (data) {
            console.log(data)
            showBill(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showBill(billDto) {
    let str = ``;
    for (let i = 0; i < billDto.bills.length; i++) {
        str += `<tr>
                    <td><a data-bs-toggle="modal" data-bs-target="#myModal"  onclick='getBillDetailDto(${JSON.stringify(billDto.bills[i])})'>${billDto.bills[i].id}</a></td>
                    <td>${billDto.bills[i].vendor.username}</td>
                    <td>${billDto.bills[i].date}</td>
                    <td>${`$` + billDto.bills[i].total}</td>
                    
                </tr>
        `
    }
    document.getElementById("showBillDto").innerHTML = str;
}

function getBillDetailDto(bill) {

    let token = localStorage.getItem("token");
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        url: "http://localhost:8080/billDetail/getByBill",
        data: JSON.stringify(bill),
        success: function (data) {
            showModal(data)
        },
        error: function (err) {

        }
    })
}

function showModal(billDetailDtos) {
    let str = `
                <div class="modal-header">
                    <h4 class="modal-title">${'Shop :' + billDetailDtos[0].bill.vendor.username}</h4>
                    <span>${'Total payment: $' + billDetailDtos[0].bill.total}</span>
                </div>
                
                <div class="modal-body" >
                    <table class="table ps-table ps-table--vendor">
                        <thead>
                        <tr>
                            <th class="col-4">Image</th>
                            <th class="col-4">Product</th>
                            <th class="col-2">Price</th>
                            <th class="col-2">Quantity</th>
                        </tr>
                        </thead>
                        <tbody >`;
    for (const bdd of billDetailDtos) {
        str += `<tr>
                    <td><img src="${bdd.image.image}" ></td>
                    <td>${bdd.product.name}</td>
                    <td>${'$' + bdd.product.price}</td>
                    <td>${bdd.quantity}</td>
                </tr>
        `
    }

    str+= `  </tbody>
           </table>
        </div>`

    document.getElementById("billDetailModal").innerHTML = str;
}