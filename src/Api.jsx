import React, { useState } from "react";
import "./Api.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import video from "./video/bg.mp4";
import axios from "axios";

function Api() {
  const [allCity, setallCity] = useState([]);
  const [WeatherData, setWeatherData] = useState([]);

  let getcity = (e) => {
    e.preventDefault();
    let cityname = e.target.CityName.value;

    if (!allCity.includes(cityname)) {
      let oldData = [...WeatherData];

      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

      axios
        .get(apiUrl)
        .then(function (response) {
          // handle success
          setallCity([...allCity, cityname]);
          console.log(response.data);

          oldData.push(response.data);
          setWeatherData(oldData);
        })
        .catch(function (error) {
          // handle error
          toast.error("City Not Found");
        });
    } else {
      toast.error("City Already Exists In Your Data");
    }
  };
  console.log(WeatherData);
  return (
    <>
      <ToastContainer />
      <video className="w-100  position-fixed" autoPlay muted loop>
        <source src={video} />
      </video>
      <div className="container-fluid ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form className="text-center py-5" id="form" onSubmit={getcity}>
                <input
                  type="text"
                  placeholder="Enter Your City"
                  id="inputBox"
                  name="CityName"
                />
                <button type="submit" className="btn btn-info fw-bold">
                  {" "}
                  Submit{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-9 border border-2 border-danger  ">
        <div className="row" id="displayBox">
        {
                  WeatherData.length >= 1
                    ?
                    WeatherData.map((v,i) => {

                      return (
                        <div className="col-lg-3 col-12 mb-4 hilightDiv " key={i}>
                          <div className="card position-relative my-2 text-center pt-3">
                            <h4>{v.sys.country}</h4>
                            <h5 className="card-title text-capitalize"> {v.name} </h5>
                            <p className="card-text fw-bold"> {v.main.temp} </p>
                            <img src={`https://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`}className="card-img-top"/>
                            <div className="card-body">
                              <p className="text-uppercase fw-bold"> {v.weather[0].description}</p>
                            </div>
                            <button className="btn position-absolute end-0 fs-3 top-0"><i className="fa-solid fa-xmark"></i></button>
                          </div>
                        </div>
                      )
                    })
                    :

                    ''
                }

        </div>
      </div>
    </>
  );
}

export default Api;
