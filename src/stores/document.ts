import { processEXML } from 'src/logic/logic';
import { defineStore } from 'pinia'

interface DocumentState {
	fileXmlDoc: XMLDocument | null;
}

export const useDocumentStore = defineStore('document', {
	state: (): DocumentState => {
		return {
			fileXmlDoc: null,
		}
	},

	actions: {
		readFile(file: File) {
			const reader = new FileReader();
			reader.readAsText(file);
			reader.onload = (e) => {
				const contents = e.target?.result;
				this.fileXmlDoc = typeof contents === 'string' ? processEXML(contents) : null;
			}
		},
	}
})