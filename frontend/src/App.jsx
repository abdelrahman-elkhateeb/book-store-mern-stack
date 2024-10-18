import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>navbar</nav>
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
