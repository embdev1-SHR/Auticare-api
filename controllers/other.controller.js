const { upload } = require("../helpers/imageUpload");
const PDFDocument = require("pdfkit");
const { generateABLLSReport } = require("../helpers/reports");
const { categoryListByTherapistUserIDNScaleID } = require("../services/category.service");
const { clientListDesc } = require("../services/client.service");
const {
  CountryList,
  StateList,
  counts,
  countsByClientUserID,
  countsByCenterUserID,
  countsByTherapistUserID,
} = require("../services/other.service");
const {
  patientListDescByClientUserID,
  patientListDescByCenterUserID,
  patientListDescByTherapistUserID,
  patientAssessmentMetricResponseList,
  patientDetailsByUserIDAsync,
  patientAssessmentMetricResponseListByPatientID,
  patientScreeningMetricResponseList,
  patientScreeningMetricResponseListByPatientID,
  patientDetailsAsync,
  patientMetricDetailsByTherapistUserID,
  patientMetricDetailsByPatientID,
  patientSessionDetailsByTherapistUserID,
  patientSessionDetailsByPatientID,
  patientSessionTrialListByTherapistUserID,
  patientSessionTrialListByPatientID,
} = require("../services/patient.service");
const { paymentByMonth } = require("../services/payment.service");
const {
  scaleAssessmentQuestionListByScaleIDNTherapistUserID,
  scaleAssessmentQuestionListAsync,
} = require("../services/scale.service");
const path = require("path");

