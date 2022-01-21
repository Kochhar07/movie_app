const Ticket = require("../models/ticket");
const user = require("../models/user");
const User = require("../models/user");

// const getTicketById = (req, res, next, id) => {
//   Movie.findById(id)
//     .populate("user", "_id")
//     .exec((err, ticket) => {
//       if (err) {
//         return res.status(400).json({
//           error: "ticket not found",
//         });
//       }
//       req.ticket = ticket;
//       next();
//     });
// };
const updateUserTicket = async (ticket, userId) => {
  // console.log("Inside updateUserTicket");
  // console.log("Ticket: ", ticket);
  const user = await User.findById(userId);
  // console.log("user before booking: ", user);
  // user.ticketDetails.push();
  user.ticketDetails.push(ticket._id);
  // console.log("user after booking: ", user);
  user.save();
};

const bookTicket = async (req, res) => {
  const body = req.body;
  const ticket = await Ticket.find({ seat_number: body.seat_number });
  if (ticket.length > 0) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: "Seat is already booked",
    });
  }
  const new_ticket = new Ticket(body);
  new_ticket.save((err, new_ticket) => {
    if (err) {
      return res.status(400).json({
        message: "Seat not booked",
      });
    }
    res.json({ message: "Ticket booked", new_ticket });
  });
  updateUserTicket(new_ticket, req.params.userId);
};

const closeTicket = async (req, res) => {
  const allTickets = await Ticket.find({ is_booked: true });
  if (allTickets.length == 0) {
    res.status(200).json({
      // statusCode: 200,
      // status: true,
      message: "All seats are available",
      seats: [],
    });
  }
  res.status(200).json({ message: "Booked Tickets", allTickets });
};

const openTicket = async (req, res) => {
  const allTickets = await Ticket.find({});
  if (allTickets.length == 0) {
    res.status(200).json({
      // statusCode: 200,
      // status: true,
      message: "Open Tickets",
      seats: [],
    });
  } else {
    const seat_number_from_db = [];
    const not_booked = [];
    for (let ticket of allTickets) {
      seat_number_from_db.push(ticket.seat_number);
    }
    // console.log(seat_number_from_db)
    for (let i = 1; i < 97; i++) {
      if (!seat_number_from_db.includes(i)) {
        not_booked.push(i);
      }
    }
    res.status(200).json({ message: "Open Tickets", seats: not_booked });
  }
};

const cancelTicket = async (req, res) => {
  const user_id = req.params.userId;
  const seat_number = req.params.seat_number;
  const user = await User.findById(user_id);
  const tickets = user.ticketDetails;
  for (let i = 0; i < tickets.length; i++) {
    const retreived_ticket = await Ticket.findById(tickets[i]);
    if (retreived_ticket) {
      if (retreived_ticket.seat_number == seat_number) {
        // Delete Ticket from ticket model
        const ticket_id = retreived_ticket._id;
        await Ticket.findByIdAndDelete({ _id: ticket_id });
        // Delete ticket from user model
        await user.ticketDetails.remove(ticket_id);
        user.save();
        break;
      }
    }
  }
  res.status(200).json({ message: "Ticket deleted" });
};

const viewTicket = async (req, res) => {
  const user_id = req.params.userId;
  const user = await User.findById(user_id);
  const tickets = user.ticketDetails;
  let seats = [];
  if (tickets.length > 0) {
    for (let i = 0; i < tickets.length; i++) {
      // console.log("Ticket: ", tickets[i]);
      const retreived_ticket = await Ticket.findById(tickets[i]);
      // console.log("retreived_ticket: ", retreived_ticket);
      if (retreived_ticket) seats.push(retreived_ticket.seat_number);
    }
  }
  // console.log("Tickets: ", tickets);
  res.status(200).json({ message: "Tickets retreived", seats });
};

const adminCancelTicket = async (req, res) => {
  const seat_number = req.params.seat_number;
  const tickets = await Ticket.find({});
  for (let ticket of tickets) {
    if (ticket.seat_number == seat_number) {
      const ticketId = ticket._id;
      await Ticket.findByIdAndDelete({ _id: ticketId });
      const users = await User.find({});
      for (let user of users) {
        if (user.ticketDetails.includes(ticketId)) {
          await user.ticketDetails.remove(ticketId);
          user.save();
          break;
        }
      }
      break;
    }
  }
  res.status(200).json({ message: "Ticket deleted" });
};

const resetTicket = async (_req, res) => {
  await Ticket.deleteMany({});
  const users = await User.find({});
  for (let user of users) {
    user.ticketDetails = [];
    user.save();
  }

  // console.log(allTickets);
  res.status(200).json({ message: "All ticktes are open" });
};

module.exports = {
  bookTicket,
  closeTicket,
  openTicket,
  cancelTicket,
  viewTicket,
  adminCancelTicket,
  resetTicket,
};
