
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce platform with dynamic product listings, cart, and checkout features.",
      technologies: ["ReactJS", "Node.js", "JWT"],
      githubLink: "https://github.com/vinaythanay/Ecommerce",
      demoLink: "https://vinaythanay.netlify.app/",
      imageUrl: "https://imagizer.imageshack.com/img924/6853/pnAb42.png",
      achievements: [
        "Built platform supporting 100+ products with role-based access",
        "Secured user access with JWT, cutting unauthorized logins by 95%",
        "Improved filtering and order speed by 30%, increasing retention by 20%"
      ],
      delay: "delay-0"
    },
    {
      title: "Budget Finance Tracker",
      description: "Real-time finance tracker enabling users to monitor financial activity across multiple categories.",
      technologies: ["ReactJS", "NodeJS", "Chart.js", "Firebase"],
      githubLink: "https://github.com/vinaythanay/Budget-Tracker-Project",
      demoLink: null,
      imageUrl: "https://imagizer.imageshack.com/img922/6228/fziZLV.png",
      achievements: [
        "Improved budgeting accuracy by 40% with real-time tracking",
        "Enhanced financial planning efficiency by 35% with seamless categorization"
      ],
      delay: "delay-100"
    },
    {
      title: "CRM Application For Client & Property Management",
      description: "Salesforce CRM to handle client profiles and property inquiries, improving lead conversion workflow.",
      technologies: ["Salesforce CRM", "Flow Builder", "Apex", "SOQL", "Web Forms"],
      githubLink: "https://github.com/vinaythanay/ClientsPropertyLWC",
      demoLink: "https://form.jotform.com/243015395174051",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=450",
      achievements: [
        "Architected CRM handling 50+ client profiles and 100+ property inquiries",
        "Reduced manual entry by 60% through automation",
        "Boosted engagement by 25% through personalized property matching"
      ],
      delay: "delay-200"
    },
    {
      title: "Task Manager – GUI-Based Application",
      description: "Desktop task manager supporting dozens of categorized tasks with real-time updates using Tkinter.",
      technologies: ["Python", "Tkinter", "JSON"],
      githubLink: "https://github.com/vinaythanay/task-manager",
      demoLink: null,
      imageUrl: "https://imagizer.imageshack.com/img922/8150/AHyJgr.png",
      achievements: [
        "Created task manager with JSON-based persistence for reliability",
        "Reduced task tracking overhead by 50% through intuitive UI"
      ],
      delay: "delay-300"
    },
    {
      title: "Smart Plant Monitoring System",
      description: "IoT-based monitoring system supporting real-time environmental tracking of plants.",
      technologies: ["ESP8266", "Arduino IDE", "Blynk IoT"],
      githubLink: null,
      demoLink: null,
      imageUrl: "https://imagizer.imageshack.com/img923/6558/EfHdV3.png",
      achievements: [
        "Designed system for real-time monitoring of 10+ plants",
        "Reduced water usage by 30% with automated watering",
        "Increased plant health checks by 80% through remote monitoring"
      ],
      delay: "delay-400"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-[hsl(var(--section-bg))] text-[hsl(var(--foreground))]">
  <div className="section-container">
    <h2 className="section-title pb-4">Projects</h2>
    <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
      A showcase of my technical projects ranging from web applications to IoT solutions,
      demonstrating my skills in full-stack development, Salesforce CRM, and more.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard 
          key={index}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          githubLink={project.githubLink}
          demoLink={project.demoLink}
          imageUrl={project.imageUrl}
          achievements={project.achievements}
          delay={project.delay}
        />
      ))}
    </div>
  </div>
</section>

  );
};

export default Projects;
