const mongoose = require('../helpers/db');

const userSchema = mongoose.Schema({
  name : {
      type:String, 
      unique:true
  },
  userid: {
      type:String, 
      unique:true
  },
  topics: [ String ],
  updated: {
      type: Date, 
      default: Date.now
  }
}, { 
    collection: 'users'
})

userSchema.statics.findByName = function (name, callback) {
    return this.find({name: new RegExp(name, 'i')}).sort({'ordinal': -1}).limit(1);
}

module.exports = mongoose.model('users', userSchema);

