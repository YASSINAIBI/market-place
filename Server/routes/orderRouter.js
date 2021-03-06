const router = require("express").Router();
const { addOrder, getAllOrders, getOrder } = require("../controllers/orderController");

router.post("/add", addOrder);
router.get("/getAll", getAllOrders);
router.get('/:id',getOrder)

module.exports = router;
