import { Scissors } from "lucide-react";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white" aria-hidden="true">
            <Scissors className="h-5 w-5" />
          </span>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            CraftPrice
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Calculator />
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} CraftPrice. Built for makers.</p>
      </footer>
    </div>
  );
}

export default App;
