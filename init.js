const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "neha",
    to: "priya",
    msg: "send me your exam sheets",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "arjun",
    to: "rahul",
    msg: "Let's meet at the library tomorrow.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "anita",
    to: "suresh",
    msg: "Don't forget the presentation slides.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "priya",
    to: "arjun",
    msg: "Lunch at 1 PM?",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "rahul",
    to: "neha",
    msg: "Can you share the project files?",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "suresh",
    to: "anita",
    msg: "Good luck with your interview!",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "vijay",
    to: "priya",
    msg: "Did you watch the new movie?",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "meena",
    to: "neha",
    msg: "Please review my code on GitHub.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "amit",
    to: "rahul",
    msg: "Are we playing football this weekend?",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "sonali",
    to: "arjun",
    msg: "Happy Independence Day! 🇮🇳",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

Chat.insertMany(allChats);
