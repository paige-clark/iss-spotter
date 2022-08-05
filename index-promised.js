const { nextISSTimesForMyLocation } = require('./iss-promised');

const print = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    print(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });