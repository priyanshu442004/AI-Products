import express from "express";
import multer from "multer";
import { previewTrialBalance, processTrialBalance, checkUploadFolder,
  uploadTrialBalance ,downloadTrialBalance, deleteTrialBalance} from "../controllers/trialBalance.controller.js";
import { processBalanceSheet } from "../controllers/balanceSheet.controller.js";
import { processPL } from "../controllers/PL.controller.js";
import { uploadtwo } from "../middleware/upload.js";
const router = express.Router();

// Store file in memory (better for parsing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (optional)
  },
});

// router.post("/preview", upload.single("file"), previewTrialBalance);
router.get("/check-upload", checkUploadFolder);
router.post("/upload", uploadtwo.single("file"), uploadTrialBalance);
router.get("/preview", previewTrialBalance);
router.get("/download", downloadTrialBalance);
router.delete("/delete", deleteTrialBalance);



router.post("/process", upload.single("file"), processTrialBalance);

router.post("/process/BalanceSheet", uploadtwo.single("file"), processBalanceSheet);
router.post("/process/PL", uploadtwo.single("file"), processPL);

export default router;
