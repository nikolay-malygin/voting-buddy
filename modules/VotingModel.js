import { Topic } from "./Topic.js";

export function VotingModel (votingView, votingDAO) {
	this.topicList = [];
	this.votedTopics = [];
	this.votingDao = votingDAO;
	this.votingView = votingView;
}

VotingModel.prototype.setVotedTopics = function (votedTopics) {
	localStorage.setItem("votedTopics", JSON.stringify(votedTopics));
	return;
}

VotingModel.prototype.getVotedTopics = function () {
	return JSON.parse(localStorage.getItem("votedTopics"));
}

VotingModel.prototype.bind = function() {
	this.setVotedTopics([]);

	this.votingView.bind(
		this.addTopic.bind(this),
		this.voteUp.bind(this),
		this.voteDown.bind(this),
		this.getTopicList.bind(this),
		this.getVotedTopics.bind(this)
	);
}

VotingModel.prototype.setTopicList = function(topicList, renderCallback) {
	this.topicList = topicList;
	renderCallback(this.topicList);
}

VotingModel.prototype.getTopicList = function(renderCallback) {
	this.votingDao.getTopicList(this.setTopicList.bind(this), renderCallback);
}

VotingModel.prototype.addTopic = function (topic, renderCallback) {
	this.topicList.push(new Topic(this.topicList.length, topic, 0));
	this.votingDao.setTopics(this.topicList, renderCallback);
}

VotingModel.prototype.voteUp = function (topicID, renderCallback) {
	this.votedTopics.push(topicID);
	this.setVotedTopics(this.votedTopics);

	this.topicList[this.findTopicIdxByID(topicID)].votes += 1;
	this.sort();
	this.votingDao.setTopics(this.topicList, renderCallback);
}

VotingModel.prototype.voteDown = function (topicID, renderCallback) {
	this.votedTopics.push(topicID);
	this.setVotedTopics(this.votedTopics);

	this.topicList[this.findTopicIdxByID(topicID)].votes -= 1;
	this.sort();
	this.votingDao.setTopics(this.topicList, renderCallback);
}

VotingModel.prototype.sort = function() {
	this.topicList.sort(function(a, b) {
		return b.votes - a.votes;
	});
}

// Helper func.: Find id of the topic in the list by ID of the topic
VotingModel.prototype.findTopicIdxByID = function (topicID) {
	for (let i = 0; i < this.topicList.length; i++)
	if (this.topicList[i].id == topicID)
	return i;

	return null;
}




