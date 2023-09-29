
export function VotingDAO() {
	this.serverBaseURL = 'http://localhost:8080';
	// this.serverBaseURL = 'https://voting-buddy-server.vercel.app';
}

VotingDAO.prototype.getTopicList = async function(setTopicListCallback, renderCallback) {
	const response = await fetch(this.serverBaseURL + '/getTopicList');
	if (response.status == 200) {
		setTopicListCallback(await response.json(), renderCallback);
	}
}

VotingDAO.prototype.setTopics = async function(topicList, renderCallback) {
	const response = await fetch(this.serverBaseURL + '/setTopicList', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(topicList)
	});

	if (response.status == 200)
		renderCallback(topicList);
}