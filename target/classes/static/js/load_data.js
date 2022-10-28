/**
 * Front end interactions
 */
window.onload = () => {

    let button = document.querySelector("#submit")
    const url = "http://localhost:8080/api/v1/book"
    const paramsGet = paramsInit("get")

    /**
     * Functions handles the button click and appends the last fetch
     * object values to the DOM elements
     */
    //use anonymous function as a wrapper to pass parameters to the event listener
    button.addEventListener("click", (event) =>{
        handlePost(event)
        fetchData(url, paramsGet).then(data => {
            let last = data.pop()
            let {...rest} = last;
            let bookList = document.getElementById("book-display")
            let h3 = document.createElement("h3")
            h3.innerText = rest.title
            bookList.appendChild(h3)
        })
    })


    //send GET to the api
    fetchData(url, paramsGet).then(data => {
        renderBooks(data);
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

function renderBooks(data) {
    data.forEach((book) => {
        let {...rest} = book;
        let bookList = document.getElementById("book-display")
        let h3 = document.createElement("h3")

        h3.innerText = rest.title
        bookList.appendChild(h3)
    })
    return data
}

/**
 * Function collects input from the form and passes it
 * onto the postData fetch
 * @param event
 */
function handlePost(event) {
    event.preventDefault();
    //TODO: clean up this function
    const url = "http://localhost:8080/api/v1/book"
    let bookTitle = document.querySelector("#book-title").value
    let bookAuthor = document.querySelector("#book-author").value
    let bookLanguage = document.querySelector("#book-lang").value
    let metaData = document.querySelector("#meta").value
    let gunningFog = document.querySelector("#fog-index").value

    let fields = [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog]
    postData(url, fields).then(r => console.log(r))
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

