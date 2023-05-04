const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const documents_controller = require("../controllers/Documents_Controller");
// <!=============== Cabin ====================>

router
  .route("/documents_counter/:user_id")
  .get(auth, documents_controller.get_documents_counter);

module.exports = router;
