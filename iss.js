const request = require('request');

// gets IP
const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', function (error, response, body) {
    // if error callback error
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if success pass success
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

// gets coords by IP
const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, function (error, response, body) {
    // if error callback error
    if (error) {
      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
  });
};

// fetches fly over times
const fetchISSFlyOverTimes = function (coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function (error, response, body) {
    // if error callback error
    if (error) {
      callback(error, null);
      return;
    }
    // if response isn't 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // declare 
    const passingTimes = JSON.parse(body).response;
    callback(null, passingTimes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(loc, (error, passes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, passes);
      });
    });
  });
};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };