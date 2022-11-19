/**
 * Front end interactions
 */
import "./google_api.js"

window.onload = () => {

    let submitPost = document.querySelector("#submit")
    let googleSubmit = document.querySelector("#google-submit")

    googleSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        let googleInput = document.querySelector("#google-input").value

        fetchGoogleBooks(googleInput).then((data) => {
            renderBookThumbnail(data)
        })
    })


    submitPost.addEventListener("click", (e) => {
        console.log(e)
    })


    // let header = document.querySelector("header")

    //add attributes to variables
    // header.potato = "potato"
    // console.log(header.potato)

    // let delUrl = "http://localhost:8080/api/v1/book/delete-book"
    // let jsonObj = {
    //     "bookId": "7ac5e9ff-d5fb-4e62-9913-"
    // }
    // let paramsDel = paramsInit("DELETE", "application/json", JSON.stringify(jsonObj))
    //
    // fetch(delUrl, paramsDel).then((res) => {
    //     console.log(res)
    // })

    /**
     * Sends GET request to the REST API
     */
    fetchData().then(data => {
        renderBooks(data);
    })


    /**
     * Functions handles the button click and appends the last fetch
     * object values to the DOM elements
     */
    //use anonymous function as a wrapper to pass parameters to the event listener
    submitPost.addEventListener("click", (event) => {
        handlePost(event).then((res) => {
            console.log("Response after posting data" + res)
            createElements(res)
        })
    })
}

/**
 * Google API GET request with a search parameter collected from the input field
 * @returns {Promise<any>}
 */
async function fetchGoogleBooks(searchParam) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchParam}&key=AIzaSyC1QBZdOW63nyBDbPAoeJZ1YQccA5Y1M8g`

    let response = await fetch(url);
    return await response.json();
}

function renderBookThumbnail(data){
    let section = document.querySelector("bookDisplay")
    let { items } = data
    for (const [key, value] of Object.entries(items)){
        console.log(`${key} ${value}`)
        let {volumeInfo : {
            imageLinks: {
                thumbnail
            }
        }} = value
        console.log(thumbnail)
        // let img = document.createElement("img")
        // img.setAttribute("src", thumbnail)
        // section.appendChild(img)
    }
}

/**
 * Parameters for fetch calls
 * @param method
 * @param appType
 * @param body
 * @returns {{method: string, "application-type": string, body: null}}
 */
function paramsInit(method = "", appType = "", body = null) {
    return {
        "method": method,
        "application-type": appType,
        "body": body
    }
}

/**
 *
 * Fetches data from the server with GET request
 * @returns {Promise<any>}
 */
async function fetchData() {
    const url = "http://localhost:8080/api/v1/book"

    try {
        const response = await fetch(url)
        const json = await response.json()
        console.log("Json from fetch data " + json)
        return json
    } catch (err) {
        console.log("fetch data error" + err)
    }

}

function createElements(book) {
    let {...rest} = book
    console.log(arguments)

    let {
        metaData: {
            bookRank
        }
    } = book
    console.log(bookRank)

    //table tags
    let tableBody = document.querySelector("#books")
    let tableRow = document.createElement("tr")
    let author = document.createElement("td")
    let title = document.createElement("td")
    let gunningFog = document.createElement("td")
    let language = document.createElement("td")
    let bookId = document.createElement("td")
    let metaData = document.createElement("td")
    let buttonLot = document.createElement("td")
    let delButton = document.createElement("button")
    delButton.setAttribute("value", rest.bookId)
    tableRow.setAttribute("id", rest.bookId)
    console.log(tableRow)
    let attributeId = delButton.getAttribute("value")

    //attach an event listener to the dynamically added button
    //to invoke the fetch delete call and re-render the layout
    delButton.addEventListener("click", () => {
        console.log(`Attribute id ${attributeId}`)
        handleDel(attributeId).then(

        )
    })


    //supply values for the elements
    buttonLot.appendChild(delButton)
    author.innerText = rest.author
    gunningFog.innerText = rest.gunningFog
    title.innerText = rest.title
    language.innerText = rest.language
    metaData.innerText = bookRank
    bookId.innerText = rest.bookId
    delButton.innerText = "x"
    delButton.classList.add("del")


    tableRow.appendChild(title)
    tableRow.appendChild(author)
    tableRow.appendChild(language)
    tableRow.appendChild(gunningFog)
    tableRow.appendChild(bookId)
    tableRow.appendChild(metaData)
    tableRow.appendChild(buttonLot)

    tableBody.appendChild(tableRow)

}

function renderBooks(data) {
    try {
        data.forEach((book) => {
            createElements(book)
        })
    } catch (e) {
        console.log(e)
    }

    return data
}

/**
 * Function collects input from the form and passes it
 * onto the postData fetch call
 * @param event
 */
async function handlePost(event) {
    event.preventDefault();

    let bookTitle = document.querySelector("#book-title").value
    let bookAuthor = document.querySelector("#book-author").value
    let bookLanguage = document.querySelector("#book-lang").value
    let metaData = document.querySelector("#meta").value
    let gunningFog = document.querySelector("#fog-index").value

    let fields = [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog]
    return await postData(fields)
}

function handlePut(event) {
    let bookTitle = document.querySelector("#edit-title").value
    let bookAuthor = document.querySelector("#edit-author").value
    let bookLanguage = document.querySelector("#edit-lang").value
    let metaData = document.querySelector("#editMeta").value
    let gunningFog = document.querySelector("#edit-fog").value

    let fields = [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog]
    return putData(fields)
}

async function putData(inputs) {
    let [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog] = inputs

    const url = "http://localhost:8080/api/v1/book"

    let jsonObj = {
        "title": bookTitle,
        "author": bookAuthor,
        "language": bookLanguage,
        "metaData": {
            "bookRank": parseInt(metaData)
        },
        "gunningFog": parseFloat(gunningFog)
    }

    let param = {
        method: "put",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(jsonObj)
    }
    try {
        const response = await fetch(url, param)
        console.log("put response" + response)
        const data = await response.json()
        console.log("data from post response" + data)
        // const newBook = await response.json()
        return data
    } catch (error) {
        return error
    }
}

/**
 *
 */
async function handleDel(id) {
    let rowToDelete = document.getElementById(`${id}`)
    console.log("Row to delete", rowToDelete)
    console.log(`Del fired ${id}`)
    rowToDelete.remove()
    await delData(id).then(() => {
        console.log("Del request sent")
    })

}

/**
 * Configures the fetch call with an id and params
 * @param bookId
 * @returns {Promise<any>}
 */
async function delData(bookId) {

    let delUrl = `http://localhost:8080/api/v1/book/delete-book/${bookId}`

    let param = {
        method: "delete",
        headers: {
            "Content-type": "application/json"
        },
        // body: JSON.stringify(jsonObj)
    }

    try {
        await fetch(delUrl, param)
    } catch (error) {
        return "Book could not be found" + error
    }
}

/**
 * Configures and sends the post request to the API
 * @param inputs
 * @returns {Promise<any>}
 */
async function postData(inputs) {
    let [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog] = inputs

    const url = "http://localhost:8080/api/v1/book"

    let jsonObj = {
        "title": bookTitle,
        "author": bookAuthor,
        "language": bookLanguage,
        "metaData": {
            "bookRank": parseInt(metaData)
        },
        "gunningFog": parseFloat(gunningFog)
    }

    let param = {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(jsonObj)
    }
    try {
        const response = await fetch(url, param)
        console.log(" post response" + response)
        const data = await response.json()
        console.log("data from post response" + data)
        // const newBook = await response.json()
        return data
    } catch (error) {
        return error
    }
}

