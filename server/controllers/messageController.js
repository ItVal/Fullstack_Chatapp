// const Messages = require("../DataBase/PrivMessages.model");
const Message = require("../DataBase/PrivMessages.model");

exports.envoiMessage = async (req, res, next)=>{
    try{

        delete req.body._id;
         const msg = await new Message({
            temps : Date.now(),
              ...req.body
          })
          await msg.save()
          res.status(201).json({message :'Objet enregistre'})
    }
    catch(error){
        res.status(400).json(error)
    }
  };

// exports.ReadMessages = (req, res, next) => {
//     Message.find({$or: [{'idSender':req.params.id},{'idReceiver':req.params.id}]})
//     .then(msg => res.status(200).json(msg))
//     .catch(error => res.status(400).json({error}))
//   };

// //get all msg
exports.getAllMsg = async (req, res) => {
    const sms = await Message.find({});
    res.json(sms);
  };