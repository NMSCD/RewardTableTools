const validIds: string[] = [];

try {
  const idResponse = await fetch('https://api.nmsassistant.com/ItemInfo/GameId');
  const idResponseJson: unknown = await idResponse.json();
  if (Array.isArray(idResponseJson)) validIds.push(...idResponseJson);
} catch (error) {
  console.error(error);
}

export async function getItemData(gameId: string) {
  if (!validIds.includes(gameId)) return null;
  try {
    const res = await fetch(`https://api.nmsassistant.com/ItemInfo/GameId/${gameId}/en`);
    const data: unknown = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
