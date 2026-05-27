const XlsxPopulate = require("xlsx-populate");
exports.generateABLLSReport = async (
  scaleAssessmentQuestionListValues,
  patientAssessmentMetricResponseListValues,
  categoryListValues
) => {
  let differentIds = scaleAssessmentQuestionListValues
    .filter((b) => !patientAssessmentMetricResponseListValues.some((a) => a.MetricID === b.MetricID))
    .map((b) => b.MetricID);

  differentIds.forEach((MetricID) => {
    let objectToAdd = scaleAssessmentQuestionListValues.find((b) => b.MetricID === MetricID);
    patientAssessmentMetricResponseListValues.push(objectToAdd);
  });

  const categoryMap = new Map(
    categoryListValues.map((category) => [
      category.CategoryID,
      {
        CategoryName: category.CategoryName,
        CategoryLabel: category.CategoryLabel,
      },
    ])
  );

  const mergedData = patientAssessmentMetricResponseListValues.map((item) => {
    const matchingCategory = categoryMap.get(item.CategoryID);
    if (matchingCategory) {
      return {
        ...item,
        ...matchingCategory,
      };
    }
    return item;
  });

  const AZdata = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const AZresult = [];
  for (let i = 0; i < AZdata.length; i += 3) {
    AZresult.push(AZdata.slice(i, i + 3));
  }

  const workbook = await XlsxPopulate.fromBlankAsync();
  AZresult.map(async (subarray) => {
    const filteredData = mergedData.filter((item) => item.CategoryLabel === subarray[0]);
    const filteredDataB = mergedData.filter((item) => item.CategoryLabel === subarray[1]);
    const filteredDataC = mergedData.filter((item) => item.CategoryLabel === subarray[2]);
    let mergedArrayFOrTable = filteredData.concat(filteredDataB, filteredDataC);
    const result = mergedArrayFOrTable.map((obj) => ({ Colour: obj.Colour, Date: obj.Date }));
    const uniqueData = [...new Map(result.map((item) => [`${item.Colour}-${item.Date}`, item])).values()];
    const mappedArray = uniqueData.map((obj) => {
      const dateString = obj.Date?.toLocaleDateString("en-GB");
      return { ...obj, Date: dateString };
    });

    for (let i = 0; i < filteredData.length; i++) {
      const currentObject = filteredData[i];
      currentObject.matches = [];
      for (let j = i + 1; j < filteredData.length; j++) {
        const nextObject = filteredData[j];
        if (currentObject.Question === nextObject.Question) {
          currentObject.matches.push(nextObject);
          filteredData.splice(j, 1);
          j--;
        }
      }
    }

    for (let i = 0; i < filteredDataB.length; i++) {
      const currentObject = filteredDataB[i];
      currentObject.matches = [];
      for (let j = i + 1; j < filteredDataB.length; j++) {
        const nextObject = filteredDataB[j];
        if (currentObject.Question === nextObject.Question) {
          currentObject.matches.push(nextObject);
          filteredDataB.splice(j, 1);
          j--;
        }
      }
    }

    for (let i = 0; i < filteredDataC.length; i++) {
      const currentObject = filteredDataC[i];
      currentObject.matches = [];
      for (let j = i + 1; j < filteredDataC.length; j++) {
        const nextObject = filteredDataC[j];
        if (currentObject.Question === nextObject.Question) {
          currentObject.matches.push(nextObject);
          filteredDataC.splice(j, 1);
          j--;
        }
      }
    }
    if (mergedData.length === 0) {
      throw new Error("Data array is empty");
    }

    let sheet =
      !filteredData.length && !filteredDataB.length && !filteredDataC.length
        ? undefined
        : workbook.addSheet(`ABLLS ${subarray[0]}-${subarray[2]}`);

    mappedArray.forEach((item, index) => {
      const columnIndex = 1;
      sheet.cell(2, columnIndex + 0).value("Patient Name");
      sheet.cell(2, columnIndex + 1).value("Therapist Name");
      sheet.cell(2, columnIndex + 2).value("Date");
      sheet.cell(2, columnIndex + 10).value("Assessment of Basic Language and Learning Skills - Revised");
      sheet
        .cell(3, columnIndex + 13)
        .value("Skills Tracking System")
        .style({
          fill: "F2F2F2",
          horizontalAlignment: "left",
          verticalAlignment: "left",
          bold: true,
        });
      sheet
        .cell(4, columnIndex + 10)
        .value(
          "NB - please see teacher or ABLLS book - R for specific information on criteria for completing each level."
        );
      sheet
        .cell(6, columnIndex + 10)
        .value("created by Jan Palmer based on the ABLLS - R copyright by Behavior Analysts, Inc.");

      const ColumnPatient = sheet.column(columnIndex + 0);
      ColumnPatient.width(20);
      const ColumnTherapist = sheet.column(columnIndex + 1);
      ColumnTherapist.width(20);
      const ColumnDate = sheet.column(columnIndex + 2);
      ColumnDate.width(12);
      const colour = item.Colour?.substring(1);
      const tableRangeTable = sheet.range(`A${2 + index}:D${2 + uniqueData.length}`);
      tableRangeTable.style({
        border: true,
        borderColor: "000000",
      });
      sheet.cell(index + 3, columnIndex + 2).value(item.Date);
      sheet.cell(index + 3, columnIndex + 3).style({ fill: colour });
    });

    filteredData.forEach((item, index) => {
      const columnIndex = 4;
      const serialNumber = item.CategoryLabel;
      const colour = item.Colour?.substring(1);
      const categoryNameColumn = sheet.column(columnIndex + 2);
      categoryNameColumn.width();
      const NumberOfScoreColumn = sheet.column(columnIndex + 3);
      NumberOfScoreColumn.width();
      sheet
        .cell(15, columnIndex + 2)
        .value(serialNumber)
        .style({
          fill: "F2F2F2",
          horizontalAlignment: "left",
          verticalAlignment: "left",
          bold: true,
        });
      sheet
        .cell(15, columnIndex + 7)
        .value(item.CategoryName)
        .style({
          fill: "F2F2F2",
          horizontalAlignment: "left",
          verticalAlignment: "left",
          bold: true,
        });
      const mergeEndColumn = columnIndex + 5;
      sheet.range(10, columnIndex + 2, 10, mergeEndColumn).merged(true);
      sheet.cell(10, columnIndex + 4).value("");
      const rowIndex = index + 16;
      const Column1 = sheet.column(columnIndex + 6);
      Column1.width(2);
      const Column2 = sheet.column(columnIndex + 3);
      Column2.width(2);
      const Column3 = sheet.column(columnIndex + 4);
      Column3.width(2);
      const Column4 = sheet.column(columnIndex + 5);
      Column4.width(2);

      const subClr1 = item.matches[0]?.Colour?.substring(1);
      const subClr2 = item.matches[1]?.Colour?.substring(1);
      const subClr3 = item.matches[2]?.Colour?.substring(1);

      sheet.cell(rowIndex, columnIndex + 2).value(serialNumber + (index + 1));
      sheet.cell(rowIndex, columnIndex + 3).style({ fill: colour });
      sheet.cell(rowIndex, columnIndex + 4).style({ fill: subClr1 });
      sheet.cell(rowIndex, columnIndex + 5).style({ fill: subClr2 });
      sheet.cell(rowIndex, columnIndex + 6).style({ fill: subClr3 });
      sheet.cell(rowIndex, columnIndex + 7).value(item.Question);

      const tableRange = sheet.range(`G${16 + index}:J${16 + index}`);
      if (item.NumberOfScore === 2) {
        const mergedRange = sheet.range(`G${rowIndex}:H${rowIndex}`);
        mergedRange.merged(true);
        const subClr1 = item.matches[0]?.Colour?.substring(1);
        const mergedRange2 = sheet.range(`I${rowIndex}:J${rowIndex}`);
        mergedRange2.merged(true).style({ fill: subClr1 });
      }
      tableRange.style({
        border: true,
        borderColor: "000000",
      });
    });

    filteredDataB.forEach((item, index) => {
      const columnIndex = 20;
      const serialNumber = item.CategoryLabel;
      const colour = item.Colour?.substring(1);
      const categoryNameColumn = sheet.column(columnIndex + 2);
      categoryNameColumn.width();
      const NumberOfScoreColumn = sheet.column(columnIndex + 3);
      NumberOfScoreColumn.width();
      sheet
        .cell(15, columnIndex + 2)
        .value(serialNumber)
        .style({
          fill: "F2F2F2",
          horizontalAlignment: "left",
          verticalAlignment: "left",
          bold: true,
        });
      sheet
        .cell(15, columnIndex + 7)
        .value(item.CategoryName)
        .style({
          fill: "F2F2F2",
          horizontalAlignment: "left",
          verticalAlignment: "left",
          bold: true,
        });
      const mergeEndColumn = columnIndex + 5;
      sheet.range(10, columnIndex + 2, 10, mergeEndColumn).merged(true);
      sheet.cell(10, columnIndex + 4).value("");
      const rowIndex = index + 16;
      const Column1 = sheet.column(columnIndex + 6);
      Column1.width(2);
      const Column2 = sheet.column(columnIndex + 3);
      Column2.width(2);
      const Column3 = sheet.column(columnIndex + 4);
      Column3.width(2);
      const Column4 = sheet.column(columnIndex + 5);
      Column4.width(2);
      const subClr1 = item.matches[0]?.Colour?.substring(1);
      const subClr2 = item.matches[1]?.Colour?.substring(1);
      const subClr3 = item.matches[2]?.Colour?.substring(1);

      sheet.cell(rowIndex, columnIndex + 2).value(serialNumber + (index + 1));
      sheet.cell(rowIndex, columnIndex + 3).style({ fill: colour });
      sheet.cell(rowIndex, columnIndex + 4).style({ fill: subClr1 });
      sheet.cell(rowIndex, columnIndex + 5).style({ fill: subClr2 });
      sheet.cell(rowIndex, columnIndex + 6).style({ fill: subClr3 });
      sheet.cell(rowIndex, columnIndex + 7).value(item.Question);
      const tableRange = sheet.range(`W${16 + index}:Z${16 + index}`);

      if (item.NumberOfScore === 2) {
        const mergedRange = sheet.range(`W${rowIndex}:X${rowIndex}`);
        mergedRange.merged(true);
        const subClr1 = item.matches[0]?.Colour?.substring(1);
        const mergedRange2 = sheet.range(`Y${rowIndex}:Z${rowIndex}`);
        mergedRange2.merged(true).style({ fill: subClr1 });
      }
      tableRange.style({
        border: true,
        borderColor: "000000",
      });
    });

    filteredDataC.forEach((item, index) => {
      const columnIndex = 35;
      const serialNumber = item.CategoryLabel;
      const colour = item.Colour?.substring(1);
      const categoryNameColumn = sheet.column(columnIndex + 2);
      categoryNameColumn.width();
      const NumberOfScoreColumn = sheet.column(columnIndex + 3);
      NumberOfScoreColumn.width();
      sheet
        .cell(15, columnIndex + 2)
        .value(serialNumber)
        .style({
          fill: "F2F2F2",
          horizontalAlignment: "left",
          verticalAlignment: "left",
          bold: true,
        });
      sheet
        .cell(15, columnIndex + 7)
        .value(item.CategoryName)
        .style({
          fill: "F2F2F2",
          horizontalAlignment: "left",
          verticalAlignment: "left",
          bold: true,
        });
      const mergeEndColumn = columnIndex + 5; // Determine the ending column for merging
      sheet.range(10, columnIndex + 2, 10, mergeEndColumn).merged(true);
      sheet.cell(10, columnIndex + 4).value("");
      const rowIndex = index + 16;
      const Column1 = sheet.column(columnIndex + 6);
      Column1.width(2);
      const Column2 = sheet.column(columnIndex + 3);
      Column2.width(2);
      const Column3 = sheet.column(columnIndex + 4);
      Column3.width(2);
      const Column4 = sheet.column(columnIndex + 5);
      Column4.width(2);
      const subClr1 = item.matches[0]?.Colour?.substring(1);
      const subClr2 = item.matches[1]?.Colour?.substring(1);
      const subClr3 = item.matches[2]?.Colour?.substring(1);

      sheet.cell(rowIndex, columnIndex + 2).value(serialNumber + (index + 1));
      sheet.cell(rowIndex, columnIndex + 3).style({ fill: colour });
      sheet.cell(rowIndex, columnIndex + 4).style({ fill: subClr1 });
      sheet.cell(rowIndex, columnIndex + 5).style({ fill: subClr2 });
      sheet.cell(rowIndex, columnIndex + 6).style({ fill: subClr3 });
      sheet.cell(rowIndex, columnIndex + 7).value(item.Question);

      const tableRange = sheet.range(`AL${16 + index}:AO${16 + index}`);
      if (item.NumberOfScore === 2) {
        const mergedRange = sheet.range(`AL${rowIndex}:AM${rowIndex}`);
        mergedRange.merged(true);
        const subClr1 = item.matches[0]?.Colour?.substring(1);
        const mergedRange2 = sheet.range(`AN${rowIndex}:AO${rowIndex}`);
        mergedRange2.merged(true).style({ fill: subClr1 });
      }
      tableRange.style({
        border: true,
        borderColor: "000000",
      });
    });
  });
  workbook.deleteSheet("Sheet1");
  const buffer = await workbook.outputAsync();
  return buffer;
};