exports.patientAssessmentMetricReport = async (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    ScaleID: req.params.ScaleID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  try {
    if (data.RoleName == "Patient") {
      const patient = await patientDetailsByUserIDAsync(data.UserID);
      if (patient.length) {
        data.PatientID = patient[0].PatientID;
      } else {
        return res.status(404).send({ success: false, errors: { message: "Patient not found" } });
      }
    }
    let patientAssessmentMetricResponseListValues = [];
    let scaleAssessmentQuestionListValues = [];
    if (data.RoleName == "Patient") {
      patientAssessmentMetricResponseListValues = await patientAssessmentMetricResponseListByPatientID(data);
      scaleAssessmentQuestionListValues = await scaleAssessmentQuestionListAsync(data.ScaleID);
    } else {
      patientAssessmentMetricResponseListValues = await patientAssessmentMetricResponseList(data);
      scaleAssessmentQuestionListValues = await scaleAssessmentQuestionListByScaleIDNTherapistUserID(data);
    }
    const categoryListValues = await categoryListByTherapistUserIDNScaleID(data);

    const buffer = await generateABLLSReport(
      scaleAssessmentQuestionListValues,
      patientAssessmentMetricResponseListValues,
      categoryListValues
    );
    await res.setHeader("Content-Disposition", "attachment; filename=ABLLS.xlsx");
    await res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    await res.send(buffer);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientScreeningMetricReport = async (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    ScaleID: req.params.ScaleID,
    PatientMetricID: req.params.PatientMetricID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  try {
    let patientDetails = {};

    if (data.RoleName == "Patient") {
      const patient = await patientDetailsByUserIDAsync(data.UserID);
      if (patient.length) {
        data.PatientID = patient[0].PatientID;
        patientDetails = patient[0];
      } else {
        return res.status(404).send({ success: false, errors: { message: "Patient not found" } });
      }
    } else {
      patientDetails = (await patientDetailsAsync(data.PatientID))[0];
      // patientDetails= patientDetails[0]
    }
    let patientScreeningMetricResponseListValues = [];
    let patientMetricDetails = {};
    if (data.RoleName == "Patient") {
      patientMetricDetails = (await patientMetricDetailsByPatientID(data))[0];
      patientScreeningMetricResponseListValues = await patientScreeningMetricResponseListByPatientID(data);
    } else {
      patientMetricDetails = (await patientMetricDetailsByTherapistUserID(data))[0];
      patientScreeningMetricResponseListValues = await patientScreeningMetricResponseList(data);
    }
    //TODO:PDF Generation Logic
    const unique = [...new Set(patientScreeningMetricResponseListValues?.map((item) => item.ResponseSelected))];

    const series = unique?.map((response) => {
      const count = patientScreeningMetricResponseListValues.filter((obj) => obj.ResponseSelected === response).length;
      return count;
    });

    const percentage = series.map((count) => {
      return Math.round((count * 100) / patientScreeningMetricResponseListValues.length);
    });

    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", 'attachment; filename="Audicare.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    doc.pipe(res);
    doc.fontSize(18).text("Assessment Report", { align: "center" });
    doc.fontSize(18).text("Indian Scale For Assessment of Autism", { align: "center" });
    doc.image(path.join(process.cwd(), "/public/images/auticare_logo.png"), {
      fit: [50, 50],
      x: 280,
      y: 130,
    });

    const labelX = 180;
    const labelY = 250;
    const DOB = patientDetails.DOB;

    var birthDate = new Date(patientDetails.DOB);
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const dateOnly = new Date(DOB).toISOString().split("T")[0];
    const date = new Date(patientDetails.Create_TS).toISOString().split("T")[0];

    doc.fontSize(14).text(`Assessment Date       : ${date}`, labelX, labelY, { align: "left" });
    doc
      .fontSize(14)
      .text(`Name                          : ${patientDetails.PatientName}`, labelX, labelY + 30, { align: "left" });
    doc
      .fontSize(14)
      .text(`Gender                       : ${patientDetails.Gender}`, labelX, labelY + 60, { align: "left" });
    doc.fontSize(14).text(`Date Of Birth              : ${dateOnly}`, labelX, labelY + 90, { align: "left" });
    doc.fontSize(14).text(`Age                            : ${age}`, labelX, labelY + 120, { align: "left" });
    doc.fontSize(14).text(`Remarks                    : ${patientDetails.Remarks}`, labelX, labelY + 150, { align: "left" });
    doc.fontSize(14).text("Assessor                    : Assessor", labelX, labelY + 180, { align: "left" });
    doc
      .fontSize(14)
      .text(`Total Score                 : ${patientMetricDetails.Score}`, labelX, labelY + 210, { align: "left" });
    doc
      .fontSize(14)
      .text(`Classification              : ${patientMetricDetails.Result}`, labelX, labelY + 240, { align: "left" });
    const data1 = percentage;
    const labels = unique;
    const total = data1.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;
    const colors = ["#51cec7", "#7da7ed", "#ef9981", "#29344a", "#ffc977"];
    const chartX = 150;
    const chartY = 650;
    const chartRadius = 100;

    for (let i = 0; i < data1.length; i++) {
      const angle = (data1[i] / total) * Math.PI * 2;
      const color = colors[i % colors.length];
      doc.fillColor(color);
      doc
        .moveTo(chartX, chartY)
        .lineTo(chartX + Math.cos(startAngle) * chartRadius, chartY + Math.sin(startAngle) * chartRadius)
        .arc(chartX, chartY, chartRadius, startAngle, startAngle + angle)
        .lineTo(chartX, chartY)
        .fill();
      startAngle += angle;
    }
    doc.fillColor("black").fontSize(10);

    for (let i = 0; i < labels.length; i++) {
      const labelX = chartX + chartRadius + 40;
      const labelY = chartY - chartRadius + i * 30 + 25;
      const color = colors[i % colors.length];

      doc.rect(labelX, labelY - 6, 8, 8).fill(color);
      doc
        .fillColor("black")
        .text(labels[i], labelX, labelY, { align: "center" })
        .fillColor("black")
        .text(data1[i].toString() + "%", labelX + 10, labelY, { align: "right" });
    }
    doc.end();
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.patientSessionReport = async (req, res) => {
  const data = {
    PatientID: req.params.PatientID,
    SessionID: req.params.SessionID,
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  try {
    let patientDetails = {};
    if (data.RoleName == "Patient") {
      const patient = await patientDetailsByUserIDAsync(data.UserID);
      if (patient.length) {
        data.PatientID = patient[0].PatientID;
        patientDetails = patient[0];
      } else {
        return res.status(404).send({ success: false, errors: { message: "Patient not found" } });
      }
    } else {
      patientDetails = (await patientDetailsAsync(data.PatientID))[0];
    }
    let patientSessionTrialListValues = [];
    let patientSessionNContentDetails = {};
    if (data.RoleName == "Patient") {
      patientSessionNContentDetails = (await patientSessionDetailsByPatientID(data))[0];
      patientSessionTrialListValues = await patientSessionTrialListByPatientID(data);
    } else {
      patientSessionNContentDetails = (await patientSessionDetailsByTherapistUserID(data))[0];
      patientSessionTrialListValues = await patientSessionTrialListByTherapistUserID(data);
    }
    //TODO:PDF Generation Logic
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", 'attachment; filename="Audicare.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    doc.pipe(res);
    doc.fontSize(20).text(" Session Report ", { align: "center" });

    const labelX = 180;
    const labelY = 100;

    doc.fontSize(18).text(" Patient Detail ", 80, 120, { align: "left" });
    const datetimeString = String(patientDetails.DOB);
    const dateValue = datetimeString.substring(0, 15);
    const table1 = [
      ['Patient Name', `: ${patientDetails.PatientName}`],
      ['Date Of Birth', `: ${dateValue}`],
      ['Gender', `: ${patientDetails.Gender}`],
      ['Parent Email ID', `: ${patientDetails.ParentEmailID}`],
      ['Parent Phone ', `: ${patientDetails.ParentPhone}`],
      ['Address', `: ${patientDetails.AddressLine1}`],
      ['', `  ${patientDetails.AddressLine2}`],
      ['City', `: ${patientDetails.City}`],
      ['District', `: ${patientDetails.District}`],
      ['Pincode', `: ${patientDetails.Pincode}`],
      ['State', `: ${patientDetails.State}`],
      ['Country', `: ${patientDetails.Country}`],
    ];

    const table1X = 100;
    const table1Y = 190;
    doc.fontSize(12);
    table1.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellX = table1X + columnIndex * 150;
        const cellY = table1Y + rowIndex * 20 * 2;
        doc.fontSize(14).text(cell.toString(), cellX + 20, cellY, { width: 150, align: 'left' });
      });
    });

    doc.addPage();
    doc.fontSize(18).text(" Session and Activity ", 80, 100, { align: "left" });
    const datetimeString2 = String(patientSessionNContentDetails.SessionDate);
    const dateValue2 = datetimeString2.substring(0, 15);
    const feedbackValue = patientSessionNContentDetails.Feedback === null ? "Not Available" : patientSessionNContentDetails.Feedback;
    const ratingValue = patientSessionNContentDetails.Rating === null ? "Not Available" : patientSessionNContentDetails.Rating;
    const table2 = [
      ['Session Name', `: ${patientSessionNContentDetails.SessionName}`],
      ['Session Date', `: ${dateValue2}`],
      ['Activity Name', `: ${patientSessionNContentDetails.ContentActivityName}`],
      ['Activity Category', `: ${patientSessionNContentDetails.ContentCategory}`],
      ['Activity Description', `: ${patientSessionNContentDetails.ContentActivityDescription}`],
      ['Rating', `: ${ratingValue} / 5`],
      ['Feedback', `: ${feedbackValue}`],
    ];
    const table2X = 100;
    const table2Y = 170;
    doc.fontSize(12);
    table2.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellX = table2X + columnIndex * 150;
        const cellY = table2Y + rowIndex * 20 * 2;
        doc.fontSize(14).text(cell.toString(), cellX + 20, cellY, { width: 150, align: 'left' });
      });
    });

    let sumOfNoOFails = 0;
    for (let i = 0; i < patientSessionTrialListValues.length; i++) {
      sumOfNoOFails += patientSessionTrialListValues[i].NoOfFail || 0;
    }
    let sumOfNoOfSuccess = 0;
    for (let i = 0; i < patientSessionTrialListValues.length; i++) {
      sumOfNoOfSuccess += patientSessionTrialListValues[i].NoOfSuccess || 0;
    }

    var totalDuration = patientSessionTrialListValues.reduce(function (total, obj) {
      var startDate = new Date(obj.StartingTime);
      var endDate = new Date(obj.CompletionTime);
      var duration = startDate - endDate;
      return total + duration;
    }, 0);

    var minutes = Math.floor(totalDuration / (1000 * 60)) % 60;
    var hours = Math.floor(totalDuration / (1000 * 60 * 60)) % 24;
    hours = hours > 0 ? hours : 0;

    if (patientSessionTrialListValues.length > 0) {
      const handleData = [patientSessionTrialListValues.length, sumOfNoOfSuccess, sumOfNoOFails, hours,];
      const labels = ['Prompted', 'Correct', 'Incorrect', "Duration",];
      const colors = ['#36a2eb', '#ff6384', '#4bc0c0', '#ff6384',];
      const chartX = 150;
      const chartY = 460;
      const chartWidth = 230;
      const chartHeight = 200;
      const barSpacing = 30;
      const maxBarHeight = chartHeight - 30;
      const maxDataValue = Math.max(...handleData);
      const totalBarWidth = barSpacing * (handleData.length - 1);
      const barWidth = (chartWidth - totalBarWidth) / handleData.length;

      doc.lineWidth(1);
      handleData.forEach((value, index) => {
        const barHeight = (value / maxDataValue) * maxBarHeight;
        const barX = chartX + index * (barWidth + barSpacing);
        const barY = chartY + chartHeight - barHeight;
        const color = colors[index % colors.length];
        doc.rect(barX, barY, barWidth, barHeight)
          .fillOpacity(0.8)
          .fillColor(color)
          .fill();
        doc.rect(barX, barY, barWidth, barHeight)
          .strokeOpacity(1)
          .strokeColor('#000000')
          .stroke();
        doc.fillOpacity(1)
          .fillColor('#ffffff')
          .fontSize(10)
          .text(value.toString(), barX + barWidth / 2, barY - 10, { align: 'left' });
        doc.fillOpacity(1)
          .fillColor('#000000')
          .fontSize(10)
          .text(labels[index], barX - 15 + barWidth / 2 - 5, chartY + chartHeight + 10, { align: 'left' });
      });

      const yAxisValues = [0, maxDataValue / 2, maxDataValue]; // Example y-axis values
      yAxisValues.forEach((value) => {
        const yPosition = chartY + chartHeight - (value / maxDataValue) * maxBarHeight; // Calculate the y-axis position
        doc.fillColor('#000000')
          .fontSize(10)
          .text(value.toString(), 100, yPosition, { align: 'left' });
      });
      doc.addPage();
      doc.fontSize(18).text(" Session Trials ", 30, 100, { align: "left" });
      const table = [
        ['Prompted', 'Correct', 'Incorrect', "Duration"],
        [patientSessionTrialListValues.length, sumOfNoOfSuccess, sumOfNoOFails, `${hours} hrs ${minutes} Min`],
      ];

      const tableX = 40;
      const tableY = 150;
      const cellPadding = 10;
      const cellWidth = 100;

      doc.fontSize(12);
      table.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          const cellX = tableX + columnIndex * 130;
          const cellY = tableY + rowIndex * 20;
          doc.text(cell.toString(), cellX, cellY + 5, { width: 150, align: 'left' });
          doc.rect(cellX - 5, cellY, 130, 20)
            .strokeOpacity(1)
            .strokeColor('#000000')
            .stroke();
        });
      });
    }
    doc.end();
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ success: false, errors: { message: error } });
  }
};

