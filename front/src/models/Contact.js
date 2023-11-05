class Contact {
  /**@param {Partial<Contact>} contact */
  constructor(contact) {
    /** @type {string} */
    this.email = contact.email
    /** @type {string[]} */
    this.phones = contact.phones || []
    /** @type {string} */
    this.name = contact.name
  }
}

export default Contact