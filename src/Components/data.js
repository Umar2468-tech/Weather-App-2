const API_KEY = "c5e167384f899f2c8fc151e96242be5f";
const weatherURL = "https://api.openweathermap.org/data/2.5";
const search = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const respone = await fetch(url).then((res) => res.json());
    console.log(respone);
  } catch (error) {}
};

