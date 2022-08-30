const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["waiting", "processing", "finished"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Post", PostsSchema);
