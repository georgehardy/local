import request from 'superagent'

export function addyAutoComplete (input) {
  return request
    .get(`https://www.addy.co.nz/api/search?s='${input}'`)
    .set('addy-api-key', 'ab4da45e1bc44013a86556b00eefb289')
}

export function mqGeocode (input) {
  return request
    .get(`http://www.mapquestapi.com/geocoding/v1/address?` +
         `key=DRKly60NLBpFkRjJHCNTAFdbFAKMmqOO&location='${input},New Zealand'`)
}
