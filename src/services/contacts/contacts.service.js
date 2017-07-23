// Initializes the `contacts` service on path `/contacts`
const createService = require('feathers-mongodb');
const hooks = require('./contacts.hooks');
const filters = require('./contacts.filters');

module.exports = function () {
  const app = this;
  const mongoClient = app.get('mongoClient');
  const options = {};

  // Initialize our service with any options it requires
  app.use('/contacts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('contacts');

  mongoClient.then(db => {
    service.Model = db.collection('contacts');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
