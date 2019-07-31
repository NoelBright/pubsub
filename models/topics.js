const mongoose = require('../helpers/db')

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
    return this.find({topic: new RegExp(topic, 'i')}).sort({'ordinal': -1}).limit(1);

}

module.exports = mongoose.model('topics', topicSchema);

