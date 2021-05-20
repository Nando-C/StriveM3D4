let bookCollection = []
let cartList = []

const addToCart = (e) => {
    const card = e.currentTarget.closest('.card')
    card.classList.toggle('selected')
    const imgUrl = e.currentTarget.closest('.card').children[0].src
    const addBook = bookCollection.find(book => book.img === imgUrl)
    // console.log(addBook)
    cartList.push(addBook)
    renderBooks(cartList, 'cart')
    console.log(cartList)
}

const removeFromCart = (e) => {
    const card = e.currentTarget.closest('.col-md-4')
    card.remove()
    // card.classList.add('selected')
    const imgUrl = e.currentTarget.closest('.card').children[0].src
    const indexCartList = cartList.findIndex(book => book.img === imgUrl)
    cartList.splice(indexCartList, 1)
    // const returnedBook = bookCollection.find(book => book.img === imgUrl)
    // returnedBook.classList.toggle('selected')
    // console.log(returnedBook)
    // console.log(cartList)
}

const emptyCart = () => {
    const cartSection = document.getElementById('cart')
    cartSection.innerHTML = ''
    cartList = []
    console.log(cartList)

}
const removeCard = (e) => {
    const card = e.currentTarget.closest('.col-md-4')
    card.remove()
}

function renderBooks(books, location = 'library') {
    const parent = document.getElementById(location)
    if(location === 'library'){
        // console.log(parent.parentElement)
        parent.innerHTML = books.map(book => ` <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
                            <div class="card mb-4 shadow-sm h-100">
                          <img src="${book.img}" alt="" class="img-fluid h-100">
                        <div class="card-body">
                            <p class="card-text text-truncate mb-1">${book.title}</p>
                            <p class="card-text text-truncate mb-2">${book.category}</p>
                          <div class="row d-flex justify-content-between px-2 pb-4">
                            <div class="btn-group">
                              <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                                data-toggle="modal" data-target="#exampleModal"
                                onclick="addToCart(event)">
                              <i class="fas fa-cart-arrow-down pr-2"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                                onclick="removeCard(event)">
                                Ignore
                              </button>
                              </div>
                              <small class="text-muted btn-sm"><strong>£ ${book.price}</strong></small>
                          </div>
                        </div>
                      </div>
                        </div>`).join('')
    } else {
        parent.innerHTML = books.map(book => ` <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
                            <div class="card mb-4 shadow-sm h-100">
                          <img src="${book.img}" alt="" class="img-fluid h-100">
                        <div class="card-body">
                            <p class="card-text text-truncate mb-1">${book.title}</p>
                            <p class="card-text text-truncate mb-2">${book.category}</p>
                          <div class="row d-flex justify-content-between px-2 pb-4">
                            <div class="btn-group">
                              <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                                onclick="removeFromCart(event)">
                                Remove
                              </button>
                              </div>
                              <small class="text-muted btn-sm"><strong>£ ${book.price}</strong></small>
                          </div>
                        </div>
                      </div>
                        </div>`).join('')
    }
}

window.onload = () => {
    fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .then(books => {
        bookCollection = books
        console.log(bookCollection)
        renderBooks(bookCollection)
    })
    .catch((err) => console.error(err.message))
}

function search() {
    const searchBar = document.querySelector('#searchBar>input')
    const bookQuery = searchBar.value
    const searchResults = bookCollection.filter(book => book.title.toLowerCase().includes(bookQuery.toLowerCase()))
    // console.log(searchResults)
    renderBooks(searchResults)
}