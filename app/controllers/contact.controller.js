const { ObjectId } = require("mongodb");
const ContactService = require("../services/contact.service");

// CREATE
exports.create = async (req, res, next) => {
  try {
    if (!req.body?.name) {
      return res.status(400).send({
        message: "Name is required",
      });
    }

    const contactService = new ContactService(req.app.get("dbClient"));
    const document = await contactService.create(req.body);

    return res.send(document);
  } catch (error) {
    return next(error);
  }
};

// FIND ALL
exports.findAll = async (req, res, next) => {
  try {
    const contactService = new ContactService(req.app.get("dbClient"));
    const name = req.query.name?.trim();

    const documents = name
      ? await contactService.findByName(name)
      : await contactService.find({});

    return res.send(documents);
  } catch (error) {
    return next(error);
  }
};

// FIND ONE
exports.findOne = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid contact ID" });
    }

    const contactService = new ContactService(req.app.get("dbClient"));
    const document = await contactService.findById(req.params.id);

    if (!document) {
      return res.status(404).send({ message: "Contact not found" });
    }

    return res.send(document);
  } catch (error) {
    return next(error);
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid contact ID" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Data to update cannot be empty",
      });
    }

    const contactService = new ContactService(req.app.get("dbClient"));
    const document = await contactService.update(req.params.id, req.body);

    if (!document) {
      return res.status(404).send({
        message: "Contact not found",
      });
    }

    return res.send(document);
  } catch (error) {
    return next(error);
  }
};

// DELETE ONE
exports.delete = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid contact ID" });
    }

    const contactService = new ContactService(req.app.get("dbClient"));
    const document = await contactService.delete(req.params.id);

    if (!document) {
      return res.status(404).send({
        message: "Contact not found",
      });
    }

    return res.send({ message: "Contact deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

// DELETE ALL
exports.deleteAll = async (req, res, next) => {
  try {
    const contactService = new ContactService(req.app.get("dbClient"));
    const deletedCount = await contactService.deleteAll();

    return res.send({
      message: `${deletedCount} contacts were deleted`,
    });
  } catch (error) {
    return next(error);
  }
};

// FAVORITE
exports.findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService(req.app.get("dbClient"));
    const documents = await contactService.findFavorite();

    return res.send(documents);
  } catch (error) {
    return next(error);
  }
};