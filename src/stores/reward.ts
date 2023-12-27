import { defineStore } from 'pinia'

interface RewardState {
  id: string | null;
  productSearchTerm: string;
  rewardSearchTerm: string;
  exmlSnippet: string;
  recentSource: string;
}

export const useRewardStore = defineStore('reward', {
  state: (): RewardState => {
    return {
      id: null,
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