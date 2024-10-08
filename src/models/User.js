const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      trim: true,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Pre middleware to delete associated thoughts before user deletion
userSchema.pre('findOneAndDelete', async function(next) {
  const user = await this.model.findOne(this.getQuery());

  if (user.thoughts && user.thoughts.length > 0) {
    await thoughtSchema.deleteMany({ _id: { $in: user.thoughts } });
  }

  next();
});

const User = model('user', userSchema);

module.exports = User;
