import { processEXML } from 'src/logic/logic';
import { defineStore } from 'pinia'

interface DocumentState {
	fileXmlDoc: XMLDocument | undefined;
}

export const useDocumentStore = defineStore('document', {
	state: (): DocumentState => {
		return {
			fileXmlDoc: undefined,
		}
	},

	actions: {
		readFile(element: HTMLInputElement) {
			if (!element?.files) return;

			const file = element.files[0];
			if (!file) return;

			const reader = new FileReader();
			reader.readAsText(file);
			reader.onload = (e) => {
				const contents = e.target?.result;
				this.fileXmlDoc = typeof contents === 'string' ? processEXML(contents) : undefined;
			}
		},
	}
})