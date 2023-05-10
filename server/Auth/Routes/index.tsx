import express from "express";
import authCtrl from "../controllers/authCtrl";
import contactCtrl from "../controllers/contactCtrl";
import fileCtrl from "../controllers/filecontroller";
import resumeCtrl from "../controllers/resumeCtrl";
import noticeCtrl from "../controllers/noticeCtrl";
import companyCtrl from "../controllers/companyCtrl";
import statisticsCtrl from "../controllers/statisticsCtrl";
import companyUserRelationCtrl from "../controllers/companyUserRelationCtrl";
import { validAdminRegister, validRegister } from "../middleware/valid";
import userCtrl from "../controllers/userCtrl";
import avatarCtrl from "../controllers/avatarCtrl";
const { upload } = require("../storage/GridFS");

const router = express.Router();

router.post("/register", validRegister, authCtrl.register);
router.post('/admin/register', validAdminRegister, authCtrl.adminregister);
router.post("/updateInfo", authCtrl.updateInfo);
router.post("/active", authCtrl.activeAccount);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/refresh_token", authCtrl.refreshToken);

router.post("/upload", upload.single("file"), fileCtrl.upload);
router.get("/file/:id", fileCtrl.stream);
router.get("/single/:id", fileCtrl.single);
router.delete("/file/:id", fileCtrl.delete_file);

router.get("/notice", noticeCtrl.getNotice);
router.post("/notice/upload", upload.single("file"), noticeCtrl.upload_notice);
router.delete("/notice/:id", noticeCtrl.delete_notice);

router.post("/resume", resumeCtrl.getResume);
router.post("/resume/upload", upload.single("file"), resumeCtrl.upload_resume);
router.delete("/resume/:id", resumeCtrl.delete_resume);

router.post("/company/upload", companyCtrl.upload_company);
router.post("/company/edit/:id", companyCtrl.edit_company);
router.delete("/company/:id", companyCtrl.delete_company);
router.get("/company", companyCtrl.get_company);

router.post(
  "/company/register_user_company",
  companyUserRelationCtrl.register_user_company
);
router.post(
  "/company/get_user_companys",
  companyUserRelationCtrl.get_user_companys
);
router.post(
  "/company/get_company_users",
  companyUserRelationCtrl.get_company_users
);
router.post("/company/get_user_info", companyUserRelationCtrl.get_user_info);

router.post("/contact", contactCtrl.contact);

router.get("/statistics/get_year_stats", statisticsCtrl.get_group_statistics)
router.post("/statistics/upload", statisticsCtrl.upload_statistics);
router.post("/statistics/filter", statisticsCtrl.filter_statistics);

router.get("/users", userCtrl.getUsers);
router.post("/users/status_placed", userCtrl.statusPlaced);
router.post("/users/update_cluster", userCtrl.updateCluster);

router.post("/users/avatar_upload", upload.single("image"), avatarCtrl.upload_image);
router.post("/users/avatar_delete/:id", avatarCtrl.delete_image);
router.post("/users/avatar_get", avatarCtrl.getImage);

export default router;
