import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'subscriber'
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  { timestamps: true }
);

// Virtual fields
// Never saved onto database

userSchema
  .virtual('password')
  .set(function(password) {
    
    // create temporary password variable
    this._password = password;

    // generate sale
    this.salt = this.makeSalt();

    // encrypt Password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    }
    catch (err) {
      return '';
    }
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random())
  }
};

const User = mongoose.model('User', userSchema);

export default User;
