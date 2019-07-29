const shasum = require('shasum');


function unleadingHashIt(str){
	return str.replace(/^#*/,	'');
}

function genTopicID(topic) {
	if (!topic){
		return null;
	}
	topic =	unleadingHashIt(String(topic));
	return "pubsub"+ shasum(topic);
}

//module.exports = genTopicID;
module.exports = {
    genTopicID : genTopicID
}

