async function getRandomImage(query) {
  const encodedKey =
    "QzlrSXVFT2tOY213eE5sQ2F6c3FydHlLN0dVWFZHbWpNaEc1eHNIYWk1ZmVadklXUVFNUWZhSnA=";
  const apiKey = atob(encodedKey);
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  const data = await response.json();
  const photos = data.photos;
  if (!photos || photos.length === 0) return null;

  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
  console.log(randomPhoto.avg_color);
  return {
    image: randomPhoto.src.landscape,
    photographer: randomPhoto.photographer,
    alt: randomPhoto.alt,
  };
}

export async function loadBackground(arg) {
  const dataStuff = await getRandomImage(arg);
  if (!dataStuff) return;

  document.body.style.background = `url(${dataStuff.image}) no-repeat center center fixed`;
  document.body.style.backgroundSize = "cover";

  const p = document.createElement("p");
  p.innerHTML = `Photo from <a href="https://www.pexels.com/" target="_blank"> pexels.com </a> by ${dataStuff.photographer}`;
  document.querySelector(".cards").append(p);
}
