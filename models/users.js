const mongoose = require('mongoose')

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
    this.find({ name: new RegExp(name, 'i') }, callback);
}

module.exports = mongoose.model('users', userSchema);

