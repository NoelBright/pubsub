const mongoose = require('mongoose')

const topicSchema = mongoose.Schema({
    topic: {
        type: String, 
        unique: true
    },
    topicid: String,
    bucket: Number,
    subscribers: [
        String
    ]
}, { 
    collection: 'topics'
})

topicSchema.statics.findByTopic= function (topic, callback) {
    this.find({ topic: new RegExp(topic, 'i') }, callback);
}

module.exports = mongoose.model('topics', topicSchema);

