
import React from 'react'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { staticChartData } from './data';

const Chart = ({setHoursValue}) => {
 
  let forecasts
if(setHoursValue && !setHoursValue.error){
  forecasts = setHoursValue.forecast.forecastday[0].hour
}

//  let dataStatic = 
  
  return (
    <AreaChart width={730} height={250} data={ forecasts ?forecasts : staticChartData  }
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <XAxis dataKey='time'/>
    <YAxis  />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Area type="monotone" dataKey="temp_c" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    <Area type="monotone" dataKey="humidity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  </AreaChart>
  )
}

export default Chart
