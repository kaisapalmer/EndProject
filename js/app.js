/* The code connects JavaScript to the HTML element that has the ID "button"
so JavaScript can interact with it */
const searchField = document.getElementById("title");
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("results");

/* Creates an event that fetches book data from the Open Library API when the button is clicked
based on the user's input */
searchButton.addEventListener('click', async () => {
  let url ="https://openlibrary.org/search.json?q=" + searchField.value;
  const response = await fetch(url);
  const json = await response.json();
  const books = json.docs;
  searchResult.innerHTML = "";

  /* Creates a loop that display all matching book titles from the user's input */
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let paragraph = document.createElement("p");
    paragraph.innerText = book.title;
    searchResult.append(paragraph);
  }
})
