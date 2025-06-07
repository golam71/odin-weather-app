export function addCard({
  icon,
  date,
  temp,
  feelsLike,
  humidity,
  description,
}) {
  const cardsContainer = document.querySelector(".cards");

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = `/public/icones-monoschrome/${icon}.svg`;
  img.height = 50;
  img.alt = icon;
  img.className = "icon";

  const dateDiv = document.createElement("div");
  dateDiv.className = "date";
  dateDiv.innerHTML = `<strong>Date:</strong> ${date}`;

  const tempDiv = document.createElement("div");
  tempDiv.className = "temp";
  tempDiv.innerHTML = `<strong>Temp:</strong> <span id="temp">${temp} °F</span>`;

  const feelsDiv = document.createElement("div");
  feelsDiv.className = "feels-like";
  feelsDiv.innerHTML = `<strong>Feels Like:</strong> <span id="feelslike">${feelsLike} °F</span>`;

  const humidityDiv = document.createElement("div");
  humidityDiv.className = "humidity";
  humidityDiv.innerHTML = `<strong>Humidity:</strong> ${humidity} %`;

  const descDiv = document.createElement("div");
  descDiv.className = "description";
  descDiv.innerHTML = `<strong>Description:</strong> ${description}`;

  card.appendChild(img);
  card.appendChild(dateDiv);
  card.appendChild(tempDiv);
  card.appendChild(feelsDiv);
  card.appendChild(humidityDiv);
  card.appendChild(descDiv);

  cardsContainer.appendChild(card);
}
