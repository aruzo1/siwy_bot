import { MOT_05_TESTS, MOT_06_TESTS } from "@/lib/constants";
import { TestItem } from "./test-item";

export const TestsList = () => {
  return (
    <section>
      <h2 className="mt-16 text-4xl font-bold">Lista testów</h2>

      <h3 className="mt-12 text-2xl font-bold">MOT 05</h3>
      <ul className="mt-8 flex flex-col gap-3">
        {MOT_05_TESTS.map((test) => (
          <TestItem key={test.name} {...test} />
        ))}
      </ul>

      <h3 className="mt-12 text-2xl font-bold">MOT 06</h3>
      <ul className="mt-8 flex flex-col gap-3">
        {MOT_06_TESTS.map((test) => (
          <TestItem key={test.name} {...test} />
        ))}
      </ul>
    </section>
  );
};
