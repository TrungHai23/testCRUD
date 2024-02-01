var dienthoaiAPI = 'http://localhost:3000/products'

// let ttDienThoai = []

const getDienThoai = (callback) => {
    fetch(dienthoaiAPI, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => {
            // console.log(response)
            return response.json();
        })
        // .then(data => data.products)
        .then(callback)
}

const deleteDienThoai = (id) => {
    fetch(dienthoaiAPI + '/' + id, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(() => getDienThoai(renderDienThoai))
}

const editDienThoai = (id, data, callback) => {
    fetch(dienthoaiAPI + '/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then(callback);
}

const createDienThoai = (data, callback) => {
    fetch(dienthoaiAPI, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then((response) => {
            return response.json();
        })
        .then(callback)
    }

const handlecreateDienThoai = () => {
    const createBtn = document.querySelector("#create")
    createBtn.onclick = (e) => {
        e.preventDefault()
        const valTitle = document.querySelector('#title').value
        const valDes = document.querySelector('#description').value
        const valPrice = document.querySelector('#price').value
        const valDis = document.querySelector('#discountPercentage').value
        console.log(valTitle, valDes, valPrice, valDis)
        const formInput = {
            title: valTitle,
            description: valDes,
            price: valPrice,
            discountPercentage: valDis
        }

        createDienThoai(formInput,getDienThoai(renderDienThoai))
        resetInput()
    }
}

const handleEditDienThoai = (id) => {
    const row = document.querySelector(`#list-${id}`)
    const title = row.querySelector(`#td1-${id}`).innerText;
    const description = row.querySelector(`#td2-${id}`).innerText;
    const price = row.querySelector(`#td3-${id}`).innerText;
    const discountPercentage = row.querySelector(`#td4-${id}`).innerText;
    console.log(title, description, price, discountPercentage)

    // Hiển thị thông tin xuống form
    document.querySelector('#title').value = title;
    document.querySelector('#description').value = description;
    document.querySelector('#price').value = price;
    document.querySelector('#discountPercentage').value = discountPercentage;

    const updateDt = document.querySelector(`#update-new-${id}`)
    updateDt.onclick = () => {
        const title_new = document.querySelector('#title').value
        const description_new = document.querySelector('#description').value
        const price_new = document.querySelector('#price').value
        const discountPercentage_new = document.querySelector('#discountPercentage').value

        const formDt = {
            title: title_new,
            description: description_new,
            price: price_new,
            discountPercentage: discountPercentage_new
        }
        console.log(formDt)

        editDienThoai(id, formDt, () => getDienThoai(renderDienThoai))
        resetInput()
    }
}
// handleEditDienThoai()

const renderDienThoai = (dienthoai) => {
    let listPhone = document.querySelector('#list-phone')
    let htmls = dienthoai.map((val) => {
        return `
      <tr id="list-${val.id}">
          <td id="td1-${val.id}">${val.title}</td>
          <td id="td2-${val.id}">${val.description}</td>
          <td id="td3-${val.id}">${val.price}</td>
          <td id="td4-${val.id}">${val.discountPercentage}</td>
          <td>
              <button id="delete" onclick = deleteDienThoai(${val.id}) >Xóa</button>
              <button id="update" onclick = handleEditDienThoai(${val.id}) >Sửa</button>
              <button id="update-new-${val.id}">Update</button>
          </td>
      </tr>`
    })

    listPhone.innerHTML = htmls.join("")

}

const resetInput = () => {
    document.querySelector('#title').value = ""
    document.querySelector('#description').value = ""
    document.querySelector('#price').value = ""
    document.querySelector('#discountPercentage').value = ""
}

const start = () => {
    getDienThoai(renderDienThoai)
    handlecreateDienThoai()
    editDienThoai()
}
start()