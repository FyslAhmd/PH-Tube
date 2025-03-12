const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("videoContainer").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("videoContainer").classList.remove("hidden");
};

function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
}
function displayCategory(categories) {
  const container = document.getElementById("category-container");

  for (const cat of categories) {
    btn = document.createElement("button");
    btn.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadCategories(${cat.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>
    `;
    container.append(btn);
  }
}
loadCategory();

// load video
function loadVideo(searchText = "") {
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideo(data.videos);
    });
}
function displayVideo(videos) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = ``;

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col justify-center items-center py-28">
                <img src="assets/Icon.png" alt="" class="w-28">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>`;
    hideLoader();
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100">
    <figure class="relative">
        <img class="w-full h-[150px] object-cover" src="${
          video.thumbnail
        }" alt="Shoes" />
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
            <p class="text-sm text-gray-400 flex gap-1">${
              video.authors[0].profile_name
            }
                ${
                  video.authors[0].verified == true
                    ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"
                alt="">`
                    : ""
                }
            </p>
            <p class="text-sm text-gray-400">${video.others.views}</p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${
          video.video_id
        }')" class="btn btn-block">Show Details</button>
      </div>`;
    videoContainer.appendChild(videoCard);
    hideLoader();
  });
}

// load category videos
const loadCategories = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add("active");
      displayVideo(data.category);
    });
};

function removeClass() {
  const activeBtn = document.getElementsByClassName("active");
  for (let btn of activeBtn) {
    btn.classList.remove("active");
  }
}

function loadVideoDetails(videoID) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideDetails(data.video));
}

const displayVideDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>`;
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideo(input);
});
