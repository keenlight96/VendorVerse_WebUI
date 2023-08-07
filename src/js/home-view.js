getAllProduct(0)

function getAllProduct(page) {
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        url: "http://localhost:8080/product/shop/?page=" + page,

        success: function (data) {
            console.log(data)
            showProduct2(data)

        },
        error: function (err) {

        }
    })
}

function showProduct2(productDTOPage) {
    console.log(productDTOPage)
    let str = "";
    for (const p of productDTOPage.content) {
        str += `
<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 " >
        <div class="ps-product--horizontal">
                                <div class="ps-product__thumbnail"><a href="product-default.html"><img src="${p.image.image}" alt="" width="250" height="100" /></a></div>
                                <div class="ps-product__content"><a class="ps-product__title" href="product-default.html">${p.name}</a>
                                    <p class="ps-product__price">${p.price}$</p>
                                </div>
                            </div>
                            </div>
        `
    }
    let str1 = ``
    if (productDTOPage.number > 0) {
        str1 += `<li><a  onclick="getAllProduct(${productDTOPage.number - 1})"><i class="icon-chevron-left"></i>Back Page</a></li>`
    }
    for (let i = 0; i < productDTOPage.totalPages; i++) {
        if (productDTOPage.number == i) {
            str1 += `<li class="active"><a href="#" >${productDTOPage.number + 1}</a></li>`
        } else {
            str1 += `<li><a  onclick="getAllProduct(${i})">${i + 1}</a></li>`
        }
    }
    if (productDTOPage.number < productDTOPage.totalPages - 1) {
        str1 += `<li><a onclick="getAllProduct(${productDTOPage.number + 1})">Next Page<i class="icon-chevron-right"></i></a></li>`
    }


    // document.getElementById("numberProducts").innerHTML = productPage.total;
    document.getElementById("show-product-DTO").innerHTML = str;
    document.getElementById("pageable2").innerHTML = str1;

}

