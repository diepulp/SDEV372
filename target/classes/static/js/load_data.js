/**
 * Front end interactions
 */
window.onload = () => {

    let submitPost = document.querySelector("#submit")
    const url = "http://localhost:8080/api/v1/book"
    const paramsGet = paramsInit("get")

    //send GET to the api
    fetchData(url, paramsGet).then(data => {
        renderBooks(data);
    })

    /**
     * Functions handles the button click and appends the last fetch
     * object values to the DOM elements
     */
    //use anonymous function as a wrapper to pass parameters to the event listener
    submitPost.addEventListener("click", (event) => {
        handlePost(event).then(() => {
            fetchData(url, paramsGet).then(data => {
                let last = data.pop()
                createElements(last)
            })
        })

    })


    // The Object.entries() method returns an array
    // of a given object's own enumerable string-keyed property
    // fetchData(url, paramsGet).then(arr => {
    //     arr.forEach(ell => {
    //         console.log(Object.entries(ell))
    //         for (const [key, value] of Object.entries(ell)){
    //             console.log(`Key ${key} Value ${value}`)
    //         }
    //     })
    //     console.log(arr.pop())
    // })
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

async function fetchData(url, params) {
    try {
        const response = await fetch(url, params)
        const json = await response.json()
        return (json)
    } catch (err) {
        console.log(err)
    }

}

function createElements(book) {
    let {...rest} = book;

    //table
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

    delButton.innerText = "x"
    buttonLot.appendChild(delButton)
    author.innerText = rest.author
    gunningFog.innerText = rest.gunningFog
    title.innerText = rest.title
    language.innerText = rest.language
    metaData.innerText = rest.metaData.bookRank
    bookId.innerText = rest.bookId

    tableRow.appendChild(title)
    tableRow.appendChild(author)
    tableRow.appendChild(language)
    tableRow.appendChild(gunningFog)
    tableRow.appendChild(bookId)
    tableRow.appendChild(metaData)
    tableRow.appendChild(buttonLot)

    tableBody.appendChild(tableRow)



    for (const key in book ){
        console.log(`${key}: ${book[key]}`)
    }


    for (const [key, value] of Object.entries(book)) {
        // let bookKey = document.createElement("p")
        // let bookValue = document.createElement("p")

    }

    //
    // bookTitle.innerText = rest.title
    // author.innerText = rest.author
}

function renderBooks(data) {
    data.forEach((book) => {
        createElements(book)
    })
    return data
}

/**
 * Function collects input from the form and passes it
 * onto the postData fetch
 * @param event
 */
async function handlePost(event) {
    event.preventDefault();
    //TODO: clean up this function

    const url = "http://localhost:8080/api/v1/book"
    let bookTitle = document.querySelector("#book-title").value
    let bookAuthor = document.querySelector("#book-author").value
    let bookLanguage = document.querySelector("#book-lang").value
    let metaData = document.querySelector("#meta").value
    let gunningFog = document.querySelector("#fog-index").value

    let fields = [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog]
    await postData(url, fields)
}

async function postData(url, inputs) {
    let [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog] = inputs

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
        return await response.json()
    } catch (error) {
        return error
    }
}

