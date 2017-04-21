var axios = require('axios');

var EnsemblClient = function() {
  var client = {};

  client._axios = axios.create({
    baseURL: 'http://rest.ensembl.org',
    headers: {'Content-type': 'application/json'}
  });

  client.info = {
    assembly: function(species, band) {
      return client._axios.get('/info/assembly/' + species, {
        params: {
          bands: (band ? 1 : 0)
        }
      });
    },
    ping: function() {
      return client._axios.get('/info/ping');
    },
    rest: function() {
      return client._axios.get('/info/rest');
    },
    software: function() {
      return client._axios.get('/info/software');
    },
    species: function() {
      return client._axios.get('/info/species');
    }
  };

  return client;
};

module.exports = exports = EnsemblClient;