exports.CountryList = (req, res) => {
  CountryList((error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.StateList = (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    CountryID: req.params.CountryID,
  };
  StateList(data.CountryID, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, errors: { message: error } });
    }
    return res.status(200).send({
      success: true,
      results: { data: results },
    });
  });
};

exports.DashboardAnalytics = async (req, res) => {
  const data = {
    UserID: req.userData.UserID,
    RoleName: req.userData.RoleName,
  };
  if (data.RoleName == "SuperAdmin") {
    try {
      const recentClientList = await clientListDesc();
      const allCounts = await counts();
      const monthlyPaymentReport = await paymentByMonth();

      return res.status(200).send({
        success: true,
        results: {
          data: {
            userCounts: allCounts[0],
            monthlyPaymentReport,
            recentClientList,
          },
        },
      });
    } catch (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
  } else if (data.RoleName == "ClientAdmin") {
    try {
      const allCounts = await countsByClientUserID(data.UserID);
      const recentPatientList = await patientListDescByClientUserID(data.UserID);
      return res.status(200).send({
        success: true,
        results: {
          data: {
            userCounts: allCounts[0],
            recentPatientList,
          },
        },
      });
    } catch (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
  } else if (data.RoleName == "Center") {
    try {
      const allCounts = await countsByCenterUserID(data.UserID);
      const recentPatientList = await patientListDescByCenterUserID(data.UserID);
      return res.status(200).send({
        success: true,
        results: {
          data: {
            userCounts: allCounts[0],
            recentPatientList,
          },
        },
      });
    } catch (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
  } else if (data.RoleName == "Therapist") {
    try {
      const allCounts = await countsByTherapistUserID(data.UserID);
      const recentPatientList = await patientListDescByTherapistUserID(data.UserID);
      return res.status(200).send({
        success: true,
        results: {
          data: {
            userCounts: allCounts[0],
            recentPatientList,
          },
        },
      });
    } catch (error) {
      return res.status(500).send({ success: false, errors: { message: error } });
    }
  } else {
    return res.status(403).send({
      success: false,
      errors: {
        message: "The user does not have access",
      },
    });
  }
};

exports.ImageUpload = (req, res) => {
  const uploadSingle = upload.single("imageFile");
  uploadSingle(req, res, (error) => {
    if (error) {
      console.error("Multer/S3 upload error:", error.message);
      return res.status(500).send({ success: false, errors: { message: error.message } });
    }

    if (!req.file) {
      return res.status(400).send({ success: false, errors: { message: "No file received. Ensure the field name is 'imageFile' and the request is multipart/form-data." } });
    }

    return res.status(200).send({
      success: true,
      results: { data: req.file.location },
    });
  });
};
