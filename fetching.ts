let
type Review = {
    id: number
    text: string  
    
}

const API_ENDPOINT = "http://localhost:3000/books";


document.getElementById("fetchBooksBtn")!.addEventListener("click", fetchBooks); 



export async function fetchBooks() {
  try {
    const response = await fetch("db.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const books = await response.json();
    console.log(books); // Check the structure of the response
    displayBooks(books);
  } catch (error) {
    document.getElementById("errorMessage")!.innerText =
      "Error fetching books: " + error.message; 
  }
}

document.getElementById("submitBtn")!.addEventListener("click", SubmitEvent)

export async function displayBooks(books) {
  const bookListDiv = document.getElementById("bookList");
  bookListDiv!.innerHTML = ""; // Clear any existing content

  if (Array.isArray(books)) {
    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.innerHTML = `
                <h2>${book.title}</h2>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Review:</strong> ${book.review}</p>
                <hr>
            `;
      bookListDiv!.appendChild(bookItem); // Append to the valid DOM element
    });
  } else {
    bookListDiv!.innerHTML = "<p>No books found or invalid data format.</p>";
  }
}