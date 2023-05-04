const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const user_controller = require("../controllers/User_Controllers");
router.route("/user_update/:_id").put(auth, user_controller.user_update);
router
  .route("/user_list/:status_code")
  .get(auth, user_controller.get_user_list_by_status_code);
router
  .route("/get_user_details_by_id/:_id")
  .get(auth, user_controller.get_user_list_By_Id);
router
  .route("/get_user_list_by_role_name/")
  .get(auth, user_controller.get_user_list_By_Role_Name);
module.exports = router;
