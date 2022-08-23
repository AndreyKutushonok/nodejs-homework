const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const contactUpd = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contactUpd) {
    throw RequestError(404, "Not Found");
  }
  res.json(contactUpd);
};

module.exports = updateFavorite;
