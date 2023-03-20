import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';
import { Contact } from '../models/Contact';
import {  NavLink } from 'react-router-dom';


interface Props {
  contact: Contact;
}

export function ContactItem({ contact }: Props) {
  const items = useLiveQuery(
    () => db.contacts.where({ id: contact.id }).toArray(),
    [contact.id]
  );

  if (!items) return null;

  return (
    <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} to={`${contact.id}`}>
      <div className="box">
        <div className="grid-row">
          <div>
            <strong className="contact-name">{contact.firstName} {contact.lastName}</strong> ({contact.emailAddress})
          </div>
          <span>{contact.jobTitle}</span> | <span>{contact.company}</span>
        </div>
      </div>
    </NavLink>
  );
}
