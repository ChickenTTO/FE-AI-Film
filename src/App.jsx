import React from "react";
import { Film } from "lucide-react";
import FilmGenerator from "./components/FilmGenerator";

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col selection:bg-brand-primary/30">
      {/* Navbar Pattern */}
      <header className="fixed top-0 w-full z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Film size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              AI Film by Nguyễn Thành Đạt
            </h1>
          </div>
          <div className="text-sm text-dark-muted font-medium">Beta v1.0</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-28 pb-12 flex flex-col animate-fade-in">
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Bring your ideas to life.
          </h2>
          <p className="text-lg text-dark-muted max-w-2xl mx-auto">
            Describe your movie concept and let our multi-model AI pipeline
            script, storyboard, render, and mix the perfect short film.
          </p>
        </div>

        <FilmGenerator />
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-dark-border/50 text-dark-muted text-sm pb-8">
        &copy; {new Date().getFullYear()} AI Film by Mr.Nguyễn Thành Đạt with Mr.Bùi Vinh Bình
      </footer>
    </div>
  );
}

export default App;
