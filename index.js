'use strict';

module.change_code = 1;

const Alexa = require('alexa-app');
const app = new Alexa.app('airportinfo');
const FAADataHelper = require('./faa_data_helper');


const slots = {
    'AIRPORTCODE': 'FAACODES'
};

const utterances = [
    '{|flight|airport} {|delay|status} {|info|information} {|for|at} {-|AIRPORTCODE}'
];

app.intent('airportinfo', { slots, utterances },

    (req, res) => {

        const airportCode = req.slot('AIRPORTCODE');
        const reprompt = 'Tell me an airport code to get delay information.';

        if (!airportCode || !airportCode.length) {
            const prompt = 'I didn\'t hear an airport code. Tell me an airport code.';
            res
                .say(prompt)
                .reprompt(reprompt)
                .shouldEndSession(false);
        } else {
            const faaHelper = new FAADataHelper();
            faaHelper
                .requestAirportStatus(airportCode)
                .then(status => faaHelper.formatAirportStatus(status))
                .then(message => {
                    console.log(message);
                    res
                        .say(message)
                        .shouldEndSession(true)
                        .send();
                })
                .catch(err => {
                    console.log(err.statusCode || 500);
                    const prompt = `I didn\'t have data for an airport code of ${airportCode}`;
                    res
                        .say(prompt)
                        .reprompt(reprompt)
                        .shouldEndSession(true)
                        .send();
                });
        }

        return false;
    }
);

app.launch((req, res) => {
    const prompt = 'For delay information, tell me an Airport code.';
    res
        .say(prompt)
        .reprompt(prompt)
        .shouldEndSession(false);
});


// hack for dynamic utterances
const utterancesMethod = app.utterances;
app.utterances = () =>  utterancesMethod().replace(/\{\-\|/g, '{');

module.exports = app;
