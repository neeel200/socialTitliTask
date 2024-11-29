const { PDFNet } = require("@pdftron/pdfnet-node");
const fs = require("fs");
const userSchema = require("../models/useSchema");
const path = require("path");
PDFNet.initialize(
  "demo:1732691719358:7ec59cba0300000000cf145d824db4a63862688b1ebfc0370c8037a49e"
);

const fetchAndGenerateClientPdf = async (req, res, next) => {
  const { id } = req.params;

  const user = await userSchema.findOne({ id: Number(id) });
  const name = user.name;
  const floor = user.address.floorNo;
  const wing = user.address.wing;
  const email = user.emailId;
  const agreementValue = user.agreementValue;
  const reraCarpetAreainSqFt = user.landAreaDetails.reraCarpetAreainSqFt;
  const reraCarpetAreaSqMtr =
    user.landAreaDetails.reraCarpetAreainSqFt * 0.092903;
  const BalconyAreaSqFt = user.landAreaDetails.BalconyAreaSqFt;
  const receivedAmount = user.receivedAmount;
  const flatNo = user.address.flatNo;

  const inputPath = path.resolve(__dirname, "template.pdf");
  const outputPath = path.resolve(__dirname, "out.pdf");

  const replaceText = async () => {
    const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    await pdfdoc.initSecurityHandler();
    const replacer = await PDFNet.ContentReplacer.create();
    const len = await pdfdoc.getPageCount();
    for (let i = 1; i <= len; i++) {
      const page = await pdfdoc.getPage(i);

      await replacer.setMatchStrings("{{", "}}");
      await replacer.addString("name", name);
      await replacer.addString("wing", wing);
      await replacer.addString("floor", floor);
      await replacer.addString("emailID", email);
      await replacer.addString("agreementValue", String(agreementValue));
      await replacer.addString(
        "reraCarpetAreaSqMtr",
        String(reraCarpetAreaSqMtr)
      );
      await replacer.addString(
        "reraCarpetAreaSqFt",
        String(reraCarpetAreainSqFt)
      );
      await replacer.addString("BalconyAreaSqFt", String(BalconyAreaSqFt));
      await replacer.addString("flatNo", String(flatNo));
      await replacer.addString("receivedAmount", String(receivedAmount));

      await replacer.process(page);
    }
    pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  };

  PDFNet.runWithCleanup(replaceText).then(() => {
    fs.readFile(outputPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(err);
      } else {
        res.setHeader("ContentType", "application/pdf");
        res.end(data);
      }
    });
  });
};

const getWingClients = async (req, res, next) => {
  try {
    let { wing, page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;
    const wingClients = await userSchema.aggregate([
      {
        $match: {
          "address.wing": wing,
        },
      },
      { $sort: { _id: 1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
    return res.status(200).json({ data: wingClients });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { fetchAndGenerateClientPdf, getWingClients };
