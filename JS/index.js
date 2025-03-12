function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
}
function displayCategory(categories) {
  const container = document.getElementById("category-container");

  for (const cat of categories) {
    btn = document.createElement("button");
    btn.innerText = `${cat.category}`;
    btn.classList.add("btn", "btn-sm", "hover:bg-red-600", "hover:text-white");
    container.appendChild(btn);
  }
}
// loadCategory();

// load video
function loadVideo() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos));
}
function displayVideo(videos) {
  const videoContainer = document.getElementById("videoContainer");

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
        <figure>
          <img
            src="${video.thumbnail}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${video.title}</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>`;
    videoContainer.appendChild(videoCard);
  });
}
loadVideo();
