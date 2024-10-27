import React, { useState, useEffect } from 'react'
import { useFetch, request } from '../utils/apihook';
import WeatherChart from '../components/weatherchart';
import TableWeather from '../components/table';
import Card from '../components/card';
import weatherImg from '../../public/images/sun.png';
import imageCloud from '../../public/images/cloudy.png'
import { transformData, getTodayData } from '../utils/utilities';
import CustomDropdown from '../components/dropdown';

const Dashboard = () => {

const [location, setLocation] = useState({ lat: "14.5965777", lng: "120.9383602" });

const {
   loading: loading,
   data: data,
   error: error,
} = useFetch(location)

useEffect(() => {
  if (location.lat && location.lng) {
    const newLocation = {
      ...location,
      url: request.getWeather.url(location.lat, location.lng)
    };
    setLocation(newLocation);
  }
  console.log(data)
}, [location.lat, location.lng]);

const trans = transformData(data)
const slice = getTodayData(trans).slice(0, 1)

const dropdownOptions = [
  { value: { lat: "14.5965777", lng: "120.9383602" } , label: 'Metro Manila' },
  { value: { lat: "14.1739183", lng: "121.1301467" } , label: 'Cabuyao Laguna' },
  { value: { lat: "13.6975146", lng: "122.1877947" } , label: 'General Luna Quezon' },
  { value: { lat: "9.5822555", lng: "123.7425754" } , label: 'Panglao Bohol' },
];


const handleDropdownChange = (selectedOption) => {
  setLocation(selectedOption.value)
};


  return (
<React.Fragment>
  <div className="min-w-[500px] max-w-full overflow-auto items-center justify-center bg-white p-6">
    <div className="flex flex-col md:flex-row">
      <div className='md:basis-3/4 w-full'>
        <div className="flex flex-col md:flex-row">
          <div className="md:basis-1/2 flex p-2">
            <div className="w-full text-center space-y-4">
              <CustomDropdown options={dropdownOptions} onChange={handleDropdownChange} />
              <p className="text-gray-500">lat {location?.lat}, lng {location?.lng}</p>
              <br />
              <div className="text-9xl font-bold text-gray-800 mt-2">{slice[0]?.y}°</div>
            </div>
          </div>
          <div className="md:basis-1/2 p-2">
            <div className='flex justify-center'>
              <img
                src={slice[0]?.y >= 30 ? weatherImg : imageCloud}
                alt="Dynamic Description"
                className="w-1/2 md:w-auto h-auto" 
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className='basis-full'>
            <Card data={data} />
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className='basis-full'>
            <WeatherChart data={data} />
          </div>
        </div>
      </div>
      <div className="md:basis-1/4 p-2 md:block hidden">
        <TableWeather data={data} />
      </div>
    </div>
  </div>
</React.Fragment>
  )
}

export default Dashboard