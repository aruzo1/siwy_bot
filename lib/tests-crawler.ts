import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import * as cheerio from "cheerio";
import { AuthenticationException } from "./exceptions/authentication-exception";
import { InvalidUrlException } from "./exceptions/invalid-url-exception";
import { urls } from "./urls";
import { TestNotFoundException } from "./exceptions/test-not-found-exception";

export class TestsCrawler {
  client = wrapper(
    axios.create({
      baseURL: urls.base,
      withCredentials: true,
      jar: new CookieJar(),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }),
  );

  async completeTest(
    username: string,
    password: string,
    testUrl: string,
    correctAnswers: number,
  ) {
    await this.login(username, password);

    let html = await this.startTest(testUrl);

    const wrongQuestionsIndexes: number[] = [];

    while (wrongQuestionsIndexes.length < correctAnswers) {
      const randomIndex = Math.floor(Math.random() * 40);

      if (!wrongQuestionsIndexes.includes(randomIndex)) {
        wrongQuestionsIndexes.push(randomIndex);
      }
    }

    for (let i = 0; i < 40; i++) {
      html = await this.answerQuestion(
        html,
        i,
        !wrongQuestionsIndexes.includes(i),
        i < 39,
      );
    }

    const $ = cheerio.load(html);
    const resultQuery = $('a[id="przycisk_udostepnij_wynik"]').attr("params");

    return `${urls.base}/${urls.viewAnswers}?${resultQuery}`;
  }

  private async login(username: string, password: string) {
    const res = await this.client.post(urls.login, { username, password });

    if (!res.data.includes(username)) {
      throw new AuthenticationException();
    }
  }

  private async startTest(testUrl: string) {
    const testId = TestsCrawler.getTestId(testUrl);

    const res = await this.client.post(
      urls.test,
      {
        ilosc_pytan: 40,
        "test_id_1[]": testId,
        potwierdz_test: "",
      },
      { params: { uri: testUrl } },
    );

    if (res.data.includes("Ten test jest obecnie niedostępny.")) {
      throw new TestNotFoundException();
    }

    return res.data;
  }

  private async answerQuestion(
    html: string,
    index: number,
    correct: boolean,
    next: boolean,
  ) {
    const $ = cheerio.load(html);

    const questionId = parseInt($('input[name="question_id"]').val() as string);
    const allAnswers = $('tr[class*="info"]').toArray();

    const correctAnswer = $(
      allAnswers.find((e) =>
        $(e)
          .attr("class")!
          .includes(`${questionId * 6789}`),
      ),
    )
      .find("input")
      .val();

    const incorrectAnswer = $(
      allAnswers.find(
        (e) =>
          !$(e)
            .attr("class")!
            .includes(`${questionId * 6789}`),
      ),
    )
      .find("input")
      .val();

    const res = await this.client.post(urls.question, {
      [`questions[${questionId}]`]: correct ? correctAnswer : incorrectAnswer,
      question_id: questionId,
      question_number: index,
      [next ? "next" : "submit"]: "",
    });

    return res.data;
  }

  private static getTestId(testUrl: string) {
    const match = testUrl.match(/test-(\d+)-/);

    if (match && match[1]) {
      return match[1];
    } else {
      throw new InvalidUrlException();
    }
  }
}
