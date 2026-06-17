require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { verifyAccessToken } = require("./middleware/authentication");
const { swaggerDocs, options } = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");
const authRouter = require("./routes/auth.route");
const appAuthRouter = require("./routes/app/auth.route");
const clientRouter = require("./routes/client.route");
const centerRouter = require("./routes/center.route");
const departmentRouter = require("./routes/department.route");
const therapistRouter = require("./routes/therapist.route");
const skillRouter = require("./routes/skill.route");
const categoryRouter = require("./routes/category.route");
const scaleRouter = require("./routes/scale.route");
const contentRouter = require("./routes/content.route");
const therapyRouter = require("./routes/therapy.route");
const goalRouter = require("./routes/goal.route");
const patientRouter = require("./routes/patient.route");
const subscriptionPlanRouter = require("./routes/subscriptionPlan.route");
const freeResourceRouter = require("./routes/freeResource.route");
const otherRouter = require("./routes/other.route");
const userRouter = require("./routes/user.route");
const regionRouter = require("./routes/region.route");
const appointmentRouter = require("./routes/appointment.route");
const appointmentSlotRouter = require("./routes/appointmentSlot.route");
const exceptionSlotRouter = require("./routes/exceptionSlot.route");
const homeSessionRouter = require("./routes/homeSession.route");
const homeSessionPublicRouter = require("./routes/homeSessionPublic.route");
const probdatasRouter = require("./routes/probdata.route");
const paymentRouter = require("./routes/payment.route");
const storeEnquiryRouter = require("./routes/storeEnquiry.route");
const products = require("./routes/products.route");
// const assessmentRouter = require("./routes/assessment.route");
// const moduleRouter = require("./routes/module.route");

const app = express();

// Middleware
app.use(helmet());
app.use(express.json()); // parse json bodies in the request object
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
  })
);

app.use(
  "/api/docs",
  (req, res, next) => {
    swaggerDocs.host = req.get("host");
    req.swaggerDoc = swaggerDocs;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, options)
);

// Redirect requests to endpoints

// App Routes
app.use("/api/v1/app/auth", appAuthRouter);

// One-time migration endpoint — remove after running
app.get("/api/migrate/add-thumbnail-url", (req, res) => {
  if (req.query.secret !== process.env.JWT_ACCESS_TOKEN_SECRET) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  const db = require("./config/db.config");
  db.query(
    `ALTER TABLE home_sessions ADD COLUMN IF NOT EXISTS ThumbnailURL VARCHAR(1000) NULL`,
    (error) => {
      if (error) return res.status(500).json({ success: false, message: error.message });
      return res.status(200).json({ success: true, message: "ThumbnailURL column added (or already existed)" });
    }
  );
});

// Web Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/homeSessions", homeSessionPublicRouter); // public share-view — must be before verifyAccessToken
app.use(verifyAccessToken);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/centers", centerRouter);
app.use("/api/v1/therapists", therapistRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/therapies", therapyRouter);
app.use("/api/v1/goals", goalRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/scales", scaleRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/subscriptionPlans", subscriptionPlanRouter);
app.use("/api/v1/freeResources", freeResourceRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/others", otherRouter);
app.use("/api/v1/regions", regionRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/appointmentSlots", appointmentSlotRouter);
app.use("/api/v1/exceptionSlots", exceptionSlotRouter);
app.use("/api/v1/homeSessions", homeSessionRouter);
app.use("/api/v1/probdatas", probdatasRouter);
app.use("/api/v1/storeEnquiries", storeEnquiryRouter);
app.use("/api/v1/products", products);
// app.use("/api/v1/assessments", assessmentRouter);
// app.use("/api/v1/modules", moduleRouter);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    errors: { message: "URL Not Found" },
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  return res.status(err.status || 500).json({
    success: false,
    errors: { message: err.message || "Something went wrong" },
  });
});

// Listening on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
