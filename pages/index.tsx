import { FormEvent, useCallback, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(40);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [resultUrl, setResultUrl] = useState<null | string>(null);

  const handleUsername = useCallback((e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }, []);

  const handlePassword = useCallback((e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }, []);

  const handleUrl = useCallback((e: FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  }, []);

  const handleCorrectAnswers = useCallback((e: FormEvent<HTMLInputElement>) => {
    setCorrectAnswers(e.currentTarget.value);
  }, []);
  
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      setResultUrl(null);
      setIsLoading(true);

      axios
        .post("/api/complete-test", { username, password, url, correctAnswers: parseInt(correctAnswers) })
        .then((res) => setResultUrl(res.data))
        .catch((err) => setError(err.response.data))
        .finally(() => setIsLoading(false));

      setUrl("");
    },
    [username, password, url]
  );

  return (
    <form
      className="max-w-screen-sm mx-auto flex flex-col items-center py-16 text-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold">Dziadek testy haker</h1>

      {error && <span className="mt-8 text-lg text-red-500">{error}</span>}

      <label className="label mt-8" htmlFor="username">
        Nazwa użytkownika
      </label>
      <input
        className="input mt-2"
        id="username"
        name="username"
        type="text"
        placeholder="Nazwa użytkownika"
        value={username}
        onChange={handleUsername}
        required
      />

      <label className="label mt-4" htmlFor="password">
        Hasło
      </label>
      <input
        className="input mt-2"
        id="password"
        name="password"
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={handlePassword}
        required
      />

      <label className="label mt-4" htmlFor="url">
        Url
      </label>
      <input
        className="input mt-2"
        id="url"
        name="url"
        type="url"
        placeholder="Url"
        value={url}
        onChange={handleUrl}
        required
      />

      <label className="label mt-4" htmlFor="url">
        Ilość złych odpowiedzi
      </label>
      <input
        className="input mt-2"
        id="correctAnswers"
        name="correctAnswers"
        type="number"
        placeholder="Ilość"
        value={correctAnswers}
        onChange={handleCorrectAnswers}
        required
      />
      
      <button className="btn mt-8" type="submit">
        {isLoading ? "W trakcie hakowania..." : "Hakuj"}
      </button>

      {resultUrl && (
        <a className="link mt-8" href={resultUrl} target="_blank">
          {resultUrl}
        </a>
      )}
    </form>
  );
};

export default HomePage;
