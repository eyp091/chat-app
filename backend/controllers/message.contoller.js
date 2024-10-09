import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        
        // daha önce mesajlaşma varsa
        let conversation = await Conversation.findOne({ 
            participants: { $all: [senderId, receiverId] },
        })

        // yeni mesaj
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });

        if (newMessage) {
            conversation.message.push(newMessage._id)
        };

        // SOCKET.IN FUNCTIONALITY WILL GO HERE

        // await conversation.save();
        // await newMessage.save();

        // this will run parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Interval server error."});
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("message"); // ilgili mesajların içeriğini döndürür.

        if (!conversation) {
            return res.status(400).json([]);
        }

        const messages = conversation.message

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({error: "Interval server error."});
    }
}