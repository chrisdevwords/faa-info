'use strict';

const request = require('request-promise');
const ENDPOINT = 'http://services.faa.gov/airport/status/';

class FAADataHelper {

    requestAirportStatus(airportCode) {
        return this.getAirportStatus(airportCode)
            .then(resp => resp.body);
    }

    getAirportStatus(airportCode) {
        const options = {
            method: 'GET',
            uri: `${ENDPOINT}${airportCode}`,
            resolveWithFullResponse: true,
            json: true
        };
        return request(options);
    }

    formatAirportStatus(airportStatus) {
        const weather = this.formatWeather(airportStatus.weather);
        const airport = airportStatus.name;

        if (airportStatus.delay === 'true') {
            const delay_time = airportStatus.status.avgDelay;
            const delay_reason = airportStatus.status.reason;
            return `There is currently a delay for ${airport}. ` +
                    `The average delay time is ${delay_time}. ` +
                    `Delay is because of the following: ${delay_reason}. `
                     + weather;
        } else {
            return `There is currently no delay at ${airport}. ${weather}`;
        }
    }

    formatWeather(data) {
        const weather = data.weather;
        const temp = data.temp;
        const wind = data.wind;
        return `The current weather conditions are ${weather}, ${temp} and wind ${wind}.`;
    }
}

module.exports = FAADataHelper;
