let bookColletion = []

const removeCard = (e) => {
    const card = e.currentTarget.closest('.col-md-4')
    card.remove()
}

function renderBooks(books, location = 'library') {
    const parent = document.getElementById(location)

    parent.innerHTML = books.map(book => ` <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div class="card mb-4 shadow-sm">
                      <img src="${book.img}" alt="">
                    <div class="card-body">
                      <p class="card-text">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                      </p>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            data-toggle="modal" data-target="#exampleModal"
                            onclick="addToCart(event)"
                          >
                            Add to Cart
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            onclick="removeCard(event)"
                          >
                            Ignore
                          </button>
                        </div>
                        <small class="text-muted"> £ ${book.price}</small>
                      </div>
                    </div>
                  </div>
                    </div>`).join('')
}

window.onload = () => {
    fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .then(books => {
        // console.log(books)
        bookColletion = books

        renderBooks(books)
    })
}