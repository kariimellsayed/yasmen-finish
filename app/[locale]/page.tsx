import Landing from "./components/Landing";
import BestSeller from "./components/BestSeller";

export default function HomePage() {
  return (
    <main>
      <Landing />
      <BestSeller  value={"products"}/>
    </main>
  );
}
