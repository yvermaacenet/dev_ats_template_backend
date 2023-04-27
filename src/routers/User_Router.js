const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const user_controller = require("../controllers/User_Controllers");
// <!=============== Login & Logout ====================>
// router.route("/sign_in").post(user_controller.sign_in);
// router.route("/sign_up").post(user_controller.sign_up);
router.route("/user_update/:_id").put(user_controller.user_update);
// router
//   .route("/user_activation/:_id/:status")
//   .put(user_controller.user_activation);
// router.route("/user_list").get(user_controller.get_user_list);
router
  .route("/user_list/:status_code")
  .get(user_controller.get_user_list_by_status_code);
// router
//   .route("/get_user_list_by_on_boarding_counter/:steper_counter/:status_code")
//   .get(user_controller.get_user_list_by_on_boarding_counter_by_status_code);
// router
//   .route("/get_user_list_by_off_boarding_counter/:steper_counter/:status_code")
//   .get(user_controller.get_user_list_by_off_boarding_counter);
router
  .route("/get_user_details_by_id/:_id")
  .get(auth, user_controller.get_user_list_By_Id);
router
  .route("/get_user_list_by_role_name/")
  .get(auth, user_controller.get_user_list_By_Role_Name);
// router
//   .route("/users_upload_by_file")
//   .post(user_controller.users_upload_by_file);
module.exports = router;
