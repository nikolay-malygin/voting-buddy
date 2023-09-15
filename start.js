import { VotingDAO } from "./modules/VotingDAO.js";
import { VotingModel } from "./modules/VotingModel.js";
import { VotingView } from "./modules/VotingView.js";

function start() {
	const dao = new VotingDAO();
	const view = new VotingView('topicInputField', 'create-topic-btn', 'table-body');
	const model = new VotingModel(view, dao);

	model.bind();
}

start();