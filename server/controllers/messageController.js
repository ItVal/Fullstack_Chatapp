// const Messages = require("../DataBase/PrivMessages.model");
const Message = require("../DataBase/PrivMessages.model");

exports.envoiMessage = async (req, res, next)=>{
    try{
      console.log(req.body);
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

  //read private message
  exports.readMessages = async (req, res, next) => {
    Message.find({
      $and: [
        {
          $or: [{ idSender: req.params.id }, { idReceiver: req.params.id }],
        },
        { $or: [{ idSender: req.body.friend }, { idReceiver: req.body.friend }] },
      ],
    })
      // .populate(["idSender", "idReceiver"])
      .then((messenger) => res.status(200).json(messenger))
      .catch((error) => res.status(400).json({ error }));
  };

//get all msg
exports.getAllMsg = async (req, res) => {
    const sms = await Message.find({});
    res.json(sms);
  };

  