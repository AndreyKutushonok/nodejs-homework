const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};
module.exports = getById;
