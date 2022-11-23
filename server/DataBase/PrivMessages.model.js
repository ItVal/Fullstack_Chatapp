const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  idSender: {
    type: mongoose.Schema.Types.ObjectId,
    required: "idSender is required!",
    ref: "UserA",
  },
  idReceiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: "idReceiver is required!",
    ref: "UserB",
  },
  message: {
    type: String,
    required: "Message is required!",
  }, 
 
});


const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;