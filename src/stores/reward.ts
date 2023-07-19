import { defineStore } from 'pinia'

interface RewardState {
	id: string | undefined;
	productSearchTerm: string;
	rewardSearchTerm: string;
	exmlSnippet: string;
	recentSource: string;
}

export const useRewardStore = defineStore('reward', {
	state: (): RewardState => {
		return {
			id: undefined,
			productSearchTerm: '',
			rewardSearchTerm: '',
			exmlSnippet: '',
			recentSource: '',
		}
	},

	getters: {


	},

	actions: {
		setExml() {
			this.recentSource = 'exml'
		},

		setFile() {
			this.recentSource = 'file';
		}
	}
})