import { CompleteTestForm, TestsList } from "@/components";

const HomePage = () => {
  return (
    <div className="container py-16">
      <CompleteTestForm />
      <TestsList />
    </div>
  );
};

export default HomePage;
