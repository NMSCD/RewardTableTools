import { type DataTable } from 'src/types/table';
import { buildTable, constructData } from './tableBuilder';

export function processEXML(contents: string) {
	const parser = new DOMParser();
	return parser.parseFromString(contents, "text/xml");
}

/**
 * searches the EXML section for a given reward and returns its DOM element
 */
export function searchRewardSection(xmlDoc: XMLDocument | undefined, rewardId: string): Element | undefined {
	if (!xmlDoc) return;
	const xmlSectionDom = xmlDoc.querySelector(`[value="GcGenericRewardTableEntry.xml"] > [name="Id"][value=${rewardId} i], [value="GcRewardTableEntry.xml"] > [name="Id"][value=${rewardId} i]`)?.parentNode as Element | undefined;
	return xmlSectionDom;
}

export function rewardChances(EXMLSection: XMLDocument | Element, productSearchTerm: string) {
	const table: DataTable[] = [];

	if (EXMLSection.parentNode?.querySelector('[value="GcRewardTableEntry.xml"]') || EXMLSection.querySelector('[value="GcRewardTableEntry.xml"]')) {
		const rarityElements: HTMLCollection | undefined | null = EXMLSection?.querySelector('[name="Rarities"]')?.children;
		if (!rarityElements) return;
		const rarities = Array.from(rarityElements)

		for (const rarity of rarities) {
			const sizeElements = rarity?.querySelector('[name="Sizes"]')?.children;
			if (!sizeElements) continue;
			const sizes = Array.from(sizeElements);
			const rarityName = rarity.getAttribute("name");
			if (!rarityName) continue;
			const rarityHeader: DataTable = {
				htmlClass: 'rarity',
				content: rarityName
			}
			table.push(rarityHeader);

			for (const size of sizes) {
				const sizeName = size.getAttribute("name");
				if (!sizeName) continue;
				const rewardData = getRewards(size);

				if (!rewardData.IDs.length) continue;

				const sizeHeader: DataTable = {
					htmlClass: 'size',
					content: sizeName,
				}
				const tablePart = buildTable(rewardData, productSearchTerm);
				table.push(sizeHeader, ...tablePart)
			}
		}
	} else {
		const rewardData = getRewards(EXMLSection);
		const tablePart = buildTable(rewardData, productSearchTerm);
		table.push(...tablePart);
	}
	return table;
}

/**
 * Traverses the XML tree of one specific GcGenericRewardTableEntry and gets all the GcRewardTableItems and their data
 */
function getRewards(EXMLSection: Element | XMLDocument) {
	const entries = Array.from(EXMLSection.querySelectorAll('[value="GcRewardTableItem.xml"]'));

	const IDs: string[] = [];
	const chances: string[] = [];
	const rewards: string[] = [];

	const selectors = ['ID', 'ProductList', 'Items', 'ProductIds', 'TechList', 'Currency', 'ProceduralProductCategory', 'Group', 'TechId', 'Event', 'Stat', 'CreatureID', 'ProductID', 'Reward'];

	for (const entry of entries) {
		let type, output;
		for (const selector of selectors) {
			if (!entry?.querySelector(`[name="${selector}"]`)) continue;
			type = selector;
			break;
		}

		const selector = `[name="${type}"]`;

		switch (type) {
			case 'ID':
			case 'TechId':
			case 'Event':
				output = getValue(entry, selector);
				break;

			case 'Items':
			case 'ProductIds':
			case 'ProductList':
			case 'TechList':
				const amount = entry?.querySelector(selector)?.childElementCount;
				output = `List (${amount} entries)`;
				break;

			case 'ProceduralProductCategory':
				output = `ProcProd: ${getValue(entry, selector)}`;
				break;

			case 'Group':
				output = `ProcTech: ${getValue(entry, selector)}`;
				break;

			case 'CreatureID':
				output = `CreatureEgg: ${getValue(entry, selector)}`;
				break;

			case 'ProductID':
				output = `SeasonReward: ${getValue(entry, selector)}`;
				break;

			case 'Currency':
				output = entry?.querySelectorAll(selector)[1]?.getAttribute("value");
				break;

			case 'Stat':
				const modify = entry?.querySelectorAll('[name="ModifyType"]')[1]?.getAttribute("value");
				output = `${modify} stat: ${getValue(entry, selector)}`;
				break;

			case 'Reward':
				output = getValue(entry, selector);
				break;

			default:
				output = "Error";
		}
		if (output) IDs.push(output);

		const chanceElement = entry.querySelector('[name="PercentageChance"]');
		const chance = chanceElement?.getAttribute("value");
		chances.push(chance ?? 'Error');

		const rewardElement = entry.querySelector('[name="Reward"]');
		const reward = rewardElement?.getAttribute("value");
		rewards.push(reward ?? 'Error');
	}
	const data = constructData(EXMLSection, IDs, chances, rewards);
	return data;
}

function getValue(entry: Element, selector: string) {
	return entry?.querySelector(selector)?.getAttribute("value");
}

// function searchSnippet(input, outputId) {
// 	const EXML = input.value;
// 	if (!EXML) return;
// 	snippetXmlDoc = processEXML(EXML);		// populate xmlDoc variable
// 	rewardChances(snippetXmlDoc, outputId, 'Chances from EXML snippet', snippetXmlDoc);
// }

// function reset() {
// 	const inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> = document.querySelectorAll('input[type="text"], textarea');
// 	for (const input of inputs) {
// 		input.value = '';
// 	}

// 	const outputs = document.querySelectorAll('#output [id]')
// 	for (const output of outputs) {
// 		output.innerHTML = '';
// 	}
// }



// function checkDataIntegrity(data, outputId) {
// 	if (data.IDs.length === data.chances.length && data.IDs.length === data.rewards.length) {
// 		return true;
// 	} else {
// 		console.log("ERROR");
// 		document.getElementById(outputId).style.display = 'block';
// 		const button = `<button class="button" onclick="this.parentElement.style.display = ''; this.parentElement.innerHTML = '';">Restore Functionality</button>`
// 		document.getElementById(outputId).innerHTML = "[ERROR: Array length doesn't match] Something went wrong. Please send the Reward Id to Lenni#4423 on Discord. Click this button to regain page functionality." + button;
// 		return false;
// 	}
// }