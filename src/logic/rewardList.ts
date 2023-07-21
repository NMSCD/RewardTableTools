/**
 * returns list of rewards that reward a specific product
 */
export function searchReward(xmlDoc: XMLDocument, ID: string) {
	const elements: Element[] = Array.from(xmlDoc.querySelectorAll(`*:not([name="InventoryClass"])[value="${ID}" i]`));

	if (!elements.length) return;

	const results = new Set<Element>();		// can't have duplicate values

	for (const element of elements) {
		const reward = element.closest('[value="GcGenericRewardTableEntry.xml"], [value="GcRewardTableEntry.xml"]')?.querySelector('[name="Id"]');
		if (reward) results.add(reward);
	}

	const resultArray: { [key: string]: string }[] = [];

	for (const reward of results) {
		const result = reward.getAttribute('value');
		if (!result) continue;
		const returnObj = {
			value: result
		}
		resultArray.push(returnObj);
	}
	return resultArray;
}