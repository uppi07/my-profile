import Section from "./Section";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data";

export default function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Projects that ship"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
