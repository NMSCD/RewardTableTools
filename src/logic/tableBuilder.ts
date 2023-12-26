import type { DataTable } from "@/types/table";

export function buildTable(data: { IDs: string[], chances: string[], rewards: string[] }, productSearchTerm: string): DataTable[] {
  const table: DataTable[] = [];
  for (let i = 0; i < data.IDs.length; i++) {
    const rewardNr = (i + 1).toString();
    const itemId = data.IDs[i];
    const chance = data.chances[i];
    const rewardType = data.rewards[i];

    const itemData = {
      itemId,
      rewardType,
      chance: chance + '%',
      rewardNr: rewardNr + '.',
    }

    const isSearchedItem = itemId.toLowerCase() === productSearchTerm?.toLowerCase();
    const tableRow: DataTable[] = [];
    for (const content of Object.values(itemData)) {
      const tableItem: DataTable = {
        content,
      }
      if (isSearchedItem) tableItem.htmlClass = 'mark';

      tableRow.push(tableItem);
    }
    table.push(...tableRow);
  }
  return table;
}

export function constructData(EXMLSection: XMLDocument | Element, IDs: string[], chances: string[], rewards: string[]) {
  const data = {
    "IDs": IDs,
    "chances": calculateChances(EXMLSection, chances),
    "rewards": rewards
  }
  return data;
}

function calculateChances(EXMLSection: XMLDocument | Element, PercentageChances: string[]) {
  if (EXMLSection.querySelector('[name="RewardChoice"]')?.getAttribute("value") === 'GiveAll') return PercentageChances;

  const calculatedChances: string[] = [];
  const chances = PercentageChances.map(Number);

  for (const chance of chances) {
    const calcChance = chance / (chances.reduce((a, b) => a + b, 0) / 100);		// NoSonar this is calculating a percentage
    const decimals = 3;
    calculatedChances.push(calcChance.toFixed(decimals));
  }
  return calculatedChances;
}