import { TestsCrawler } from "@/lib/tests-crawler";
import type { NextApiRequest, NextApiResponse } from "next";

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
      req.body.correctAnswers
    );

    res.status(200).json(resultUrl);
  } catch (e) {
    res.status(400).json(e instanceof Error ? e.message : "Error");
  }
};

export default handler;
