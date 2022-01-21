const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  bookTicket,
  closeTicket,
  openTicket,
  cancelTicket,
  viewTicket,
  adminCancelTicket,
  resetTicket,
} = require("../controllers/ticket");
const { isSignIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
// router.param("ticketId", getTicketById);

router.post("/ticket/:userId", isSignIn, isAuthenticated, bookTicket);

// see all close_tickets
router.get(
  "/ticket/:userId/close_ticket",
  isSignIn,
  isAuthenticated,
  isAdmin,
  closeTicket
);

// see all open_tickets1
router.get(
  "/ticket/:userId/open_ticket",
  isSignIn,
  isAuthenticated,
  openTicket
);

// cancel ticket
router.delete(
  "/ticket/:userId/cancel_ticket/:seat_number",
  isSignIn,
  isAuthenticated,
  cancelTicket
);

// view ticket
router.get(
  "/ticket/:userId/view_ticket",
  isSignIn,
  isAuthenticated,
  viewTicket
);

//admin access to cancel single ticket
router.delete(
  "/admin/:userId/cancel_ticket/:seat_number",
  isSignIn,
  isAuthenticated,
  isAdmin,
  adminCancelTicket
);

// admin access to reset all tickets
router.delete(
  "/admin/:userId/reset_ticket",
  isSignIn,
  isAuthenticated,
  isAdmin,
  resetTicket
);

module.exports = router;
