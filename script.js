const searchButton = document.getElementById('searchButton');
const showMoreButton = document.getElementById('showMoreButton');
const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');
let page = 1;
let currentQuery = '';

searchButton.addEventListener('click', () => {
  page = 1;
  currentQuery = searchInput.value;
  gallery.innerHTML = ''; // Clear previous images
  searchImages();
});

showMoreButton.addEventListener('click', () => {
  page++;
  searchImages();
});

async function searchImages() {
  const query = currentQuery;
  if (!query) return;

  const url = https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=YOUR_ACCESS_KEY&per_page=10;
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results.length > 0) {
      displayImages(data.results);
      showMoreButton.style.display = 'block'; // Show the "Show More" button
    } else {
      showMoreButton.style.display = 'none'; // Hide if no more images
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImages(images) {
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.thumb;
    imgElement.alt = image.alt_description;
    gallery.appendChild(imgElement);
  });
}