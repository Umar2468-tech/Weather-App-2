import React, { useEffect, useRef, useState } from "react";
import { UilSearch, UilWater, UilWind } from "@iconscout/react-unicons";
import clear from "../assets/clear.png";
import clear1 from "../assets/clear1.png";
import clearsky from "../assets/clearsky.png";
import clearweather from "../assets/clearweather.png";
import dayrain from "../assets/dayrain.png";
import freeze from "../assets/freeze.png";
import hot from "../assets/hot.png";
import rain from "../assets/rain.png";
import thunder from "../assets/thunder.png";

const Weather = () => {
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": clearsky,
    "02n": clearsky,
    "03n": clearweather,
    "03d": clearweather,
    "04d": clear1,
    "04n": clear1,
    "09d": rain,
    "09n": rain,
    "10d": dayrain,
    "10n": dayrain,
    "11d": thunder,
    "11n": thunder,
    "13d": freeze,
    "13n": freeze,
    "50d": hot,
    "50n": hot,
  };
  const inputData = useRef();
  console.log(inputData);
  const [weather, setWeather] = useState(false);
  const API_KEY = "f777bba421781d6b8c1da513daf94bcf";
  // const weatherURL = "https://api.openweathermap.org/data/2.5";
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const data = await fetch(url).then((res) => res.json());
      console.log(data, "Your data");
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeather({
        humidity: data.main.humidity,
        description: data.weather[0].description,
        temperature: Math.floor(data.main.temp),
        wind: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error, "Err");
    }
  };
  useEffect(() => {
    search("Nepal");
  }, []);
  return (
    <div>
      <div className="bg-blue-300 h-screen w-full">
        <div className="bg-blue-900 h-[700px] w-[500px] rounded-xl absolute top-[10%] left-[35%]">
          <div className="p-10 flex justify-between items-center text-center">
            <input
              type="text"
              ref={inputData}
              placeholder="Search..."
              className="h-[40px] w-[70%] rounded-3xl focus:outline-none  text-[20px] placeholder:items-center text-center"
            />
            <button onClick={() => search(inputData.current.value)}>
              <UilSearch size={30} className="text-white" />
            </button>
          </div>
          <div className="text-[70px] text-white font-semibold items-center text-center mt-20">
            <img src={weather.icon} alt="" className="h-[120px] m-auto" />
            <h1> {weather.temperature}°C</h1>
            <h1>{weather.location}</h1>
          </div>
          <div className="text-white flex justify-center items-center text-center mt-24 gap-4">
            <UilWater size={40} />
            <p className="text-[20px]">Humidity :</p>
            <span>
              <p className="text-[20px]">{weather.humidity}%</p>
            </span>
            <UilWind size={40} />
            <p className="text-[20px]">Wind :</p>
            <span>
              <p className="text-[20px]">{weather.wind} km/h</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
