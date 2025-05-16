import { useState } from "react";
import { Code, Database, Server, Github, Users,
  Handshake,
  Heart,
  Brain,
  MessageCircle} from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("languages");
  
  const skillCategories = [
    {
      id: "languages",
      title: "Languages",
      skills: [
        { name: "Python", icon: <img src="/image-uploads/python-logo.png" alt="Python" className="w-10 h-10 object-contain" />, color: "bg-blue-100" },
        { name: "JavaScript", icon: <img src="/image-uploads/JavaScript-logo.png" alt="Javascript" className="w-10 h-10 object-contain" />, color: "bg-yellow-100" },
        { name: "SQL", icon: <img src="/image-uploads/sql.jpeg" alt="SQL" className="w-10 h-10 object-contain" />, color: "bg-gray-100" },
      ],
    },
    {
      id: "technologies",
      title: "Technologies",
      skills: [
        { name: "HTML", icon: <img src="/image-uploads/html.jpeg" alt="HTML" className="w-10 h-10 object-contain" />, color: "bg-orange-100" },
        { name: "CSS", icon: <img src="/image-uploads/css.jpeg" alt="Power BI" className="w-10 h-10 object-contain" />, color: "bg-blue-100" },
        { name: "React.js", icon: <img src="/image-uploads/React-icon.svg" alt="React.js" className="w-10 h-10 object-contain" />, color: "bg-blue-100" },
        { name: "Node.js", icon: <img src="/image-uploads/nodejsStackedBlack.svg" alt="Node.js" className="w-10 h-10 object-contain" />, color: "bg-green-100" },
        { name: "Express.js",icon: <img src="/image-uploads/Expressjs.png" alt="Express.js" className="w-10 h-10 object-contain" />, color: "bg-gray-100" },
        { name: "Salesforce CRM", icon: <Code className="w-6 h-6 text-blue-500" />, color: "bg-blue-100" },
        { name: "AWS Cloud", icon: <Server className="w-6 h-6 text-yellow-600" />, color: "bg-yellow-100" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Databases",
      skills: [
        { name: "VS Code", icon: <img src="/image-uploads/vscode.png" alt="VS Code" className="w-10 h-10 object-contain" />, color: "bg-blue-100" },
        { name: "GitHub", icon: <Github className="w-6 h-6 text-gray-700" />, color: "bg-gray-100" },
        { name: "Power BI", icon: <img src="/image-uploads/powerbi.jpeg" alt="Power BI" className="w-10 h-10 object-contain" />, color: "bg-yellow-100" },
        { name: "MongoDB", icon: <img src="/image-uploads/mongodb.jpeg" alt="MongoDB" className="w-10 h-10 object-contain" />, color: "bg-green-100" },
        { name: "Firebase DB", icon: <img src="/image-uploads/firebase.svg" alt="Firebase" className="w-10 h-10 object-contain" />, color: "bg-yellow-100" },
      ],
    },
    {
      id: "soft",
      title: "Soft Skills",
      skills: [
        { name: "Leadership", icon: <Users className="w-6 h-6 text-purple-500"  />, color: "bg-purple-100" },
        { name: "Collaboration", icon: <Handshake className="w-6 h-6 text-blue-500" />, color: "bg-blue-100" },
        { name: "Emotional Intelligence", icon: <Heart className="w-6 h-6 text-pink-500" />, color: "bg-pink-100" },
        { name: "Problem-Solving", icon: <Brain className="w-6 h-6 text-orange-500" />, color: "bg-orange-100" },
        { name: "Communication",icon: <MessageCircle className="w-6 h-6 text-green-500"/>, color: "bg-green-100" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title pb-4 text-gray-900 dark:text-gray-100">Skills</h2>
        
        <div className="mt-12 max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-3 rounded-full font-medium transition-all shadow-sm ${
                  activeTab === category.id
                    ? "bg-primary text-white shadow-md transform -translate-y-1"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.title}
              </button>
            ))}
          </div>
          
          {/* Skills Grid */}
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {skillCategories
                .find((category) => category.id === activeTab)
                ?.skills.map((skill, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger>
                      <Card className="h-full overflow-hidden border-none shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-700">
                        <CardHeader className="p-4 flex justify-center items-center">
                          <div className={`${skill.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                            {skill.icon}
                          </div>
                        </CardHeader>
                        <CardContent className="text-center p-4 pt-0">
                          <h3 className="font-semibold mb-2">{skill.name}</h3>
                          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-700 ease-in-out" 
                              style={{ width: `${Math.random() * 30 + 70}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-0 shadow-lg">
                      <Card>
                        <CardHeader className="bg-gradient-to-r from-primary/80 to-primary text-white">
                          <CardTitle>{skill.name}</CardTitle>
                          <CardDescription className="text-white/90">Professional Skill</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Advanced proficiency in {skill.name} with hands-on experience in various professional projects.
                          </p>
                        </CardContent>
                      </Card>
                    </HoverCardContent>
                  </HoverCard>
                ))}
            </div>
          </div>
          
          {/* Professional Links */}
          <div className="mt-16 glass-card rounded-xl p-8 animate-fade-in delay-200 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-8 text-primary text-center">Professional Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="https://www.salesforce.com/trailblazer/b2d6irfrowr3dgtqsf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <img 
                    src="https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg" 
                    alt="Salesforce" 
                    className="w-10 h-10 object-contain rounded-full"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">Trailhead Profile</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Salesforce Certifications & Badges</p>
              </a>
              
              <a
                href="https://www.hackerrank.com/profile/21pa1a0407"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/HackerRank_Icon-1000px.png/800px-HackerRank_Icon-1000px.png" 
                    alt="HackerRank" 
                    className="w-10 h-10 object-contain rounded-full"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">HackerRank</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Coding Challenges & Certifications</p>
              </a>
              
              <a
                href="https://www.credly.com/users/vinay-kumar-agathamudi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <img 
                    src="https://imagizer.imageshack.com/img922/549/cYZQ0V.jpg" 
                    alt="Credly" 
                    className="w-10 h-10 object-contain rounded-full"
                  />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">Credly Profile</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Digital Badges & Achievements</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
