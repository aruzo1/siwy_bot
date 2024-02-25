import { NextApiRequest, NextApiResponse } from "next";
import { TestsCrawler } from "@/lib/tests-crawler";
import fs from "fs";
import path from "path";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.method !== "POST" ||
    !req.body.username ||
    !req.body.password ||
    !req.body.url ||
    !req.body.correctAnswers
  ) {
    return res.status(400).end();
  }

  const crawler = new TestsCrawler();

  try {
    const resultUrl = await crawler.completeTest(
      req.body.username,
      req.body.password,
      req.body.url,
      req.body.correctAnswers,
    );

    let testsDoneCount = 0;

    try {
      testsDoneCount = parseInt(fs.readFileSync("./count").toString(), 10);
    } catch {}

    fs.writeFileSync("./count", (testsDoneCount + 1).toString());

    res.status(200).json(resultUrl);
  } catch (e) {
    res.status(400).json(e instanceof Error ? e.message : "Error");
  }
};

export default handler;
