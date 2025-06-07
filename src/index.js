import "./css/styles.css";
import { getData } from "./javascript/data.js";

async function init() {
  const app = document.getElementById("app");
  const data = await getData("dhaka");
  app.textContent = JSON.stringify(await data.description);
  console.log(data);
}

init();
