import { processEXML } from '@/logic/logic';
import { defineStore } from 'pinia';

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

    readFile(file: File) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.setFile();
        const contents = e.target?.result;
        this.textToDoc(typeof contents === 'string' ? contents : '');
      };
    },

    textToDoc(text: string) {
      const activeContext = this.activeSource;
      this.xmlDoc[activeContext] = text ? processEXML(text) : null;
    },
  },
});
