export function VotingView(inputFieldID, createBtnID, tableBodyID)
{
	this.inputField = document.getElementById(inputFieldID);
	this.createTopicBtn = document.getElementById(createBtnID);
	this.tableBody = document.getElementById(tableBodyID);
}

VotingView.prototype.findTopicIdxByID = function (topicID, topicList) {
	for (let i = 0; i < topicList.length; i++)
		if (topicList[i].id == topicID)
			return i;

	return null;
}

VotingView.prototype.render = function(topicList) {
	this.tableBody.innerHTML = '';

	for (let i = 0; i < topicList.length; i++) {
		this.tableBody.innerHTML += this.createTableRow(topicList[i]);
	}
}

VotingView.prototype.createTableRow = function(topic) {
	return `
	<tr>
		<td scope="row" class="ps-4">${topic.votes}</td>
		<td colspan="1">${topic.title}</td>
		<td class="px-0"><i data-topicid="${topic.id}" class="fa-solid fa-circle-arrow-up fa-lg py-3 px-2 rounded-3 blue-color voteup"></i></td>
		<td class="px-0"><i data-topicid="${topic.id}" class="fa-solid fa-circle-arrow-down fa-lg py-3 px-2 rounded-3 red-color votedown"></i></td>
	</tr>
	`;
}

VotingView.prototype.renderWithAnimation = function(topicList) {
	let rows = Array.from(this.tableBody.querySelectorAll('tr'));

	for(let i = 0; i < topicList.length - 1; i++)
	{
		let currentRow = rows[i];
		let nextRow = rows[i + 1];

		let currentTopicID = rows[i].querySelector('i').dataset.topicid;
		let nextTopicID = rows[i + 1].querySelector('i').dataset.topicid;

		if(i != this.findTopicIdxByID(currentTopicID, topicList) &&
			 i+1 != this.findTopicIdxByID(nextTopicID, topicList)) {
			currentRow.style = 'transform: translateY(+100%)';
			nextRow.style = 'transform: translateY(-100%)';
		}

		setTimeout(() => {
			this.render(topicList);
		}, 300);
	}
}

VotingView.prototype.bind = function(addTopic, voteUp, voteDown, getTopics)
{
	document.addEventListener('DOMContentLoaded', () => {
		getTopics(this.render.bind(this));

		setInterval(() => {
			getTopics(this.renderWithAnimation.bind(this));
		}, 3500);
	});

	this.createTopicBtn.onclick = (event) => {
		event.preventDefault();
		if (this.inputField.value.length >= 3)
		addTopic(this.inputField.value, this.render.bind(this));
	}

	// Event Delegation vote up/down
	this.tableBody.onclick = (event) => {
		let voteUpBtn = event.target.closest('.voteup');
		let voteDownBtn = event.target.closest('.votedown');

		if(voteUpBtn && this.tableBody.contains(voteUpBtn)) {
			voteUp(voteUpBtn.dataset.topicid, this.renderWithAnimation.bind(this));
		}

		if(voteDownBtn && this.tableBody.contains(voteDownBtn)) {
			voteDown(voteDownBtn.dataset.topicid, this.renderWithAnimation.bind(this));
		}
	}
}
