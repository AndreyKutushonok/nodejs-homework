const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const addNewContact = await Contact.create(req.body);
  res.status(201).json(addNewContact);
};

module.exports = add;
