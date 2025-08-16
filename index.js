const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", (req, res) => {
  res.redirect("/chats");
});

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

//New Chat Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Add chat Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
    updated_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Chat saved Successfully.");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//View Chat Route
app.get("/chats/view/:id", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("view.ejs", { chat });
});

//Edit Route
app.get("/chats/edit/:id", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let newUpdated = new Date();
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg, updated_at: newUpdated },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);

  res.redirect("/chats");
});

//Delete Route
app.get("/chats/delete/:id", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("delete.ejs", { chat });
});

app.delete("/chats/delete/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080.");
});
