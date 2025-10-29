/* The code connects JavaScript to the HTML element that has the ID "button"
so JavaScript can interact with it */
const searchField = document.getElementById("title");
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("results");

/* Creates an event that fetches book data from the Open Library API when the button is clicked
based on the user's input */
searchButton.addEventListener('click', () => searchBooks());
searchField.addEventListener('keyup', (e) => {
  if (e.key === "Enter") {
    searchBooks();
  }
});

/* Searches OpenLibrary based on user input and clears previous results before displaying new ones */
async function searchBooks() {
  let url = "https://openlibrary.org/search.json?q=" + searchField.value;
  const response = await fetch(url);
  const json = await response.json();
  const books = json.docs;
  searchResult.innerHTML = "";

  /* Creates a loop that display all matching book titles from the user's input */
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    /* Creates bookdata that will be used in the card. If book.cover_i exists, use OpenLibrary's book cover.
    If not, use standard image */
    const bookCoverUrl = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://cdn.vectorstock.com/i/1000v/33/47/no-photo-available-icon-vector-40343347.jpg";

    /* Fetches the first author of the book. If there is no author, replace it with "Okänd författare". */
    const author = book.author_name ? book.author_name[0] : "Okänd författare";
    const cardHtml = `
      <div class="book-card">
        <img src="${bookCoverUrl}" alt="book cover">
        <div class="body">
          <div class="title">${book.title}</div>
          <div class="meta">${book.author_name ? book.author_name[0] : "Okänd författare"}</div>
        </div>
      </div>
    `;
/* Creates a new div-element and put the HTML-string in it */
    const bookCard = document.createElement("div");
    bookCard.innerHTML = cardHtml;

    /* When the book card is clicked it sends the book, the book link and the author. */
    bookCard.firstElementChild.addEventListener("click", () => loadBookModal(book, bookCoverUrl, author));

    searchResult.append(bookCard.firstElementChild);
  }
}

/*Function that runs when clicking on a book. It fetches more information from the API, as description of the book. */
async function loadBookModal(book, imageUrl, author) {
  const detailsUrl = `https://openlibrary.org/books/${book.cover_edition_key}.json`;
  const response = await fetch(detailsUrl);
  const detailsJson = await response.json();

  /* Gets the modal from the HTML */
  let modal = document.getElementById("bookModal");

  /* Fills the modal with information. */
  modal.querySelector("#bookCover").src = imageUrl
  modal.querySelector("#bookTitle").innerHTML = book.title;
  modal.querySelector("#bookAuthor").innerHTML = author;
  /* If there is no description, use the fallback-text "Beskrivning saknas". */
  modal.querySelector("#bookDescription").innerHTML = detailsJson.description ?? "Beskrivning saknas";

  /* Makes the modal visible. */
  modal.classList.add("show");

  /* When clicking "X" the modal will become hidden again. */
  modal.querySelector(".close").addEventListener("click", () => modal.classList.remove("show"));
}
