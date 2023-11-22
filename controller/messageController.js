const asyncHandler = require('express-async-handler');
const Message = require('../models/messagemodel');
const User = require('../models/user');
const Chat = require('../models/chatschema');

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.error("Invalid data passed into the request");
      return res.status(400).json({ error: "Invalid data" });
    }

    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    const message = await Message.create(newMessage);
    await message.populate('sender', 'name pic')
    await message.populate('chat')

    await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});
const mongoose = require('mongoose');

const allMessages = asyncHandler(async (req, res) => {
  try {
    const chatId = new mongoose.Types.ObjectId(req.params.chatId); // Convert chatId to ObjectId
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages); // Send the messages as a JSON response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send an error response
  }
});

  

module.exports = { sendMessage ,allMessages};
