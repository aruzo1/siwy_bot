import { FormEvent, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FieldSet, Input, Label } from "@/components";

export const CompleteTestForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState("40");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const percentageScore = useMemo(
    () => (parseInt(correctAnswers) / 40) * 100,
    [correctAnswers],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      setError(null);
      setIsLoading(true);
      setResultUrl(null);

      axios
        .post("/api/complete-test", {
          username,
          password,
          url,
          correctAnswers: parseInt(correctAnswers),
        })
        .then((res) => setResultUrl(res.data))
        .catch((err) => setError(err.response.data))
        .finally(() => setIsLoading(false));

      setUrl("");
    },
    [username, password, url, correctAnswers],
  );

  return (
    <form className="max-w-screen-sm" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold">Dziadek testy haker</h1>

      {error && (
        <span className="mt-8 block text-lg text-red-500">{error}</span>
      )}

      <div className="mt-8 flex flex-col gap-4">
        <FieldSet>
          <Label htmlFor="username">Nazwa użytkownika</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FieldSet>

        <FieldSet>
          <Label htmlFor="password">Hasło</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FieldSet>

        <FieldSet>
          <Label htmlFor="url">Url</Label>
          <Input
            id="url"
            name="url"
            type="url"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </FieldSet>

        <FieldSet>
          <Label htmlFor="correctAnswers">Ilość dobrych odpowiedzi</Label>
          <Input
            id="correctAnswers"
            name="correctAnswers"
            type="number"
            value={correctAnswers}
            min={0}
            max={40}
            onChange={(e) => setCorrectAnswers(e.target.value)}
            required
          />
        </FieldSet>
      </div>

      <span className="mt-8 block text-xl">
        Wynik w procentach:{" "}
        <span className="font-bold">{percentageScore}%</span>
      </span>

      <button className="btn mt-8 w-full sm:w-auto" type="submit">
        {isLoading ? "W trakcie hakowania..." : "Hakuj"}
      </button>

      {resultUrl && (
        <Link
          className="mt-8 block max-w-full break-all rounded border border-green-700 bg-green-900 p-4 text-green-300"
          href={resultUrl}
          target="_blank"
        >
          {resultUrl}
        </Link>
      )}
    </form>
  );
};
