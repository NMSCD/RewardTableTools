import { defineStore } from 'pinia'

interface RewardState {
	id: string | undefined;
	productSearchTerm: string;
	rewardSearchTerm: string;
	exmlSnippet: string;
	hasResult: boolean;
}

export const useRewardStore = defineStore('reward', {
	state: (): RewardState => {
		return {
			id: undefined,
			productSearchTerm: '',
			rewardSearchTerm: '',
			exmlSnippet: '',
			hasResult: false,

		}
	},

	getters: {


	},

	actions: {
		updateProductId(newId: string) {
			this.productSearchTerm = newId;
		},

		updateRewardId(newId: string) {
			this.rewardSearchTerm = newId;
		},

		setActive() {
			this.hasResult = true;
		}
	}
})