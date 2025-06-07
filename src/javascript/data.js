const API_KEY = atob("NlM4OUhRSlNIQUdQVFFYUlE5U0FSQU1BNw==");
const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function getData(location) {
  let query = `${url}/${location}?key=${API_KEY}`;
  const response = await fetch(query);
  return await response.json();
}
