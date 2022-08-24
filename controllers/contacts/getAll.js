const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const allContacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(allContacts);
};

module.exports = getAll;
