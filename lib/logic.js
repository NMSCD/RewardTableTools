let file, ID, fileXmlDoc, snippetXmlDoc;		// make these variables available to the entire file

function updateVar(element) {
	ID = element.value;
	searchReward(fileXmlDoc)
}

function readSingleFile(e) {
	file = e.files.item(0);

	if (!file) return;

	const reader = new FileReader();
	reader.onload = function (e) {
		const contents = e.target.result;
		if (!contents) return;
		fileXmlDoc = processEXML(contents)
		searchReward(fileXmlDoc)
	};
	reader.readAsText(file);
}

function processEXML(contents) {
	const parser = new DOMParser();
	return parser.parseFromString(contents, "text/xml");
}

// entry point for reward ID search
function searchRewardSection(inputElement, outputId, EXMLOutputId) {
	const xmlDoc = fileXmlDoc
	if (!xmlDoc) return;
	const input = inputElement.value;
	const reward = xmlDoc.querySelector(`[value="GcGenericRewardTableEntry.xml"] > [name="Id"][value=${input} i], [value="GcRewardTableEntry.xml"] > [name="Id"][value=${input} i]`)?.parentNode;
	if (!reward) return;
	rewardChances(reward, outputId, 'Reward ID chances', xmlDoc);
	SerialiseXML(reward, EXMLOutputId);
}

function searchReward(xmlDoc) {
	if (!(file && ID)) return;

	const elements = Array.from(xmlDoc.querySelectorAll(`*:not([name="InventoryClass"])[value="${ID}" i]`));

	if (!elements.length) return;

	const results = new Set();		// can't have duplicate values

	for (const element of elements) {
		const reward = element.closest('[value="GcGenericRewardTableEntry.xml"], [value="GcRewardTableEntry.xml"]')?.querySelector('[name="Id"]');
		if (!reward) return;
		results.add(reward);
	}

	document.getElementById("rewardList").innerHTML = '';

	for (const reward of results) {
		const result = `<li>${reward.getAttribute("value")}</li>`;
		document.getElementById("rewardList").insertAdjacentHTML("beforeend", result);
	}
}

function rewardChances(EXMLSection, outputId, inputType, xmlDoc) {
	if (!xmlDoc) return;

	const entries = Array.from(EXMLSection.querySelectorAll('[value="GcRewardTableItem.xml"]'));

	const IDs = [];
	const chances = [];
	const rewards = [];

	const selectors = ['ID', 'ProductList', 'Items', 'ProductIds', 'TechList', 'Currency', 'ProceduralProductCategory', 'Group', 'TechId', 'Event', 'Stat', 'Reward'];

	for (const entry of entries) {
		let type, output;
		for (const selector of selectors) {
			if (!entry.querySelector(`[name="${selector}"]`)) continue;
			type = selector;
			break;
		}

		switch (type) {
			case 'ID':
			case 'TechId':
			case 'Event':
				output = entry.querySelector(`[name="${type}"]`).getAttribute("value");
				break;

			case 'Items':
			case 'ProductIds':
			case 'ProductList':
			case 'TechList':
				const amount = entry.querySelector(`[name="${type}"]`).childElementCount;
				output = `List (${amount} entries)`;
				break;

			case 'ProceduralProductCategory':
				output = `ProcProd: ${entry.querySelector(`[name="${type}"]`).getAttribute("value")}`;
				break;

			case 'Group':
				output = `ProcTech: ${entry.querySelector(`[name="${type}"]`).getAttribute("value")}`;
				break;

			case 'Currency':
				output = entry.querySelectorAll(`[name="${type}"]`)[1].getAttribute("value");
				break;

			case 'Stat':
				const modify = entry.querySelectorAll(`[name="${type}"]`)[1].getAttribute("value");
				output = `${modify} stat: ${entry.querySelector(`[name="${type}"]`).getAttribute("value")}`;
				break;

			case 'Reward':
				output = entry.querySelector(`[name="${type}"]`).getAttribute("value");
				break;

			default:
				output = "Error";
		}
		IDs.push(output);

		const chance = entry.querySelector('[name="PercentageChance"]');
		if (chance) {
			chances.push(chance.getAttribute("value"));
		} else {
			chances.push("Error");
		}

		const reward = entry.querySelector('[name="Reward"]');
		if (reward) {
			rewards.push(reward.getAttribute("value"));
		} else {
			rewards.push("Error");
		}
	}

	if (!(IDs.length === chances.length && IDs.length === rewards.length)) {
		console.log("ERROR");
		document.getElementById(outputId).parentElement.parentElement.style.display = 'block';
		document.getElementById(outputId).innerText = "[ERROR: Array length doesn't match] Something went wrong. Please send the Reward Id to Lenni#4423 on Discord. A hard page reload might be required to regain functionality.";
		return;
	}

	document.getElementById(outputId).innerHTML = '';

	for (let i = 0; i < IDs.length; i++) {
		const itemId = IDs[i];
		const chance = (EXMLSection.querySelector('[name="RewardChoice"]')?.getAttribute("value") == 'GiveAll') ? parseFloat(chances[i]) : (chances[i] / (chances.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 100));
		const rewardType = rewards[i];

		const output = `<div>${i + 1}.</div><div>${rewardType}</div><div>${itemId}</div><div>${chance.toFixed(3)}%</div>`;
		document.getElementById(outputId).insertAdjacentHTML("beforeend", output);
	}
	document.getElementById("chancesInputType").innerText = inputType;
}

function SerialiseXML(EXMLSection, EXMLOutputId) {
	const serializer = new XMLSerializer();
	const xmlStr = serializer.serializeToString(EXMLSection);
	document.getElementById(EXMLOutputId).innerText = xmlStr;
}

function searchSnippet(input, outputId) {
	const EXML = input.value;
	if (!EXML) return;
	snippetXmlDoc = processEXML(EXML);		// populate xmlDoc variable
	rewardChances(snippetXmlDoc, outputId, 'Chances from EXML snippet', snippetXmlDoc);
}

function reset() {
	const inputs = document.querySelectorAll('input[type="text"], textarea');
	for (const input of inputs) {
		input.value = '';
	}

	const outputs = document.querySelectorAll('#output *:not(label)[id]')
	for (const output of outputs) {
		output.innerHTML = '';
	}
}