import { defineStore } from 'pinia'

interface State {
	file: File | undefined;
	id: string | undefined;
	fileXmlDoc: Document | undefined;
	snippetXmlDoc: Document | undefined;
	productSearchTerm: string;
	rewardSearchTerm: string;
	exmlSnippet: string;
}


export const useRewardStore = defineStore('reward', {
	state: (): State => {
		return {
			file: undefined,
			id: undefined,
			fileXmlDoc: undefined,
			snippetXmlDoc: undefined,
			productSearchTerm: '',
			rewardSearchTerm: '',
			exmlSnippet: '',


		}
	},

	getters: {


	},

	actions: {

	}


})