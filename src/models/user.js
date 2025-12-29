import { model } from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true, // прибирає пробіли на початку та в кінці
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const copiedObject = this.toObject();
  delete copiedObject.password;
  return copiedObject;
};

export const User = model('User', userSchema);
