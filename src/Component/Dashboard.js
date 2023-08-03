import React, { useState, useEffect } from "react";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Chart from "./Chart";
import Button from '@mui/material/Button';

const Dashboard = ({ data }) => {
  const [date, setDate] = useState();
  const [loginCount, setLoginCount] = useState();
  const [username, setUserName] = useState("Oda Dink");
  const [datehistory, setDateHistory] = useState(dayjs(new Date()));

  const [historyInput, setHistoryInput] = useState({
    long : 28.23,
    lat : 27.21,
  })


  const [hours, setHours] = useState()
  useEffect(() => {
    const loginDate = localStorage.getItem("LoginDate");
    setDate(loginDate);

    const count = localStorage.getItem("LoginCount");
    setLoginCount(count);

    const name = localStorage.getItem("user");
    setUserName(name);
  }, []);


  async function fetchHistorydata () {
    fetch(`https://api.weatherapi.com/v1/history.json?key=e256b4b9b4104999bc1141514230208&q=${historyInput.lat},${historyInput.long}&dt=${datehistory}`)
    .then((res) => res.json())
    .then((value) => {
     setHours(value)
    })
  }

  useEffect(() => {
    
    fetchHistorydata()


  },[])

const handleHistory = (e) => {
  setHistoryInput({...historyInput, [e.target.name] : e.target.value})
}



const handleSubmit= (e) => {
  e.preventDefault();
  fetchHistorydata();
}
 


  return (
    <div className="maincontainer">
      <div className="userinfo">
        <div className="userdata">
          <img
            alt="Profile"
            src="/image/profile.png"
            style={{ width: 76, height: 76, borderRadius: "50%" }}
          />
          <h1 style={{ fontSize: "22px", fontWeight: 600 }}>{username ? username : "Oda Dink"}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <span> Login Date:</span>
            {date ? (
              <span style={{ marginLeft: "20px" }}>{date.split(",")[0]}</span>
            ):(
              <span style={{ marginLeft: "20px" }}>2023-08-06</span>
            ) }
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px ",
            }}
          >
            <span> Login Time:</span>
            {date ? (
              <span style={{ marginLeft: "20px" }}>{date.split(",")[1]}</span>
            ): (
              <span style={{ marginLeft: "20px" }}>11:03:33AM</span>
            )}
          </div>
          <button className="btn">Login Count : {loginCount ? loginCount : '1'}</button>
        </div>
        <div className="graph">
          <form className = "input-text" onSubmit={handleSubmit}>
        <TextField sx={{ width: 150}} name = "lat" id="outlined-basic" label="Latitude" variant="outlined"   size="small" value = {historyInput.lat} onChange = { handleHistory}/>
        <TextField  sx={{ width: 150}} name = "long" id="outlined-basic" label="Longtitude" variant="outlined"   size="small" value = {historyInput.long} onChange = {handleHistory} />
        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker
  label="Date"
  format='YYYY-MM-DD'
  value={datehistory}
sx={{ width: 180}}
slotProps={{ textField: { size: 'small' } }}
onChange = {(value) => setDateHistory(value)}
/>
        </LocalizationProvider>
        
<Button variant="contained" type = "submit">View History</Button>
        </form>
          <Chart historydata={data} setHoursValue = {hours}/>
        </div>
      </div>

      <div className="WeatherInfo">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div className="container-box" style={{ background: " #1bd084" }}>
            <div className="weatherheading">
              Humidity <FilterDramaIcon />
            </div>
            <h2 className="record">
              {data && !data.error? `${data.current.humidity}%` : "67% "}
            </h2>
          </div>
          <div className="container-box" style={{ background: " #ffab09" }}>
            <div className="weatherheading">
              Wind <AirOutlinedIcon />
            </div>
            <h2 className="record">
              {data && !data.error? `${data.current.wind_kph}km/h` : "17km/h "}
            </h2>
          </div>
          <div className="container-box" style={{ background: " #4864f8" }}>
            <div className="weatherheading">
              UV index <WbSunnyOutlinedIcon />
            </div>
            <h2 className="record">
              {data && !data.error ? `${data.current.uv} medium` : "5 medium "}
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <div className="container-box" style={{ background: "#fe8126" }}>
            <div className="weatherheading">
              Feels like <DeviceThermostatOutlinedIcon />
            </div>
            <h2 className="record">
              {data  && !data.error? <>{data.current.feelslike_c}&#176;C</> : <>23&#176;C</>}
            </h2>
          </div>
          <div className="container-box" style={{ background: "#623aff" }}>
            <div className="weatherheading">
              Chance of rain <DeviceThermostatOutlinedIcon />
            </div>
            <h2 className="record">
              {data && !data.error ? (
                <>{data.forecast.forecastday[0].day.daily_chance_of_rain}%</>
              ) : (
                <>23%</>
              )}
            </h2>
          </div>
          <div className="container-box" style={{ background: "#2186f2" }}>
            <div className="weatherheading">
              {" "}
              Sunrise :{" "}
              {data && !data.error? (
                <>{data.forecast.forecastday[0].astro.sunrise}</>
              ) : (
                <>6:03 AM</>
              )}{" "}
              <LightModeIcon />{" "}
            </div>
            <div className="weatherheading">
              Sunset :{" "}
              {data && !data.error ? (
                <>{data.forecast.forecastday[0].astro.sunset}</>
              ) : (
                <>7:13 PM</>
              )}{" "}
              <WbTwilightOutlinedIcon />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
