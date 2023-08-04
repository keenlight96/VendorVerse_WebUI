function getAllImage() {
    $.ajax({
        type: "GET",
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json'
        },
        url: `http://localhost:8080/image`,
        success: function (data) {
            showProduct(data)
            console.log(data)

        }
    })
}

function showProduct(arrImage) {
    let str = ``
    for (const arr of arrImage) {
        console.log(arr)
        str += `
         <div class="ps-product">
                            <div class="ps-product__thumbnail"><a href="product-default.html"><img src="${arr.image}" alt="" /></a>
                                <div class="ps-product__badge hot">hot</div>
                                <ul class="ps-product__actions">
                                    <li><a href="#" data-toggle="tooltip" data-placement="top" title="Add To Cart"><i class="icon-bag2"></i></a></li>
                                    <li><a href="#" data-placement="top" title="Quick View" data-toggle="modal" data-target="#product-quickview"><i class="icon-eye"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="top" title="Add to Whishlist"><i class="icon-heart"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="top" title="Compare"><i class="icon-chart-bars"></i></a></li>
                                </ul>
                            </div>
                            <div class="ps-product__container"><a class="ps-product__vendor" href="#">Global Office</a>
                                <div class="ps-product__content"><a class="ps-product__title" href="product-default.html">${arr.product.name}</a>
                                    <div class="ps-product__rating">
                                        <select class="ps-rating" data-read-only="true">
                                            <option value="1">1</option>
                                            <option value="1">2</option>
                                            <option value="1">3</option>
                                            <option value="1">4</option>
                                            <option value="2">5</option>
                                        </select><span>01</span>
                                    </div>
                                    <p class="ps-product__price">${'$' + arr.product.price}</p>
                                </div>
                                <div class="ps-product__content hover"><a class="ps-product__title" href="product-default.html">${arr.product.name}</a>
                                    <p class="ps-product__price">${'$' + arr.product.price}</p>
                                </div>
                            </div>
                        </div>
        `
        document.getElementById("show-product").innerHTML = str;
    }
}