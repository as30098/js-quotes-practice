

// STEP 1 TARGET STABLE ELEMENTS. STEP 2 fetch request GET. 3 HELPER METHOD FOR DOM APPENDING
// 4. INSIDE HELPER, FIRST CREATE ALL HTML ELEMENTS, THEN GIVE THEM NECESSARY ATTRIBUTES/SELECTORS, THEN APPEND.
// 5. When appending, do it in reverse order, inner to outer html. Slap onto DOM
let quotesList = document.querySelector('#quote-list')
let quotesForm = document.querySelector('#new-quote-form')

// let deleteButton = quoteLi.querySelector("#btn-danger")
// let likeButton = quoteLi.querySelector("#btn-success")

function turnQuoteToLi(quotePOJO) {
    let quoteLi = document.createElement('li')
    quoteLi.className= 'quote-card'
    quoteLi.dataset.id = quotePOJO.id

    let blockQuote = document.createElement('blockquote')
    blockQuote.className = 'blockquote'

    let quoteP = document.createElement('p')
    quoteP.className = 'mb-0'
    quoteP.innerText = quotePOJO.quote

    let quoteFooter = document.createElement('footer')
    quoteFooter.className = 'blockquote-footer'
    quoteFooter.innerText = quotePOJO.author

    let quoteBreak = document.createElement('br')

    let buttonLike = document.createElement('button')
    buttonLike.className = 'btn-success'
    buttonLike.innerText = 'Likes'

    let likeSpan = document.createElement('span')
    likeSpan.textContent = '0'





    let buttonDelete = document.createElement('button')
    buttonDelete.className = 'btn-danger'
    buttonDelete.innerText = 'Delete'


    buttonLike.append(likeSpan)
    blockQuote.append(quoteP, quoteFooter, quoteBreak, buttonLike, buttonDelete)
    quoteLi.append(blockQuote)
    quotesList.append(quoteLi)


    let deleteButton = quoteLi.querySelector("button.btn-danger")
    let likeButton = quoteLi.querySelector("button.btn-success")


    deleteButton.addEventListener("click", (evt) => {

        fetch(`http://localhost:3000/quotes/${quotePOJO.id}`,
          {
            method: "DELETE",
          })
        .then( response => response.json())
        .then((emptyObject) => {

            quoteLi.remove()
        })

    })

//     likeButton.addEventListener("click", (evt) => {

//         let newLikeCount = parsenInt(quotePOJO.likeSpan) + 1

//       fetch(`http://localhost:3000/quotes/${quotePOJO.id}`,
//         {
//           method: "PATCH",
//           headers: {"content-type": "application/json"}
//         },
//         body: JSON.stringify({
//           likes: newLikeCount
//         })
//       .then( response => response.json())
//       .then((emptyObject) => {

//           quoteLi.remove()
//       })

//   })


}



    // fetch requests
    function getAllDogs() {
        return fetch('http://localhost:3000/quotes?_embed=likes')
        .then(res => res.json())
        .then(quoteArr => {
            quoteArr.forEach((quoteObj) => {
                turnQuoteToLi(quoteObj)
            })
        })
    }

    //fetch POST request
    //define stable elements, add submit listener, then fetch, then add click listener)
    // remember prevent default, and select UNstable elements of the form as needed
    // aka the 2 let definitions a few lines below this comment
    // SLAP ONTO DOM after creating a QuoteObject
    quotesForm.addEventListener('submit', (evt) => {
        evt.preventDefault()

    let quoteThatUserInput= evt.target["new-quote"].value
    //console.log(quoteThatUserInput)
    let authorThatUserInput = evt.target.author.value
    //console.log(authorThatUserInput)

    let data = {
      quote: quoteThatUserInput,
      author: authorThatUserInput
    }

  fetch("http://localhost:3000/quotes?_embed=likes", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        turnQuoteToLi(data)
    })
})

// Delete
//need backticks because string interpolate ID
// method delete only removes from our backend database aka localhost in this case
// we need to remove from HTML rendering as well









getAllDogs()



