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
// Middleware to update status before saving
PostSchema.pre('save', function(next) {
  const now = new Date();
  if (now < this.subscription.startDate) {
    this.subscription.status = 'pending';
  } else if (now >= this.subscription.startDate && now <= this.subscription.endDate) {
    this.subscription.status = 'active';
  } else {
    this.subscription.status = 'expired';
  }
  next();
});

// Virtual property for dynamic status calculation
PostSchema.virtual('subscription.calculatedStatus').get(function() {
  const now = new Date();
  if (now < this.subscription.startDate) {
    return 'pending';
  } else if (now >= this.subscription.startDate && now <= this.subscription.endDate) {
    return 'active';
  } else {
    return 'expired';
  }
});

module.exports = mongoose.model("Post", PostSchema);
