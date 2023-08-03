import React,{useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import "../Style/Home.css";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Dashboard from "./Dashboard";
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "@mui/material";

const Home = () => {


    const [location , setLocation] = useState({
        longitude : '',
        latitude : '',
        region : '',
    })
    
    const [weatherData, setWeatherData] = useState()

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
            setLocation({
                longitude : position.coords.longitude,
                latitude : position.coords.latitude
            })
        })
    },[])

    useEffect(() => {
        if(location.latitude && location.longitude){
            try{async function forcast() {
               await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e256b4b9b4104999bc1141514230208&q=${location.latitude},${location.longitude}&days=1&aqi=no&alerts=no`)
                  .then((res) => res.json())
                  .then((value) => {
                       setLocation({region : value})
                       setWeatherData(value)
                   
                  })
              } 
              forcast()  }
              catch(err) {
                console.log(err)
              }
        }

       
    
    },[location.latitude, location.longitude])


    const RecentTime = () => {
        const currentHours = new Date().getHours()
        const currentMin = new Date().getMinutes()
        let ampm = 'AM'
        let hours = currentHours;

        if(currentHours >= 12){
            ampm = 'PM'

            hours = currentHours === 12 ? 12 : currentHours - 12;
        }

      const time = hours + ':' + currentMin + ampm
        return time
    }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <div className="sidebar">
            <div className="degree">
              <img alt = "" width={250} src="/image/cloud.png" />
              <h1 className="header">
                {weatherData  && !weatherData.error? <>{weatherData.current.temp_c}<span>&#176;</span>C</>: <>25<span>&#176;</span>C</>}
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  
                }}
              >
                <LightModeOutlinedIcon />
                <p className="sunny">Sunny</p>
              </div>
            </div>

            <div className = "Details">
                <div className = "Date">
         
                    <DateRangeOutlinedIcon/>
                    <div style = {{marginLeft : '10px'}}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
             
                    <div style = {{marginLeft : '50px'}}>{RecentTime()}</div>
                </div>

                <div className = "Date">
         
         <LocationOnOutlinedIcon/>
         <div style = {{marginLeft : '10px'}}>{location.region && !location.region.error? location.region.location.name + ', ' + location.region.location.region + ', ' + location.region.location.country  : 'New Delhi, Delhi, India'}</div>
     </div>
            </div>

            <Button variant="contained" type = "submit" style = {{margin: '150px 0px 0px 0px' , width : '100%',backgroundColor : '#2186f2'}}><LogoutOutlinedIcon style = {{paddingRight : '15px'}} /><Link href = "/login" style = {{cursor:'pointer',textDecoration : 'none', color : 'white'}}>Logout</Link>  </Button>
          </div>
        </Grid>

        <Grid xs={8}>
          <div className="dashboard"><Dashboard data = {weatherData}/></div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
