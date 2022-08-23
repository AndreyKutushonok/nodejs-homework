const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(contactId);
  if (!deleteContact) {
    throw RequestError(404, "Not Found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeById;
