const mongoose = require('mongoose');
// TODO: insert DB name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
