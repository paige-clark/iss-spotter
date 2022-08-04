const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('38.110.104.168', (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   const coordinates = data;

//   console.log(`coordinates received...`, data);
//   fetchISSFlyOverTimes(coordinates, (error, data) => {
//     console.log(`Upcoming ISS appearances:`);
//     if (error) {
//       console.log(error);
//       return;
//     }
//     console.log(data);
//   });
// });

const print = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  // fail here
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success here
  console.log(passTimes);
  print(passTimes);
});