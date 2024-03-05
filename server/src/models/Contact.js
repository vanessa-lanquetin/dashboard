class Contact {
  /**@param {Partial<Contact>} contact */
  constructor(contact) {
    /** @type {string | undefined} */
    this.email = contact.email;
    /** @type {string[]} */
    this.phones = contact.phones || [];
    /** @type {string | undefined} */
    this.name = contact.name;
  }
}

module.exports = Contact