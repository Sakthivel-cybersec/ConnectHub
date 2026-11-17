import { createContext, useContext, useState } from "react";
import { categoryContacts } from "../data/categoryData";

const ContactContext = createContext(null);

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState(categoryContacts);

  const addContact = (data) => {
    setContacts((prev) => [
      ...prev,
      { ...data, id: Date.now() },
    ]);
  };

  const updateContact = (id, data) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...data, id } : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts((prev) =>
      prev.filter((contact) => contact.id !== id)
    );
  };

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContacts must be used inside ContactProvider");
  }

  return context;
}
