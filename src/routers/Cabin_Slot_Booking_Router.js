const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const cabin_Slot_Booking_controller = require("../controllers/Cabin_Slot_Booking_Controllers");

// <!=============== Cabin Slot Booking ====================>
router
  .route("/cabin_slot_booking")
  .post(auth, cabin_Slot_Booking_controller.post_cabin_slot_booking);
router
  .route("/cabin_slot_booking")
  .get(auth, cabin_Slot_Booking_controller.get_all_cabin_slot_booking);
router
  .route("/cabin_slot_booking/:_id")
  .get(auth, cabin_Slot_Booking_controller.get_cabin_slot_booking);
router
  .route("/cabin_slot_booking_by_location/:location")
  .get(auth, cabin_Slot_Booking_controller.get_cabin_slot_booking_by_location);
router
  .route("/cabin_slot_booking/:_id")
  .put(auth, cabin_Slot_Booking_controller.update_cabin_slot_booking);
router
  .route("/cabin_slot_booking/:_id")
  .delete(auth, cabin_Slot_Booking_controller.delete_cabin_slot_booking);

module.exports = router;
