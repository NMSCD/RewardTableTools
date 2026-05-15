import { defineStore } from 'pinia';
import { processEXML } from '@/logic/logic';

interface RewardState {
  productSearchTerm: string;
  rewardSearchTerm: string;
  exmlSnippet: string;
  activeSource: 'exml' | 'file';
  xmlDoc: {
    file: XMLDocument | null;
    exml: XMLDocument | null;
  };
}

export const useRewardStore = defineStore('reward', {
  state: (): RewardState => ({
    productSearchTerm: '',
    rewardSearchTerm: '',
    exmlSnippet: '',
    activeSource: 'file',
    xmlDoc: {
      file: null,
      exml: null,
    },
  }),

  actions: {
    setExml() {
      this.activeSource = 'exml';
    },

    setFile() {
      this.activeSource = 'file';
    },

    async readFile(file: File) {
      const contents = await file.text();
      this.setFile();
      this.textToDoc(typeof contents === 'string' ? contents : '');
    },

    textToDoc(text: string) {
      const activeContext = this.activeSource;
      this.xmlDoc[activeContext] = text ? processEXML(text) : null;
    },
  },
});
