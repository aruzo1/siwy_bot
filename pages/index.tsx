import { CompleteTestForm, TestsList } from "@/components";
import { GetServerSideProps, NextPage } from "next";
import fs from "fs";

const HomePage: NextPage<{ testsDoneCount: string }> = ({ testsDoneCount }) => {
  return (
    <div className="container py-16">
      <CompleteTestForm />
      <TestsList />
      <span className="mt-16 block text-xl font-bold">{testsDoneCount}</span>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let testsDoneCount = "0";

  try {
    testsDoneCount = fs.readFileSync("./count").toString();
  } catch {}

  return { props: { testsDoneCount } };
};

export default HomePage;
