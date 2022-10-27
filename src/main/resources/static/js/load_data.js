/**
 * Front end interactions
 */
window.onload = () => {
    let section = document.getElementById("load-books")
    let button = document.querySelector("#submit")
    button.addEventListener("click", handlePost)
    const url = "http://localhost:8080/api/v1/book"
    const paramsGet = paramsInit("get" )

    // postData(url).then(res => console.log(res))

    fetchData(url, paramsGet).then(data => {
        data.forEach((book)=>{
            let {...rest} = book;
            console.log(`Title ${rest.title}, Author ${rest.author}`)
            // console.log(book)
        })
    })
}

/**
 * Parameters for fetch calls
 * @param method
 * @param appType
 * @param body
 * @returns {{method: string, "application-type": string, body: null}}
 */
function paramsInit(method = "", appType= "", body = null){
 const param = {
     "method": method,
     "application-type": appType,
     "body": body
 }
 return param
}

async function fetchData(url, params) {
    const response = await fetch(url, params)
    const json = await response.json()
    return (json)
}

function handlePost(event){
    event.preventDefault();
    const url = "http://localhost:8080/api/v1/book"
    let bookTitle = document.querySelector("#book-title").value
    let bookAuthor = document.querySelector("#book-author").value
    let bookLanguage = document.querySelector("#book-lang").value
    let metaData = document.querySelector("#meta").value
    let gunningFog = document.querySelector("#fog-index").value

    let fields = [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog]
    postData(url, fields).then(r => console.log(r))

}

async function postData(url, inputs){
    let [bookTitle, bookAuthor, bookLanguage, metaData, gunningFog] = inputs
    let jsonObj = {
        "title": bookTitle,
        "author": bookAuthor,
        "language": bookLanguage,
        "metaData": parseInt(metaData),
        "gunningFog": parseFloat(gunningFog)

    }

    let param = {
        method: "post",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(jsonObj)
    }
    try {
        const response = await fetch(url, param)
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}

