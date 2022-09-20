const express = require("express");
const router = express.Router();

const contacts = require("../../models/contacts");
const {
  addContactValidation,
} = require("../../midlewares/validationMidleware");

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts();
    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contacts.getContactById(contactId);
    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  
  try {
    const listContacts = await contacts.listContacts();
    const addNewContact = await contacts.addContact(req.body);
    if (listContacts.find((el) => el.email === req.body.email)) {
      return res.status(409).json({
        message:
          "Contact can not be added! Contact with this email was created before",
      });
    }
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: "missing required field" });
    }
    res.status(201).json(addNewContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contacts.getContactById(contactId);

    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    } else {
      await contacts.removeContact(contactId);
      return res.status(204).json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", addContactValidation, async (req, res, next) => {
  
  try {
    const { contactId } = req.params;
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const updateContactById = await contacts.updateContact(contactId, req.body);
    res.status(200).json(updateContactById);
  } catch (error) {
    next(error);
  }
});

module.exports = router;