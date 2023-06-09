const express = require("express");

const ticketController = require('../controllers/ticket')
const authMiddleware = require('../middleware/auth')

const router = express.Router();

//has /ticket filter
router.post("/add-ticket", authMiddleware.authenticate ,ticketController.postAddTicket);

router.get("/ticketspage", authMiddleware.authenticate ,ticketController.getTicketPage);

router.get("/ticketsCount", authMiddleware.authenticate ,ticketController.getTicketsCount);

module.exports = router;