import { useLiveQuery } from "dexie-react-hooks";
import Popup from "reactjs-popup";
import { db } from "../models/db";
import { ContactItem } from "./ContactItem";
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Contact } from "../models/Contact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export function ContactList() {
  let list = useLiveQuery(() => db.contacts.toArray());
  const [contacts, setcontacts] = useState(list);
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const closeAddContactModal = () => {
    reset({
      firstName: "",
      lastName: "",
      company: "",
      jobTitle: "",
      category: "",
      emailAddress: "",
      businessPhone: "",
      homePhone: "",
      mobilePhone: "",
      postalCode: "",
      faxNumber: "",
      notes: "",
      address: "",
      city: "",
      country: "",
      webPage: ""
    });
    setOpenAddContactModal(false)
  };
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const updateSearch = (event: any) => {
    let newContacts = (list || []).filter((item) =>
      item.firstName.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || item.lastName.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || `${item.lastName} ${item.firstName}`.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || `${item.firstName} ${item.lastName}`.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || item.company.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || item.jobTitle.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || item.emailAddress.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || item.mobilePhone.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || item.homePhone.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
      || item.businessPhone.trim().toLocaleLowerCase().includes(event.target.value.trim().toLocaleLowerCase())
    )
    setcontacts(newContacts)
  }

  const onSubmit = handleSubmit((data) => {
    let new_contact: Contact = {
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      jobTitle: data.jobTitle,
      category: data.category,
      emailAddress: data.emailAddress,
      businessPhone: data.businessPhone,
      homePhone: data.homePhone,
      mobilePhone: data.mobilePhone,
      postalCode: data.postalCode,
      faxNumber: data.faxNumber,
      notes: data.notes,
      address: data.address,
      city: data.city,
      country: data.country,
      webPage: data.webPage
    };
    db.contacts.add(new_contact).then(id => {
      closeAddContactModal(); 
      navigate(`${id}`)
    });

  });


  return (
    <div className="contacts-container">
      <div className="list-head">
        <input placeholder="Search" onChange={updateSearch} className="search-input" type="text" />
        <a className="add-button" onClick={() => setOpenAddContactModal(o => !o)}>
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </a>

      </div>
      <Popup modal open={openAddContactModal} closeOnDocumentClick onClose={closeAddContactModal}>
        <div>
          <h3 className="details-name">Add New Contact</h3>

          <form onSubmit={onSubmit}>
            <div className="part1-form">
              <div className="left-form">
                <label className="contact-input">
                  <span>First Name:</span>
                  <input required type="text" {...register('firstName')} />
                </label>
                <label className="contact-input">
                  <span>Last Name:</span>
                  <input required type="text" {...register('lastName')} />
                </label>
                <label className="contact-input">
                  <span>Company:</span>
                  <input required type="text" {...register('company')} />
                </label>
                <label className="contact-input">
                  <span>Job Title:</span>
                  <input required type="text" {...register('jobTitle')} />
                </label>
                <label className="contact-input">
                  <span>E-mail:</span>

                  <input type="text" {...register('emailAddress')} />
                </label>
                <label className="contact-input">
                  <span>Web Page:</span>
                  <input type="text" {...register('webPage')} />
                </label>
                <label className="contact-input">
                  <span>Category:</span>
                  <input type="text" {...register('category')} />
                </label>
              </div>
              <div className="right-form">
                <label className="contact-input">
                  <span>Business Phone:</span>
                  <input type="text" {...register('businessPhone')} />
                </label>
                <label className="contact-input">
                  <span>Home Phone:</span>
                  <input type="text" {...register('homePhone')} />
                </label>
                <label className="contact-input">
                  <span>Mobile Phone:</span>
                  <input type="text" {...register('mobilePhone')} />
                </label>
                <label className="contact-input">
                  <span>Fax Number:</span>
                  <input type="text" {...register('faxNumber')} />
                </label>
              </div>
            </div>
            <div className="part2-form">
              <div className="left-form">
                <br />
                <label className="contact-input">
                  <span>Street:</span>
                  <input type="text" {...register('address')} />
                </label>
                <label className="contact-input">
                  <span>City:</span>
                  <input type="text" {...register('city')} />
                </label>
                <label className="contact-input">
                  <span>Country:</span>
                  <input type="text" {...register('country')} />
                </label>
                <label className="contact-input">
                  <span>Postal Code:</span>
                  <input type="text" {...register('postalCode')} />
                </label>
              </div>
              <div className="right-form">
                <label className="contact-input">
                  <span>notes:</span>
                  <textarea {...register('notes')} />
                </label>

              </div>
            </div>
            <input className="submit-btn" type="submit" value="Submit" />
          </form>


        </div>
      </Popup>
      <div className="contact-list">
        {(contacts || list || []).map(item => (
          <ContactItem key={item.id} contact={item} />
        ))}
      </div>
    </div>

  );
}
