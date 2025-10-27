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

    let bookCard = document.createElement("div");
    bookCard.className = "book-card";

    let image = document.createElement("img");
    // om bild finns, plocka då cover_id och konstruera en URL för den,
    // om bild saknas, så visar vi en "No Photo"-bild som jag hittade på vectorstock.com
    image.src = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://cdn.vectorstock.com/i/1000v/33/47/no-photo-available-icon-vector-40343347.jpg";
    bookCard.append(image);

    let bookCardBody = document.createElement("div");
    bookCardBody.className = "body";
    bookCard.append(bookCardBody);

    let bookCardTitle = document.createElement("div");
    bookCardTitle.className = "title";
    bookCardTitle.innerHTML = book.title;
    bookCardBody.append(bookCardTitle);


    let bookCardMeta = document.createElement("div");
    bookCardMeta.className = "meta";
    bookCardMeta.innerHTML = book.author_name ? book.author_name[0] : "Okänd författare"; // Några böcker har fler författare, ta första för tillfället ..
    bookCardBody.append(bookCardMeta);

    let bookCardButton = document.createElement("button");
    bookCardButton.innerHTML = "Köp";
    //bookCardBody.append(bookCardButton);

    searchResult.append(bookCard);
  }
})
