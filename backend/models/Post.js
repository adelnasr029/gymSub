const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
      type: Date, 
      required: true 
    },
    totalDays: {
      type: Number, 
      default: 0,
    },
  amount: { 
      type: Number,
       required: true 
    },
  status: { type: String,
     enum: ['pending', 'active', 'expired', 'cancelled'], default: 'pending' 
    },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


PostSchema.pre("save", function (next) {
  const now = new Date();

  // Calculate the number of days for the current subscription period
  if (this.startDate && this.endDate) {
    const timeDiff = this.endDate - this.startDate; // Difference in milliseconds
    const currentDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    // Accumulate totalDays
    if (this.isNew) {
      // For new subscriptions, set totalDays to currentDays
      this.totalDays = currentDays;
    } else {
      // For renewals, add currentDays to totalDays
      this.totalDays += currentDays;
    }
  }

  // Update the status
  if (now < this.startDate) {
    this.status = "pending";
  } else if (now >= this.startDate && now <= this.endDate) {
    this.status = "active";
  } else {
    this.status = "expired";
  }

  next();
});

module.exports = mongoose.model("Post", PostSchema);
