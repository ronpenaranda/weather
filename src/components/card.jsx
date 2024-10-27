import React from 'react'
import { transformData } from '../utils/utilities'
import { formatTime, getTodayData } from '../utils/utilities'
import imageSun from '../assets/images/sun.png';
import imageCloud from '../assets/images/cloudy.png';

const Card = ({ data }) => {

  const trans = transformData(data)
  const slice = getTodayData(trans).slice(0, 5)


  return (
    <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-gray-500 font-semibold text-left mb-4">Today's Forecast</h2>
        <div className="flex justify-between text-center text-gray-800">
        {
          slice.map((item,index) => {
            return(
            <div className='p-4 space-y-4 justify-center items-center' key={index}>
              <p className="text-gray-700 font-semibold">{formatTime(new Date(item.x))}</p>
              <img className='basis-1/8' src={item.y  >= 30 ? imageSun : imageCloud} alt="Dynamic Description" width="50" height="50" />
              <p className='text-xl font-semibold'>{item.y}°</p>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Card