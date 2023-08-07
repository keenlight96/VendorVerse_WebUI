getLocal();

function getLocal() {
    let productDTOPage = JSON.parse(localStorage.getItem("productDTO"));
    let documentText = localStorage.getItem("documentText");
    console.log(productDTOPage)
    showAllProduct(productDTOPage, documentText);
}

function showAllProduct(productDTOPage, documentText) {
    let str = "";

    for (const pd of productDTOPage.content) {
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
                       <div class="ps-product__content"><a class="ps-product__title" href="product-default.html">${pd.name}</a>
                            <p class="ps-product__price">${'Price: $' + pd.price}</p>
                       </div>
                       <div class="ps-product__content hover"><a class="ps-product__title" href="product-default.html">${pd.name}</a>
                            <p class="ps-product__price">${'Price: $' + pd.price}</p>
                       </div>
                   </div>
             </div>
        </div>
        `
    }
    let str1 = `<ul class="pagination">`;
    if (productDTOPage.number > 0) {
        str1 += `<li><a  onclick="getAllProductByName('${productDTOPage.number - 1}','${documentText}')"><i class="icon-chevron-left"></i>Back Page</a></li>`

    }
    alert(productDTOPage.number - 1)
    alert(documentText)
    for (let i = 0; i < productDTOPage.totalPages; i++) {
        if (productDTOPage.number == i) {
            str1 += `<li class="active"><a href="#" >${productDTOPage.number + 1}</a></li>`
        } else {
            str1 += `<li><a  onclick="getAllProductByName('${i}','${documentText}')">${i + 1}</a></li>`
        }
    }
    if (productDTOPage.number < productDTOPage.totalPages - 1) {
        str1 += `<li><a onclick="getAllProductByName('${productDTOPage.number + 1}','${documentText}')">Next Page<i class="icon-chevron-right"></i></a></li>`
    }
    str1 += `</ul>`;

    document.getElementById("name-product").innerHTML = documentText;
    // document.getElementById("product-found").innerHTML = productDTOPage.totalElements;
    document.getElementById("showProduct").innerHTML = str;
    document.getElementById("pageable").innerHTML = str1;

}