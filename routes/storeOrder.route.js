const router = require("express").Router();
const { body } = require("express-validator");
const {
  storeOrderList,
  storeOrderDetails,
  storeOrderCreate,
  storeOrderUpdate,
  storeOrderDelete,
} = require("../controllers/storeOrder.controller");
const { pageAuthorisation } = require("../middleware/authorization");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");

// SuperAdmin: list all orders
router.get("/", pageAuthorisation(["SuperAdmin"]), storeOrderList);

// SuperAdmin: order details
router.get("/:StoreOrderID", pageAuthorisation(["SuperAdmin"]), storeOrderDetails);

// ClientAdmin, Center, Therapist: place an order
router.post(
  "/",
  pageAuthorisation(["ClientAdmin", "Center", "Therapist"]),
  [
    body("ProductID").isNumeric().withMessage("ProductID must be a number").trim(),
    body("Quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1").trim(),
    body("ShippingAddress").not().isEmpty().withMessage("ShippingAddress is required").trim(),
    body("ContactName").not().isEmpty().withMessage("ContactName is required").trim(),
    body("Phone").not().isEmpty().withMessage("Phone is required").trim(),
  ],
  validateRequestSchema,
  storeOrderCreate
);

// SuperAdmin: update order status
router.put(
  "/:StoreOrderID",
  pageAuthorisation(["SuperAdmin"]),
  [
    body("OrderStatus").not().isEmpty().withMessage("OrderStatus is required").trim(),
  ],
  validateRequestSchema,
  storeOrderUpdate
);

// SuperAdmin: delete an order
router.delete("/:StoreOrderID", pageAuthorisation(["SuperAdmin"]), storeOrderDelete);

module.exports = router;
