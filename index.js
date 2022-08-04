const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


fetchCoordsByIP('38.110.104.168', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  const coordinates = data;

  console.log(`coordinates received...`, data);
  fetchISSFlyOverTimes(coordinates, (error, data) => {
    console.log(`Upcoming ISS appearances:`);
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  });
});