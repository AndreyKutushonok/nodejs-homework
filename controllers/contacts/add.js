const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  const addNewContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(addNewContact);
};

module.exports = add;
