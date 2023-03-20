import { ContactList } from './components/ContactList';
import { Outlet } from "react-router-dom";
import './ContactsApp.css';

function ContactsApp() {
  return (
    <div className="ContactsApp">
      <div className='contacts'>
        <ContactList></ContactList>
      </div>
      <div className='contact-details'>
          <Outlet />
        </div>
    </div>
  );
}

export default ContactsApp;
