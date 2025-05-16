import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  imageUrl: string;
  achievements: string[];
  delay?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  imageUrl,
  achievements,
  delay = "delay-0"
}: ProjectCardProps) => {
  return (
    <div
      className={`glass-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in ${delay} bg-white dark:bg-gray-800`}
    >
      <div className="h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-light">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">
            Key Achievements:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full dark:bg-primary/20 dark:text-primary-light"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <Github size={16} /> Code
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <ExternalLink size={16} /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
