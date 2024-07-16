export const validIds: string[] = [];

export async function getItemData(gameId: string) {
  if (!validIds.includes(gameId)) return null; // NoSonar this is not empty here, because the array is modified in another file
  try {
    const res = await fetch(`https://api.nmsassistant.com/ItemInfo/GameId/${gameId}/en`);
    const data: unknown = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
