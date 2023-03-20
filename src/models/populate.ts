import { db } from "./db";

export async function populate() {
  await db.contacts.bulkAdd([
  ]);
}
