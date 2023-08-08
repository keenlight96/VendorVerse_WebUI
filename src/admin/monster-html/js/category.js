function getAllCategory() {
    console.log(1)
    $.ajax({
        type: "GET",
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json'
        },
        url: `http://localhost:8080/category`,
        success: function (data) {
            console.log(data)
            showCategory(data)
        }
    })
}

function showCategory(arrCategory) {
    console.log(arrCategory)
    let str = ``
    for (const arr of arrCategory) {
        str += `
           <tr>
                    <td>${arr.parent}</td>
                    <td>${arr.child}</td>
                    <td>
                    <button type="button" class="btn btn-primary" onclick="showEditCategory(${arr.id})" data-bs-toggle="modal" data-bs-target="#myModalEdit">
            Edit
        </button>
        </td>
                    <td> <button type="button" class="btn btn-danger" onclick="removeVendor(${arr.id})">
            Delete
        </button></td>
                </tr>
            `
        document.getElementById("show-category").innerHTML = str;
    }
}

function createCategory() {
    let parentC = $("#parentC").val()
    let childC = $("#childC").val()

    let obj = {
        parent: parentC,
        child: childC
    }

    $.ajax({
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/category",
        data: JSON.stringify(obj),
        success: function () {
            getAllCategory()
        }
    })
}

function showEditCategory(id) {
    $.ajax({
        headers: {
            "Authorization": localStorage.getItem("token"),

        },
        type: "GET",
        url: `http://localhost:8080/category/${id}`,
        success: function (category) {
            $("#idE").val(category.id)
            $("#parentE").val(category.parent)
            $("#childE").val(category.child)
        }
    })
}

function editCategory() {
    let id = $("#idE").val()
    let parentE = $("#parentE").val()
    let childE = $("#childE").val()

    let obj = {
        id: id,
        parent: parentE,
        child: childE
    }

    $.ajax({
        type: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: `http://localhost:8080/category/edit`,
        data: JSON.stringify(obj),
        success: function () {
            getAllCategory()
        }
    })
}

function removeVendor(id) {
    let category = {
        id: id,
    }

    if (confirm("You want to delete?")) {
        $.ajax({
            type: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            url: `http://localhost:8080/category/delete`,
            data: JSON.stringify(category),
            success: function () {
                getAllCategory()
            }
        })
    }
}