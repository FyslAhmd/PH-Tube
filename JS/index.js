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
loadCategory();


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
    <div class="card bg-base-100">
    <figure class="relative">
        <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
        <span class="absolute bottom-2 right-2 text-white bg-black p-2 text-sm rounded">3hrs 56 min
            ago</span>
    </figure>
    <div class="flex gap-3 px-0 py-5">
        <div class="profile">
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                    <img src="${video.authors[0].profile_picture}" />
                </div>
            </div>
        </div>
        <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"
                    alt="">
            </p>
            <p class="text-sm text-gray-400">${video.others.views}</p>
          </div>
        </div>
      </div>`;
    videoContainer.appendChild(videoCard);
  });
}


// load category videos
