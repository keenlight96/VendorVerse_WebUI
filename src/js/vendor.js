function getAllVendorProducts(pageNumber) {
    $.ajax({
        type: "GET",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/product/vendor?page="+pageNumber,
        success : function (data) {
            displayAllVendorProducts(data)
        },
        error : function (error) {
            console.log(error);
        }
    })
}

function displayAllVendorProducts(page) {
    console.log(page)
    let totalCommission = 0;
    let totalSold = 0;
    let str = "";
    for (const product of page.content) {
        totalCommission += parseInt(product.commission);
        totalCommission += parseInt(product.sold);
        let image;
        if (product.image == null)
            image = "";
        else
            image = product.image.image;
        str +=`
            <tr>
                <td>${product.id}</td>
                <td><img src="${image}" alt=""></td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$ ${product.price}</td>
                <td>${product.sold}</td>
                <td>$ ${product.commission}</td>
            </tr>
        `
    }
    str += `
        <tr>
            <td colspan="5"><strong>Total</strong></td>
            <td><strong>${totalSold}</strong></td>
            <td><strong>$ ${totalCommission}</strong></td>
        </tr>
    `


    $("#showProducts").html(str);
}

function createProduct() {
    let name = $("#vendor-product-name").val();
    let quantity = $("#vendor-product-quantity").val();
    let price = $("#vendor-product-price").val();
    let description = $("#vendor-product-description").val();

    let product = {name,quantity,price,description};
    $.ajax({
        type: "POST",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/product/vendor",
        data : JSON.stringify(product),
        success : function (data) {
            createImageForProduct(data)
        },
        error : function (error) {
            console.log(error);
        }
    })
}

function createImageForProduct(product) {
    let imageSrc = $("#vendor-product-image").val();
    let image = {
        "image" : imageSrc,
        "product" : {
            "id" : product.id
        }
    }
    $.ajax({
        type: "POST",
        headers : {
            "Authorization" : localStorage.getItem("token"),
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : "http://localhost:8080/image",
        data: JSON.stringify(image),
        success : function (data) {
            location.href = "vendor-dashboard-products.html"
        },
        error : function (error) {
            console.log(error);
        }
    })
}