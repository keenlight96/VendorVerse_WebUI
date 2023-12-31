getProductDetailDTO()

function getProductDetailDTO() {
    let productId = localStorage.getItem("productId");
    $.ajax({
        type: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: "http://localhost:8080/product/productDetail?productId=" + productId,
        success: function (data) {
            console.log(data)
            showProductDetail(data)
            checkReview(data.id)
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function showProductDetail(productDetailDTO) {
    console.log(productDetailDTO)

    let str = ``;
    for (const image of productDetailDTO.images) {
        str += `  <div class="item"><img style="width: 100%" src="${image.image}" alt=""></div>`
    }

    for (let i = 1; i <= productDetailDTO.avgRating; i++) {
        $("#star" + i).val(1)
    }
    let splitStrings = productDetailDTO.description.split('. ');
    let str1 = splitStrings.join('.<br>');

    let str2 = `
            <img style="width: 150px" class="img-circle" src="${productDetailDTO.account.avatar}">
            <h3>${productDetailDTO.account.username}</h3>
            <p>Contact phone number:   ${productDetailDTO.account.phoneNumber}</p>
       `
    let str3 = `<li> ${productDetailDTO.category.parent}</li>
                      <li> ${productDetailDTO.category.child}</li>`

    let str4 = `<div class="ps-product__meta"><strong>Customer Reviews: </strong></div>`
    for (const review of productDetailDTO.reviews) {
        str4 += `<div class="ps-product__desc">
                    <p>Customer: <strong>${review.customer.username}</strong></p>
                    <select class="ps-rating" data-read-only="true">`
        for (let i = 0; i < 5; i++) {
            if (i < review.rating) {
                str4 += `<option value="1"></option>`
            } else {
                str4 += `<option value="2"></option>`
            }
        }
        str4 += ` </select>
                  <p>Content: ${review.content}</p>
               </div>`
    }

    let str5 = `  <select class="ps-rating" data-read-only="true">
                           <option value="1"></option>
    `
    for (let i = 1; i < 5; i++) {
        if (i < productDetailDTO.avgRating -1) {
            str5 += `<option value="1"></option>`
        }else {
            str5 += `<option value="2"></option>`
        }
    }

    str5 += `</select>`
    let show_button = `<a class="ps-btn ps-btn--black" href="#" onclick="addBillDetail('${productDetailDTO.id}')">Add to cart</a>`
    $("#image1").html(str);
    $("#image2").html(str);
    $("#productName").html(productDetailDTO.name);
    $("#viewNumber").html('( ' + productDetailDTO.reviews.length + ' views )');
    $("#vendorName").html(`
        <p>Sold By:<a href="shop-default.html" onclick="clickOnVendor(${productDetailDTO.account.id})"><strong>${productDetailDTO.account.username} </strong></a></p>
    `);


    $("#productPrice").html('$' + productDetailDTO.price);
    $("#product-categori").html(str3);
    $("#remaining-quantity").html('( Remaining quantity : ' + productDetailDTO.quantity + ' )');
    $("#product-description").html(str1);
    $("#tab-3").html(str2);
    $("#review-product").html(str4);
    $("#button-add-cart").html(show_button);
    $("#rating-review").html(productDetailDTO.avgRating);
    $("#number-review").html(productDetailDTO.reviews.length);
    $(".avgReview").html(str5);

    // checkReview(productDetailDTO.id);
}

function clickOnVendor(id) {
    localStorage.setItem("vendorId", id);
}

function checkReview(productId) {
    $.ajax({
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: "http://localhost:8080/product/checkReview?productId=" + productId,
        success: function (data) {

            if (data == false) {
                formReview(productId)
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function formReview(productId) {
    document.getElementById("form-review").innerHTML = `        
                                          
                                                <h4>Submit Your Review</h4>
                                                <div class="form-group form-group__rating">
                                                    <label>Your rating of this product</label>
                                                    <select class="ps-rating" data-read-only="false" id="rating-review">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <input id="product-id" hidden="hidden" value="${productId}">
                                                    <textarea id="content-review" class="form-control" rows="6" placeholder="Write your review here"> </textarea>
                                                </div>
                                                <div class="form-group submit">
                                                    <button class="ps-btn" onclick="saveReview()">Submit Review</button>
                                                </div>
                                            `;
}

function chooseRating(rate) {
    localStorage.setItem("rating", rate);
}

function saveReview() {
    let productId = $("#product-id").val();
    let content = $("#content-review").val();
    let rating = parseInt(localStorage.getItem("rating"));
    localStorage.setItem("rating", "5");
    let review = {
        product: {
            id: productId
        },
        content: content,
        rating: rating
    }
    $.ajax({
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: "http://localhost:8080/review",
        data: JSON.stringify(review),
        success: function (data) {
            window.location.href = "product-default.html";
            getProductDetailDTO(productId)
        },
        error: function (error) {
            console.log(error);
        }
    })

}

function updateQuantity(change) {
    let number = parseInt($("#quantity").val());
    if (change == 'up') {
        $("#quantity").val(number + 1)
    } else if (change == 'down' && number > 0) {
        $("#quantity").val(number - 1)
    }
}