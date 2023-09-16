
export function VotingView(inputFieldID, createBtnID, tableBodyID)
{
	this.inputField = document.getElementById(inputFieldID);
	this.createTopicBtn = document.getElementById(createBtnID);
	this.tableBody = document.getElementById(tableBodyID);
}

VotingView.prototype.render = function(topicList) {
	this.tableBody.innerHTML = '';

	for (let i = 0; i < topicList.length; i++) {
		this.tableBody.innerHTML += `
		<tr>
			<td scope="row" class="ps-4">${topicList[i].votes}</td>
			<td colspan="1">${topicList[i].title}</td>
			<td class="px-0"><i data-topicid="${topicList[i].id}" class="fa-solid fa-circle-arrow-up fa-lg py-3 px-2 rounded-3 blue-color voteup"></i></td>
			<td class="px-0"><i data-topicid="${topicList[i].id}" class="fa-solid fa-circle-arrow-down fa-lg py-3 px-2 rounded-3 red-color votedown"></i></td>
		</tr>
		`;
	}
}

VotingView.prototype.bind = function(addTopic, voteUp, voteDown, getTopics)
{
	document.addEventListener('DOMContentLoaded', () => {
		getTopics(this.render.bind(this));

		setInterval(() => {
			getTopics(this.render.bind(this));
		}, 3000);
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
			voteUp(voteUpBtn.dataset.topicid, this.render.bind(this));
		}

		if(voteDownBtn && this.tableBody.contains(voteDownBtn)) {
			voteDown(voteDownBtn.dataset.topicid, this.render.bind(this));
		}
	}

}
