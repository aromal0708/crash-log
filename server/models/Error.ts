
import mongoose from "mongoose";

const errorSchema = new mongoose.Schema({
  apiKey: { type: String, required: true },
  message: { type: String, required: true },
  stack: String,
  type: String,
  severity: String,
  timestamp: { type: Date, default: Date.now },
  fileName: String,
  path: String,
  method: String,
  metadata: mongoose.Schema.Types.Mixed,
});

export default mongoose.model("Error", errorSchema);
