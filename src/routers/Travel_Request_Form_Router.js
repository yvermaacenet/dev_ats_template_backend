const express = require("express");
const auth = require("../middleware/auth");
const travel_request_controller = require("../controllers/Travel_Request_Controller");
const router = new express.Router();
// <!=============== Cabin ====================>

router
  .route("/raise_travel_request")
  .post(auth, travel_request_controller.post_travel_request);
router
  .route("/all_travel_request")
  .get(auth, travel_request_controller.get_travel_request);
router
  .route("/update_travel_request/:_id")
  .put(auth, travel_request_controller.put_travel_request);
router
  .route("/get_travel_request_by_id/:_id")
  .get(auth, travel_request_controller.get_travel_request_by_id);
router
  .route("/get_travel_request_by_email_id/:email_id")
  .get(auth, travel_request_controller.get_travel_request_by_email_id);

module.exports = router;
