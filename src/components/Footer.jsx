import { PROFILE } from "../data";

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-zinc-400">
          <div>© {new Date().getFullYear()} {PROFILE.name}</div>
          <div className="flex gap-4">
            <a className="hover:text-white transition" href="#top">Back to top</a>
            <a className="hover:text-white transition" href="#work">Work</a>
            <a className="hover:text-white transition" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
