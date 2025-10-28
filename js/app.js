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

async function searchBooks() {
  let url = "https://openlibrary.org/search.json?q=" + searchField.value;
  const response = await fetch(url);
  const json = await response.json();
  const books = json.docs;
  searchResult.innerHTML = "";

  /* Creates a loop that display all matching book titles from the user's input */
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    const bookCoverUrl = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://cdn.vectorstock.com/i/1000v/33/47/no-photo-available-icon-vector-40343347.jpg";

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

    const bookCard = document.createElement("div");
    bookCard.innerHTML = cardHtml;

    bookCard.firstElementChild.addEventListener("click", () => loadBookModal(book, bookCoverUrl, author));

    searchResult.append(bookCard.firstElementChild);
  }
}

async function loadBookModal(book, imageUrl, author) {
  const detailsUrl = `https://openlibrary.org/books/${book.cover_edition_key}.json`;
  const response = await fetch(detailsUrl);
  const detailsJson = await response.json();

  let modal = document.getElementById("bookModal");

  modal.querySelector("#bookCover").src = imageUrl
  modal.querySelector("#bookTitle").innerHTML = book.title;
  modal.querySelector("#bookAuthor").innerHTML = author;
  modal.querySelector("#bookDescription").innerHTML = detailsJson.description ?? "Beskrivning saknas";

  modal.classList.add("show");

  modal.querySelector(".close").addEventListener("click", () => modal.classList.remove("show"));
}
