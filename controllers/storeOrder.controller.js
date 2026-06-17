const {
  storeOrderList,
  storeOrderDetails,
  storeOrderCreate,
  storeOrderUpdate,
  storeOrderDelete,
} = require("../services/storeOrder.service");

const VALID_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

exports.storeOrderList = (req, res) => {
  storeOrderList((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { data: results } });
  });
};

exports.storeOrderDetails = (req, res) => {
  const StoreOrderID = req.params.StoreOrderID;
  storeOrderDetails(StoreOrderID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { data: results } });
  });
};

exports.storeOrderCreate = (req, res) => {
  const data = {
    ...req.body,
    UserID: req.userData.UserID,
  };
  storeOrderCreate(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(201).send({ success: true, results: { message: results } });
  });
};

exports.storeOrderUpdate = (req, res) => {
  const { OrderStatus } = req.body;
  if (!VALID_STATUSES.includes(OrderStatus)) {
    return res.status(400).send({
      success: false,
      errors: { message: `OrderStatus must be one of: ${VALID_STATUSES.join(", ")}` },
    });
  }
  const data = {
    StoreOrderID: req.params.StoreOrderID,
    OrderStatus,
    UserID: req.userData.UserID,
  };
  storeOrderUpdate(data, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { message: results } });
  });
};

exports.storeOrderDelete = (req, res) => {
  const StoreOrderID = req.params.StoreOrderID;
  storeOrderDelete(StoreOrderID, (error, results, status) => {
    if (error) {
      console.log(error);
      return res.status(status || 500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({ success: true, results: { message: results } });
  });
};
