import Dexie, { Table } from 'dexie';
import { populate } from './populate';
import { Contact } from './Contact';

export class ContactsDB extends Dexie {
  contacts!: Table<Contact, number>;
  constructor() {
    super('contacts_app');
    this.version(1).stores({
      contacts: '++id, firstName, lastName, company, jobTitle, category, emailAddress, businessPhone, homePhone, mobilePhone, postalCode, faxNumber, notes, address, city, country, webPage'
    });
  }

  deleteContact(contactId: number) {
    return this.transaction('rw', this.contacts, () => {
      this.contacts.delete(contactId);
    });
  }
}

export const db = new ContactsDB();

db.on('populate', populate);

export function resetDatabase() {
  return db.transaction('rw', db.contacts, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    await populate();
  });
}
