
import { useParams } from "react-router-dom";
import { db } from "./models/db";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { Contact } from "./models/Contact";

export async function loader({ params }: { params: any }) {
  const contact = await db.contacts.get(parseInt(params.contactId));
  return { contact };
}

export default function ContactDetails() {
  let { contactId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { contact } = useLoaderData() as { contact: Contact };

  const closeUpdateContactModal = () => {
    setOpenUpdateContactModal(false);
    reset(contact);
  };

  const onSubmit = handleSubmit((data) => {
    db.contacts.update(parseInt(contactId || '0'), data);
    contact.firstName = data.firstName;
    contact.lastName = data.lastName;
    contact.company = data.company;
    contact.jobTitle = data.jobTitle;
    contact.category = data.category;
    contact.emailAddress = data.emailAddress;
    contact.businessPhone = data.businessPhone;
    contact.homePhone = data.homePhone;
    contact.mobilePhone = data.mobilePhone;
    contact.postalCode = data.postalCode;
    contact.faxNumber = data.faxNumber;
    contact.notes = data.notes;
    contact.address = data.address;
    contact.city = data.city;
    contact.country = data.country;
    contact.webPage = data.webPage;
    closeUpdateContactModal();
  });

  const [openUpdateContactModal, setOpenUpdateContactModal] = useState(false);


  return (
    <div className="contact-details-container">
      <div className="details-header">
        <strong className="details-name">{contact?.lastName} {contact?.firstName} (ID: {contactId})</strong>
        <div className="contact-actions">
          Actions:
          <span title="Edit Contact" onClick={() => { setOpenUpdateContactModal(o => !o); reset(contact); }}>
            <FontAwesomeIcon icon={faPen} />
          </span>
          <Popup modal
            open={openUpdateContactModal}
            position="right center"
            closeOnDocumentClick
            onClose={closeUpdateContactModal}
          >
            <h3>Update Contact</h3>
            <form onSubmit={onSubmit}>
              <div className="part1-form">
                <div className="left-form">
                  <label className="contact-input">
                    <span>First Name:</span>
                    <input required type="text" {...register('firstName')} defaultValue={contact?.firstName} />
                  </label>
                  <label className="contact-input">
                    <span>Last Name:</span>
                    <input required type="text" {...register('lastName')} defaultValue={contact?.lastName} />
                  </label>
                  <label className="contact-input">
                    <span>Company:</span>
                    <input required type="text" {...register('company')} defaultValue={contact?.company} />
                  </label>
                  <label className="contact-input">
                    <span>Job Title:</span>
                    <input required type="text" {...register('jobTitle')} defaultValue={contact?.jobTitle} />
                  </label>
                  <label className="contact-input">
                    <span>E-mail:</span>

                    <input type="text" {...register('emailAddress')} defaultValue={contact?.emailAddress} />
                  </label>
                  <label className="contact-input">
                    <span>Web Page:</span>
                    <input type="text" {...register('webPage')} defaultValue={contact?.webPage} />
                  </label>
                  <label className="contact-input">
                    <span>Category:</span>
                    <input type="text" {...register('category')} defaultValue={contact?.category} />
                  </label>
                </div>
                <div className="right-form">
                  <label className="contact-input">
                    <span>Business Phone:</span>
                    <input type="text" {...register('businessPhone')} defaultValue={contact?.businessPhone} />
                  </label>
                  <label className="contact-input">
                    <span>Home Phone:</span>
                    <input type="text" {...register('homePhone')} defaultValue={contact?.homePhone} />
                  </label>
                  <label className="contact-input">
                    <span>Mobile Phone:</span>
                    <input type="text" {...register('mobilePhone')} defaultValue={contact?.mobilePhone} />
                  </label>
                  <label className="contact-input">
                    <span>Fax Number:</span>
                    <input type="text" {...register('faxNumber')} defaultValue={contact?.faxNumber} />
                  </label>
                </div>
              </div>
              <div className="part2-form">
                <div className="left-form">
                  <br />
                  <label className="contact-input">
                    <span>Street:</span>
                    <input type="text" {...register('address')} defaultValue={contact?.address} />
                  </label>
                  <label className="contact-input">
                    <span>City:</span>
                    <input type="text" {...register('city')} defaultValue={contact?.city} />
                  </label>
                  <label className="contact-input">
                    <span>Country:</span>
                    <input type="text" {...register('country')} defaultValue={contact?.country} />
                  </label>
                  <label className="contact-input">
                    <span>Postal Code:</span>
                    <input type="text" {...register('postalCode')} defaultValue={contact?.postalCode} />
                  </label>
                </div>
                <div className="right-form">
                  <label className="contact-input">
                    <span>notes:</span>
                    <textarea {...register('notes')} defaultValue={contact?.notes} />
                  </label>

                </div>
              </div>
              <input className="submit-btn" type="submit" value="Submit" />
            </form>
          </Popup>

          <Popup modal
            trigger={open => (
              <span title="Delete Contact">
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
            )}
            position="right center"
            closeOnDocumentClick
          >
            <h3>Are you sure?</h3>
            <button className="confirm-btn" onClick={() => { db.deleteContact(contact?.id || 0); navigate("/contacts"); }} title="Delete Contact">
              Comfirm Delete
            </button>
          </Popup>

        </div>
      </div>

      <div>
        <div className="part1-form">
          <div className="left-form">
            <label className="contact-infor">
              <span>First Name:</span>
              <span>{contact?.firstName}</span>
            </label>
            <label className="contact-infor">
              <span>Last Name:</span>
              <span>{contact?.lastName}</span>
            </label>
            <label className="contact-infor">
              <span>Company:</span>
              <span>{contact?.company}</span>
            </label>
            <label className="contact-infor">
              <span>Job Title:</span>
              <span>{contact?.jobTitle}</span>
            </label>
            <label className="contact-infor">
              <span>E-mail:</span>
              <span>{contact?.emailAddress}</span>
            </label>
            <label className="contact-infor">
              <span>Web Page:</span>
              <span>{contact?.webPage}</span>
            </label>
            <label className="contact-infor">
              <span>Category:</span>
              <span>{contact?.category}</span>
            </label>
          </div>
          <div className="right-form">
            <label className="contact-infor">
              <span>Business Phone:</span>
              <span>{contact?.businessPhone}</span>
            </label>
            <label className="contact-infor">
              <span>Home Phone:</span>
              <span>{contact?.homePhone}</span>
            </label>
            <label className="contact-infor">
              <span>Mobile Phone:</span>
              <span>{contact?.mobilePhone}</span>
            </label>
            <label className="contact-infor">
              <span>Fax Number:</span>
              <span>{contact?.faxNumber}</span>
            </label>
          </div>
        </div>
        <div className="part2-form">
          <div className="left-form"><br />
            <label className="contact-infor">
              <span>Street:</span>
              <span>{contact?.address}</span>
            </label>
            <label className="contact-infor">
              <span>City:</span>
              <span>{contact?.city}</span>
            </label>
            <label className="contact-infor">
              <span>Country:</span>
              <span>{contact?.country}</span>
            </label>
            <label className="contact-infor">
              <span>Postal Code:</span>
              <span>{contact?.postalCode}</span>
            </label>
          </div>
          <div className="right-form">
            <label className="contact-infor">
              <span>Notes</span>
              <span className="infor-notes">{contact?.notes}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}