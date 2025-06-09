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
  return {
    image: randomPhoto.src.landscape,
    photographer: randomPhoto.photographer,
    alt: randomPhoto.alt,
    avg_color: randomPhoto.avg_color,
  };
}

function mixWithWhite(hex, mixRatio = 0.5, alpha = 0.5) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const mixedR = Math.round(r + (255 - r) * mixRatio);
  const mixedG = Math.round(g + (255 - g) * mixRatio);
  const mixedB = Math.round(b + (255 - b) * mixRatio);

  return `rgba(${mixedR}, ${mixedG}, ${mixedB}, ${alpha})`;
}

export async function loadBackground(arg) {
  const dataStuff = await getRandomImage(arg);
  if (!dataStuff) return;

  const img = new Image();
  img.src = dataStuff.image;

  img.onload = () => {
    document.body.style.background = `url(${dataStuff.image}) no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = dataStuff.avg_color;
    document.querySelectorAll(".card").forEach((card) => {
      // card.style.background = `color-mix(in srgb, ${dataStuff.avg_color}, white 50%)`;
      card.style.background = mixWithWhite(dataStuff.avg_color, 0.5, 0.5);
    });

    const cardsContainer = document.querySelector(".cards");
    cardsContainer.querySelector("p")?.remove(); // remove previous credit
    const p = document.createElement("p");
    p.innerHTML = `Photo from <a href="https://www.pexels.com/" target="_blank">pexels.com</a> by ${dataStuff.photographer}`;
    cardsContainer.append(p);
  };
}
