const navLinks = [
  {
    name: "Projects",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Drive",
    link: "/drive",
  },
  {
    name: "Status",
    link: "/status",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Games", imgPath: "/images/concepts.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Games", imgPath: "/images/concepts.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years of Coding" },
  { value: 15, suffix: "+", label: "Personal Projects" },
  { value: 8, suffix: "+", label: "Web Applications" },
  { value: 3, suffix: "+", label: "Mobile Apps" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Creative Problem Solver",
    desc: "Approaching challenges with innovative solutions and creative thinking.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Fast Learner",
    desc: "Quickly adapting to new technologies and programming languages.",
  },
  {
    imgPath: "/images/time.png",
    title: "Passionate Developer",
    desc: "Dedicated to creating clean, efficient code and beautiful user experiences.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Created my first full-stack web application with React and Node.js, implementing user authentication and real-time data updates.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Personal Project: Social Media Dashboard",
    date: "January 2023 - March 2023",
    responsibilities: [
      "Designed and implemented a responsive user interface using React and Tailwind CSS",
      "Built a RESTful API with Node.js and Express for user data management",
      "Implemented real-time notifications using WebSockets",
    ],
  },
  {
    review: "Collaborated with two classmates to create a mobile game for a school competition, winning second place overall.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "School Project: Mobile Game Development",
    date: "June 2022 - September 2022",
    responsibilities: [
      "Developed game mechanics and UI elements using Unity and C#",
      "Designed character assets and animations",
      "Implemented scoring system and leaderboard functionality",
    ],
  },
  {
    review: "Volunteered to build a website for a local community center, providing a platform for event announcements and resource sharing.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Volunteer Work: Community Center Website",
    date: "March 2021 - May 2021",
    responsibilities: [
      "Created a responsive website using HTML, CSS, and JavaScript",
      "Implemented a content management system for staff to update information",
      "Optimized the site for performance and accessibility",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Ms. Tanaka",
    mentions: "@tanaka_sensei",
    review:
      "Alora's technical skills are exceptional for her age. She consistently demonstrates both creativity and logical thinking in her programming projects. Her work ethic and dedication to learning are truly impressive.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Hiroshi Yamada",
    mentions: "@hiroshi_y",
    review:
      "I had the pleasure of mentoring Alora during a local coding bootcamp. Her ability to grasp complex concepts quickly and implement them in practical applications stood out among her peers. She has a bright future in tech.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Yuki Nakamura",
    mentions: "@yuki_dev",
    review:
      "Collaborating with Alora on our school's hackathon project was an incredible experience. Her problem-solving abilities and attention to detail helped us create a polished final product that impressed the judges.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Kenji Sato",
    mentions: "@kenji_s",
    review:
      "As the director of the community center, I was amazed by the website Alora created for us. She took the time to understand our needs and delivered a solution that was both beautiful and functional. Her technical skills are matched by her thoughtfulness.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Aiko Watanabe",
    mentions: "@aiko_w",
    review:
      "Alora's mobile game design showed incredible creativity and technical skill. As her teammate, I was impressed by how she balanced aesthetic considerations with performance optimization throughout the development process.",
    imgPath: "/images/client4.png",
  },
  {
    name: "Mr. Kobayashi",
    mentions: "@kobayashi_tech",
    review:
      "In my technology class, Alora consistently demonstrates exceptional talent in programming. She not only completes assignments with excellence but often extends them with additional features and optimizations that show real understanding.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "discord",
    imgPath: "/images/discord.png",
  },
  {
    name: "github",
    imgPath: "/images/github.png",
  },
  {
    name: "spotify",
    imgPath: "/images/spotify.png",
  },
  {
    name: "steam",
    imgPath: "/images/steam.png",
  },
  {
    name: "youtube",
    imgPath: "/images/youtube.png",
  },
  {
    name: "reddit",
    imgPath: "/images/reddit.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
