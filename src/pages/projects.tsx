import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ProjectCard, {type Project} from '@site/src/components/ProjectCard';

const projects: Project[] = [
  {
    title: 'Elroy',
    description: 'AI memory and reminder assistant that helps you remember important information and get timely reminders.',
    githubUrl: 'https://github.com/elroy-bot/elroy',
    websiteUrl: 'https://elroy.bot',
    featured: true,
  },
  {
    title: 'blog',
    description: 'Personal blog built with Docusaurus, featuring thoughts on software, AI, and building things.',
    githubUrl: 'https://github.com/tombedor/blog',
    stars: 2,
    language: 'TypeScript',
  },
  {
    title: 'just-claude',
    description: 'Integration tool for Claude Code, making it easier to work with Claude AI in your development workflow.',
    githubUrl: 'https://github.com/tombedor/just-claude',
    stars: 3,
    language: 'JavaScript',
  },
  {
    title: 'llm-cmd2',
    description: 'AI-powered terminal command generator that helps you discover and use command-line tools more effectively.',
    githubUrl: 'https://github.com/tombedor/llm-cmd2',
    stars: 2,
    language: 'Shell',
  },
  {
    title: 'llm-tools-memory',
    description: 'Memory management tools for LLMs, enabling better context retention and conversation continuity.',
    githubUrl: 'https://github.com/tombedor/llm-tools-memory',
    stars: 3,
    language: 'Python',
  },
];

export default function Projects(): ReactNode {
  return (
    <Layout
      title="Projects"
      description="Explore my open source projects and tools"
    >
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--lg">
          <Heading as="h1">Projects</Heading>
          <p>Open source projects and tools I've built</p>
        </div>
        <div className="row">
          {projects.map((project, idx) => (
            <div key={idx} className="col col--6 margin-bottom--lg">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
