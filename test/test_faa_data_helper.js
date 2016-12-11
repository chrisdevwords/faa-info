'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect;
const FAADataHelper = require('../faa_data_helper');
const mockStatus = require('./mock/status');

chai.use(chaiAsPromised);
chai.config.includeStack = true;


describe('FAADataHelper', () => {
    const subject = new FAADataHelper();
    let airport_code;

    describe('#getAirportStatus', () => {
        context('with a valid airport code', () => {
            it('returns matching airport code', () => {
               airport_code = 'SFO';
               const value = subject
                   .requestAirportStatus(airport_code)
                   .then(obj => obj.IATA);
                return expect(value)
                   .to.eventually.eq(airport_code);
            });
        });

        context('with an invalid airport code', () => {
            it('returns an error', () => {
                airport_code = 'PUNKYBREWSTER';
                const request = subject
                    .requestAirportStatus(airport_code)
                return expect(request)
                    .to.be.rejectedWith(Error);
            });
        });
    });

    describe('#formatAirportStatus', () => {

        context('with a status containing no delay', () => {
            const status = Object.assign({}, mockStatus, { delay: 'false' });

            it('formats the status as expected', () => {
                const formatted = subject.formatAirportStatus(status);
                const expected = 'There is currently no delay at Hartsfield-Jackson ' +
                    'Atlanta International. The current weather conditions are Light Snow, ' +
                    '36.0 degrees Farenheit (2.2 Celsius) and wind Northeast at 9.2mph.';
                expect(formatted)
                    .to.eq(expected);
            });
        });

        context('with a status containing a delay', () => {
            const status = Object.assign({}, mockStatus, { delay: 'true' });

            it('formats the status as expected', () => {
                const formatted = subject.formatAirportStatus(status);
                const expected = 'There is currently a delay for Hartsfield-Jackson ' +
                        'Atlanta International. The average delay time is 57 minutes. ' +
                        'Delay is because of the following: AIRLINE REQUESTED DUE TO DE-ICING ' +
                        'AT AIRPORT / DAL AND DAL SUBS ONLY. The current weather conditions ' +
                        'are Light Snow, 36.0 degrees Farenheit (2.2 Celsius) ' +
                        'and wind Northeast at 9.2mph.';
                expect(formatted)
                    .to.eq(expected);
            });
        });
    });
});
