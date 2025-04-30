
import itsolutionsLogo from '../images/logo/itsolutions-nyc.png';

const projects = [
  {
    name: 'IT Solutions NYC',
    url: 'https://www.itsolutions-nyc.com/',
    description:
      'Our official website where we showcase our range of IT services and innovative solutions to meet various business needs.',
    logo: itsolutionsLogo,
  },
  {
    name: 'Excel Specialist',
    url: 'https://shop.itsolutions-nyc.com/excel-specialist',
    description:
      'A platform offering specialized Excel services, tools, and products to streamline data management and analytics for businesses.',
    logo: 'https://shop.itsolutions-nyc.com/mailgo.svg',
  },
  {
    name: 'Via Partners',
    url: 'https://www.viapartners.cl/',
    description:
      'A strategic partner website designed to provide consultancy and support for various business solutions in the Chilean market.',
    logo: 'https://www.viapartners.cl/viapartners.svg',
  },
];

const Projects = () => {
  return (
    <div>
     
      <div className="h-72 overflow-y-auto flex flex-col-reverse gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="  transition-shadow duration-300"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={project.logo}
                alt={`${project.name} Logo`}
                className="w-36 h-36 mx-auto "
              />
              <p className="text-lg font-bold text-gray-900 text-center hover:text-blue-900 transition-colors duration-300">
                {project.name}
              </p>
              <p className="mt-2 text-gray-600 text-center">
                {project.description}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
