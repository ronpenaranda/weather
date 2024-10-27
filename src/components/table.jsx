import React from 'react'
import { roundOff, transformData, getWeeklySummary } from '../utils/utilities'
import imageSun from '../assets/images/sun.png';
import imageCloud from '../assets/images/cloudy.png';

const TableWeather = ({ data }) => {

const slice = transformData(data)
const summary = getWeeklySummary(slice)

  return (
    <div className="bg-gray-100 p-4 rounded-lg h-full">
    <h2 className="text-gray-500 font-semibold text-left mb-4">Weekly Forecast</h2>
    
        <div className="divide-y divide-gray-200 p-6 ">
        {
            Object.entries(summary).map(([day, data], index) => {
                return (
                <div key={index} className="flex flex-row text-left space-x-4 py-6">
                    <span className="basis-1/2 text-gray-500 font-bold">{day}</span>
                    <img className='basis-1/8' src={ data?.weather === 'Sunny' ? imageSun : imageCloud } alt="Dynamic Description" width="40" height="40" />
                    <span className="basis-1/4 text-gray-700">{data?.weather}</span>
                    <span className="basis-1/4 text-gray-800 font-bold">{roundOff(data?.average, 2)}</span>
                </div>
                );
            })
        }
        </div>
  </div>
  )
}

export default TableWeather