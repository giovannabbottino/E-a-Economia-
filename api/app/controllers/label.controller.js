const db = require("../models");
const Label = db.labels;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const label = {
        title: req.body.title,
        description: req.body.description,
    };

    // Save Label in the database
    Label.create(label)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Label."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.iLike]: `%${title}%`
        }
    } : null;

    Label.findAll({
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving labels."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Label.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Label with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Label.update(req.body, {
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Label was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Label with id=${id}. Maybe Label was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Label with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Label.destroy({
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Label was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Label with id=${id}. Maybe Label was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Label with id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Label.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Labels were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all labels."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Label.findAll({
        where: {
            published: true
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving labels."
            });
        });
};