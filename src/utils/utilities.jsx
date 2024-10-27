export const transformData = (data) => {
    if (!data?.hourly?.temperature_2m || !data?.hourly?.time) {
      return []; 
    }
  
    return data.hourly.temperature_2m.map((item, index) => ({
      x: data.hourly.time[index],
      y: item
    }));
  };
  
  export const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

export function roundOff(num, decimalPlaces) {
  if (isNaN(num) || isNaN(decimalPlaces)) {
      throw new Error("Both arguments must be valid numbers.");
  }
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}

export function getTodayData(series) {
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

  return series.filter(item => {
    const itemDate = new Date(item.x); // Convert item date to Date object
    const itemDateString = itemDate.toISOString().split('T')[0];
    
    return itemDateString === todayDateString;
  });
}

export function getWeeklySummary(series) {
  // Get today's date and calculate the date 7 days from today
  const today = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 6); // Include today, so it's a 7-day range

  // Initialize an object to store summary data for each day of the week
  const weeklySummary = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  // Helper function to get the day of the week from a date
  function getDayOfWeek(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }

  // Filter data for the upcoming week and group it by day of the week
  series.forEach(item => {
    const itemDate = new Date(item.x);
    
    // Only include data from the next 7 days
    if (itemDate >= today && itemDate <= oneWeekFromNow) {
      const dayOfWeek = getDayOfWeek(itemDate);
      weeklySummary[dayOfWeek].push(item.y);
    }
  });

  // Calculate the summary for each day (e.g., sum or average)
  Object.keys(weeklySummary).forEach(day => {
    const values = weeklySummary[day];
    
    // Calculate the sum and average of values for each day
    const total = values.reduce((sum, value) => sum + value, 0);
    const average = values.length ? total / values.length : 0;

    // Determine the weather based on the average value
    let weather;
    if (average >= 30) {
      weather = 'Sunny';
    } else if (average < 30 && average >= 15) {
      weather = 'Cloudy';
    } else {
      weather = 'Rainy'; // You can adjust this logic as needed
    }

    // Replace the array with an object containing summary information
    weeklySummary[day] = {
      total,
      average,
      count: values.length,
      weather // Add weather to the summary
    };
  });

  return weeklySummary;
}
