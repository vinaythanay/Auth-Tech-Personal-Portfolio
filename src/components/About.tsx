import { Code, Database, Linkedin, Github } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-[hsl(var(--section-bg))] text-[hsl(var(--foreground))]"
    >
      <div className="section-container">
        <h2 className="section-title pb-4">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="col-span-2 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-primary dark:text-primary-light">
              Who Am I?
            </h3>
            <p className="text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
              I'm an aspiring IT specialist with a strong foundation in
              Salesforce CRM and full-stack development. Currently pursuing my
              B.Tech in Electronics and Communication Engineering at Vishnu
              Institute of Technology, I combine my technical education with
              hands-on experience in building modern web applications.
            </p>
            <p className="text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
              My expertise lies in customizing Salesforce using Flows, Apex,
              and Process Builder to optimize workflows and enhance data
              visibility. I'm also proficient in building scalable web
              applications with React, Node.js, and Firebase, focusing on
              delivering secure and efficient solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="https://www.linkedin.com/in/agathamudi-vinay-kumar-0677a4235/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 btn-primary"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href="https://github.com/vinaythanay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 btn-secondary"
              >
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>

          <div className="animate-fade-in delay-200">
            <div className="glass-card rounded-xl p-6 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-60">
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-light">
                Education
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Bachelor of Technology
                </h4>
                <p className="text-muted-foreground dark:text-gray-300">
                  Electronics and Communication Engineering
                </p>
                <p className="text-muted-foreground dark:text-gray-300">
                  Vishnu Institute of Technology, Bhimavaram
                </p>
                <p className="text-muted-foreground dark:text-gray-300">2021-2025</p>
                <p className="text-muted-foreground dark:text-gray-300">GPA: 8.86</p>
              </div>

              <h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-light">
                Core Competencies
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Code
                    className="text-primary mt-1 dark:text-primary-light"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Full-Stack Development
                    </h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">
                      React.js, Node.js, Express.js
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Database
                    className="text-primary mt-1 dark:text-primary-light"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Salesforce CRM
                    </h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">
                      Apex, Flows, Process Builder
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Code
                    className="text-primary mt-1 dark:text-primary-light"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Cloud Technologies
                    </h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">
                      AWS, Firebase
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
