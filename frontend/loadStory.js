// loadStory.js
import storiesData from "./data/stories.js";

window.addEventListener("DOMContentLoaded", () => {
  // 1. Get "title" from the URL query string, e.g. ?title=the-vanishing-key
  const params = new URLSearchParams(window.location.search);
  const storyId = params.get("title"); // e.g., "the-vanishing-key"

  // 2. Find the story object by searching all categories
  let foundStory = null;
  for (const category in storiesData) {
    // Search within each category array
    const match = storiesData[category].find((s) => s.id === storyId);
    if (match) {
      foundStory = match;
      break;
    }
  }

  // 3. Grab the container where we’ll inject HTML
  const container = document.getElementById("story-container");

  // 4. If found, render title, author, and fullStory; else show an error
  if (foundStory) {
    container.innerHTML = `
      <article class="story-card">
        <h1 class="story-title">${foundStory.title}</h1>
        <p class="story-author">✍️ ${foundStory.author}</p>
        <div class="story-content">
          ${foundStory.fullStory}
        </div>
        <button id="saveToReadsBtn" class="save-btn">Save to My Reads</button>
      </article>
    `;

    // Add event listener to save button AFTER it's in the DOM
    const saveBtn = document.getElementById("saveToReadsBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        let reads = JSON.parse(localStorage.getItem("myReads")) || [];

        if (!reads.some(s => s.id === foundStory.id)) {
          reads.push(foundStory);
          localStorage.setItem("myReads", JSON.stringify(reads));
          alert("✅ Story saved to My Reads!");
        } else {
          alert("ℹ️ You've already saved this story.");
        }
      });
    }

  } else {
    container.innerHTML = `
      <div class="error-card">
        <h2>Story Not Found</h2>
        <p>We couldn’t locate a story with the ID: <strong>${storyId}</strong></p>
        <a href="dashboard.html" class="back-home-btn">← Back to Dashboard</a>
      </div>
    `;
  }
});
