
const API_ENDPOINT = "http://localhost:3000/books";


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
