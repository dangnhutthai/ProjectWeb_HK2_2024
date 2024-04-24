const ApiError = require("../api-error");
const ContactService = require("../services/staff.service");
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    if (!req.body?.msnv) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const {
            name
        } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).lenght == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));

    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (document != null) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({
            message: "Contact was updated successfully"
        });
    } catch (error) {
        return next(new ApiError(500, `Error updating contact with id=${req.params.id}`));
    }
};


exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (document != null) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({
            message: "Contact was deleted successfully"
        });
    } catch (error) {
        return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving favorite contacts"));
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};
exports.login = async (req, res, next) => {
    if(!req.body?.data?.msnv || !req.body?.data?.password){
        return next(new ApiError(400, "Thông tin đăng nhập còn trống"))
    }
    try {
        const staffService = new ContactService(MongoDB.client);
        const document = await staffService.login(req.body.data);
        if(!document){
            return (next(new ApiError(404, "Tài khoản không tồn tại")))
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(error.message));
    }
};