const mongoose = require('mongoose');


const chatSchema = mongoose.Schema({
  message: {type: String, required: true},

});


module.exports = mongoose.model('Chat', chatSchema);
