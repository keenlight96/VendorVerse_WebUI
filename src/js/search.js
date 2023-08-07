function search(page) {
    let document = $("#search-document").val()
    getAllProductByName(page, document)
}

function getAllProductByName(page, document) {
    $.ajax({
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: "http://localhost:8080/product/searchByProductName?page=" + page + "&&name=" + document,
        success: function (data) {
            console.log(data)
            window.location.href = "index-3.html";
            localStorage.setItem("productDTO", JSON.stringify(data))
            localStorage.setItem("documentText", document)
        },
        error: function (error) {
            console.log(error);
        }
    })
}
