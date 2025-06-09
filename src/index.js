import "./css/styles.css";
import { getData } from "./javascript/data.js";
import { addCard } from "./javascript/card.js";
import { loadBackground } from "./javascript/loadbg.js";

async function showData(cityName) {
  const json = await getData(cityName);

  document.getElementById("location").innerText = json.resolvedAddress;
  document.getElementById("description").innerHTML = json.description;
  loadBackground(json.resolvedAddress + " " + json.description);

  const cards = document.getElementsByClassName("cards")[0];
  cards.innerHTML = "";

  for (const day of json.days) {
    addCard({
      icon: day.icon,
      date: day.datetime.slice(-2),
      temp: day.temp,
      feelsLike: day.feelslike,
      humidity: day.humidity,
      description: day.description,
    });
  }
}

await showData("hokaido");

document.getElementById("submit").addEventListener("click", async function () {
  const inputValue = document.querySelector("input").value || "Tokyo";
  await showData(inputValue);
});
