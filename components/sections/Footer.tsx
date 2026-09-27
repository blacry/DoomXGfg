export default function Footer() {
  return (
    <footer className="relative py-8 px-4 border-t border-zinc-900 bg-black text-center z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} GeeksForGeeks Student Chapter, Bennett University.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Instagram</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Twitter</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Discord</a>
        </div>
      </div>
    </footer>
  );
}
