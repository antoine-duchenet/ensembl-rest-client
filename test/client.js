var expect = require('chai').expect;
var sinon = require('sinon');
var EnsemblClient = require('../src/client');

describe('ensembl-client', function() {
  var ensemblClient;
  var sandbox;

  beforeEach(function() {
    ensemblClient = EnsemblClient();
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should pass a canary test', function() {
    expect(true).to.be.true;
  });

  it('should have an info attribute', function() {
    expect(ensemblClient).to.have.property('info');
  });

  describe('info', function() {

    it('should have a ping method', function() {
      expect(ensemblClient.info).to.have.property('ping');
    });

    it('should have a rest method', function() {
      expect(ensemblClient.info).to.have.property('rest');
    });

    it('should have a software method', function() {
      expect(ensemblClient.info).to.have.property('software');
    });

    it('should have a species method', function() {
      expect(ensemblClient.info).to.have.property('species');
    });

    it('should have an assembly method', function() {
      expect(ensemblClient.info).to.have.property('assembly');
    });

    describe('ping', function() {

      it('should handle a valid response', function(done) {
        sandbox.stub(ensemblClient._axios, 'get').returns(Promise.resolve({
          data: {ping: 1}
        }));

        ensemblClient.info.ping()
        .then(function(response) {
          expect(response.data).to.deep.equal({ping: 1});
          done();
        });
      });

      it('should handle a bad response', function(done) {
        sandbox.stub(ensemblClient._axios, 'get').returns(Promise.reject({
          response: {
            statusCode: 500
          }
        }));

        ensemblClient.info.ping()
        .catch(function (error) {
          expect(error.response).to.have.property('statusCode');
          done();
        });
      });

    });

    describe('assembly', function() {
      it('should handle a valid response', function(done) {
        sandbox.stub(ensemblClient._axios, 'get').returns(Promise.resolve({
          data: {
            karyotype: [],
            assembly_date: '2013-12',
            genebuild_last_geneset_update: '2017-01',
            assembly_name: 'GRCh38.p10',
            coord_system_versions: [],
            top_level_region: [],
            // ...
          }
        }));

        ensemblClient.info.assembly('homo_sapiens', true)
        .then(function(response) {
          expect(response.data).to.have.property('karyotype');
          done();
        });
      });
    });

  });

});
