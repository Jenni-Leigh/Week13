import {fetchBooks, displayBooks,}


let type Review = {
    id: number
    text: string  
    
}



/*
Resources
http://localhost:3000/books

Home
http://localhost:3000

*/

const API_ENDPOINT = "http://localhost:3000/books";

// Fetch books area

document.getElementById("fetchBooksBtn")!.addEventListener("click", fetchBooks); 



async function fetchBooks() {
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

function displayBooks(books) {
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

//Submit Review area
document.getElementById("reviewForm")!.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById("title")!.value;
    const genre = document.getElementById("genre")!.value;
    const review = document.getElementById("review")!.value;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, genre, review }),
        
      });
            
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      document.getElementById("responseMessage")!.innerText =
        "Review submitted successfully!";

      // Clear the form
      document.getElementById("reviewForm")!.reset();
    } catch (error) {
      document.getElementById("responseMessage")!.innerText =
        "Error submitting review: " + error.message;
    }
  });

//3

document
  .getElementById("reviewForm")!.addEventListener("click", async function (event) {
    console.log("reviewForm submit event:", event);

    event.preventDefault();

    const title = document.getElementById("title")!.value;
    const genre = document.getElementById("genre")!.value;
    const review = document.getElementById("review")!.value;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, genre, review }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      document.getElementById("responseMessage")!.innerText =
        "Review submitted successfully!";
      document.getElementById("reviewForm")!.reset();
      fetchReviews(); // Refresh the list
    } catch (error) {
      document.getElementById("responseMessage")!.innerText =
        "Error submitting review: " + error.message;
    }
  });

async function fetchReviews() {
  try {
    const response = await fetch(API_ENDPOINT); // api call to /books

    //Reponse returns the json data from my books api endpoint
    const reviews = await response.json();
    console.log("API REviews Response:", reviews);

    displayReviews(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

function displayReviews(reviews) {
  const bookListDiv = document.getElementById("bookList");
  bookListDiv!.innerHTML = "";

  reviews.forEach((review) => {
    console.log("for each review:", review);

    const reviewItem = document.createElement("div");
    reviewItem.innerHTML = `
            <h2>${review.title}</h2>
            <p><strong>Genre:</strong> ${review.genre}</p>
            <p><strong>Review:</strong> ${review.review}</p>
            <button type="button" id="delete-button-${review.id}">Delete</button>
            <hr>
        `;
    bookListDiv!.appendChild(reviewItem);

    const deleteReviewButton = document.getElementById(
      `delete-button-${review.id}`
    );

    deleteReviewButton!.addEventListener("click", async (event) => {
      event.preventDefault();

      console.log("Deleting a review...", review.title, "book id:", review.id);

      try {
        const response = await fetch(`${API_ENDPOINT}/${review.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        fetchReviews(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    });
  });
}

async function deleteReview(title, id) {
  //   event.preventDefault();
  console.log("Deleting a review...", title, "book id:", id);

  try {
    const response = await fetch(`${API_ENDPOINT}/${title}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    fetchReviews(); // Refresh the list after deletion
  } catch (error) {
    console.error("Error deleting review:", error);
  }
}

// Fetch reviews on initial load
fetchReviews();
