/**
 * Front end interactions
 */

window.onload = async () => {
    let submitPost = document.querySelector("#submit")
    let googleSubmit = document.querySelector("#google-submit")

    let init = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    }

    //the API key is collected from the REST API
    const apiKey = await getKey().then(async (data) => {
        let keyArr = await data;
        let [key] = keyArr
        return key
    })

    // let bookData = await getVolumes(key, 2, init)
    // let {items} = bookData
    // let volumes = []
    //
    // for (const [key, value] of Object.entries(items)) {
    //     let {
    //         volumeInfo: {
    //             title
    //         }
    //     } = value
    //     volumes.push(title)
    // }
    // console.log("Books from Volumes array" + volumes)


    //on click the call to external API is made
    googleSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        let googleInput = document.querySelector("#google-input").value

        fetchGoogleBooks(googleInput, apiKey, init).then((data) => {
            renderBookThumbnail(data)
        })
    })

    fetchPublicBookShelves(apiKey, init).then((data) => {
        renderBookShelves(data,apiKey);
    })

    /**
     * Retrieves a list of public book shelves for a user authorized with given API key
     * @param key
     * @param init
     * @returns {Promise<any>}
     */
    async function fetchPublicBookShelves(apiKey, init) {
        let url = `https://www.googleapis.com/books/v1/users/109560370875353725212/bookshelves/?key=${apiKey}`

        let res = await fetch(url, init);
        return await res.json()
    }


    /**
     * Sends GET request to the REST API and retrives a list of books stored in the DB
     */
    fetchData().then(data => {
        renderBooks(data);
    })

    /**
     * Functions handle the button click and appends the last fetch
     * object values to the DOM elements
     */
    //use anonymous function as a wrapper to pass parameters to the event listener
    submitPost.addEventListener("click", (event) => {
        handlePost(event).then((res) => {
            console.log("Response after posting data" + res)
            createElements(res)
        })
    })

}//end of window.onload

async function renderVolumes(apiKey, id){
    let bookData = await getVolumes(apiKey,id)
    console.log(bookData)
    let {items} = bookData
    console.log(`Items from render volumes ${items}`)
    let volumes = []

    for (const [key, value] of Object.entries(items)) {
        let {
            volumeInfo: {
                title
            }
        } = value
        volumes.push(title)
    }
    console.log("Books from Volumes array" + volumes)
    return volumes
}
async function renderBookShelves(data, apiKey) {
    let {items} = data;
    console.log(items)
    let shelvesSection = document.querySelector("#book__shelves")

    //list of public shelves
    let shelvesList = document.createElement("ul")
    let volumeList = document.createElement("ul")
    shelvesList.setAttribute("id", "list_shelves")


    for (const [key, value] of Object.entries(items)) {
        let {title, id} = value
        let shelfItem = document.createElement("li")
        shelfItem.setAttribute("class", `shelf_item_${title}`)

        let shelfVolume = document.createElement("li")

        let volumes = await renderVolumes(apiKey, id)
        for (const volume of volumes){
            console.log(volume)
            shelfVolume.innerText = volume //shelf volume li

        }
        volumeList.appendChild(shelfVolume)
        shelfItem.appendChild(volumeList)
        shelvesList.appendChild(volumeList)
        shelfItem.innerText = title
        shelvesList.appendChild(shelfItem)

        shelvesSection.appendChild(shelvesList)
    }
}

/**
 * Makes a call to the REst API to collect the API key stored in the env variable
 * @returns {Promise<any>}
 */
async function getKey() {
    const url = "http://localhost:8080/api/v1/book/key"
    try {
        const res = await fetch(url, {
            method: "get",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            }
        })
        return await res.json()
    } catch (e) {
        console.log(e)
    }
}

/**
 * Google API GET request with a search parameter collected from the input field
 * @returns {Promise<any>}
 */
async function fetchGoogleBooks(searchParam, apiKey, init) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchParam}&orderBy=newest&key=${apiKey}`
    let response = await fetch(url, init);
    return await response.json();
}

async function getVolumes(apiKey, param = 0, init) {
    let url = `https://www.googleapis.com/books/v1/users/109560370875353725212/bookshelves/${param}/volumes?key=${apiKey}`
    let res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }})
    return await res.json()
}

async function fetchAuthor(author, apiKey, init) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${apiKey}`
    const res = await fetch(url)
    return await res.json();
}

function renderBookThumbnail(data) {
    let section = document.querySelector("#bookDisplay")
    let {items} = data
    for (const [key, value] of Object.entries(items)) {
        let {
            volumeInfo: {
                imageLinks: {
                    thumbnail
                },
                previewLink
            }
        } = value
        let img = document.createElement("img")
        let anchor = document.createElement("a")
        let addBookButton = document.createElement("div")
        let bookContainer = document.createElement("button")

        addBookButton.innerText = "+"

        img.setAttribute("src", thumbnail)
        addBookButton.setAttribute("class", "addBook")

        anchor.setAttribute("class", "anchor")
        anchor.setAttribute("href", previewLink)
        anchor.setAttribute("target", "_blank")
        anchor.appendChild(img)

        bookContainer.appendChild(anchor)
        bookContainer.appendChild(addBookButton)
        bookContainer.setAttribute("class", "book-container")
        section.appendChild(bookContainer)
    }
}

/**
 *
 * Fetches data from the server with GET request
 * @returns {Promise<any>}
 */
async function fetchData() {
    const url = "http://localhost:8080/api/v1/book"
    let init = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    }
    try {
        const response = await fetch(url, init)
        return await response.json()
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
        handleDel(attributeId).then()
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

function renderBooks(data = []) {
    console.log(data)
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

function handlePut() {
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
    if (confirm(`Delete the row ? ${id}`)) {
        let rowToDelete = document.getElementById(`${id}`)
        console.log("Row to delete", rowToDelete)
        console.log(`Del fired ${id}`)
        rowToDelete.remove()
        // location.reload()

        await delData(id).then(() => {
            console.log("Del request sent")
            fetchData().then(data => {
                renderBooks(data);
            })
        })
    }
}

/**
 * Configures the fetch call with an id and params
 * @param bookId
 * @returns {Promise<any>}
 */
async function delData(bookId) {

    let delUrl = `http://localhost:8080/api/v1/book/delete-book/${bookId}`

    let param = {
        method: "delete"
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
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(jsonObj)
    }
    try {
        const response = await fetch(url, param)
        console.log(" post response " + response)
        const [data] = await Promise.all([response.json()])
        console.log(" data from post response " + data)
        // const newBook = await response.json()
        return data
    } catch (error) {
        return error
    }
    // let header = document.querySelector("header")

    // add attributes to variables
    // header.potato = "potato"
    // console.log(header.potato)

    // let delUrl = "http://localhost:8080/api/v1/book/delete-book"
    // let jsonObj = {
    //     "bookId": "7ac5e9ff-d5fb-4e62-9913-"
    // }
    // let paramsDel = paramsInit("DELETE", "application/json", JSON.stringify(jsonObj))
    //
    // fetch(delUrl, {method: "delete"}).then((res) => {
    //     console.log(res)
    // })

}