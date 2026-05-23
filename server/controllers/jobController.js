const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const { search, category, type } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { title:    { $regex: search, $options: 'i' } },
        { company:  { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') query.category = category;
    if (type)                           query.type = type;

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.userId });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Job.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const seedJobs = async (req, res) => {
  try {
    await Job.deleteMany({});
    await Job.insertMany([
      { title: 'Senior Frontend Developer', company: 'TechCorp Inc.', location: 'San Francisco, CA', type: 'Full-time', salary: '$120k - $150k', description: 'We are looking for an experienced Frontend Developer proficient in React and modern JavaScript frameworks.', requirements: ['5+ years React experience', 'Strong CSS/HTML skills', 'State management experience'], category: 'Development' },
      { title: 'UX/UI Designer', company: 'DesignStudio', location: 'Remote', type: 'Contract', salary: '$80k - $100k', description: 'Join our creative team to design beautiful and intuitive user interfaces.', requirements: ['3+ years UX/UI experience', 'Figma expertise', 'Portfolio required'], category: 'Design' },
      { title: 'DevOps Engineer', company: 'CloudSystems', location: 'Austin, TX', type: 'Full-time', salary: '$130k - $160k', description: 'Manage our cloud infrastructure and CI/CD pipelines.', requirements: ['AWS certification', 'Kubernetes experience', 'CI/CD pipeline setup'], category: 'DevOps' },
      { title: 'Backend Developer', company: 'DataFlow', location: 'New York, NY', type: 'Full-time', salary: '$110k - $140k', description: 'Build scalable APIs and microservices using Node.js and PostgreSQL.', requirements: ['Node.js expertise', 'SQL databases', 'API design'], category: 'Development' },
      { title: 'Product Manager', company: 'InnovateLabs', location: 'Seattle, WA', type: 'Full-time', salary: '$140k - $170k', description: 'Lead product development from concept to launch.', requirements: ['3+ years product management', 'Agile methodology', 'Technical background'], category: 'Product' },
      { title: 'QA Engineer', company: 'QualityFirst', location: 'Remote', type: 'Part-time', salary: '$60k - $80k', description: 'Test web applications and write automated tests.', requirements: ['Testing frameworks', 'Automation tools', 'Bug tracking'], category: 'QA' },
      { title: 'React Native Developer', company: 'MobileMagic', location: 'Los Angeles, CA', type: 'Full-time', salary: '$115k - $145k', description: 'Build cross-platform mobile apps using React Native.', requirements: ['React Native experience', 'Mobile app deployment', 'Redux or MobX'], category: 'Development' },
      { title: 'Data Scientist', company: 'AI Insights', location: 'Boston, MA', type: 'Full-time', salary: '$130k - $180k', description: 'Analyze complex data sets and build machine learning models.', requirements: ['Python programming', 'Machine Learning', 'Statistics'], category: 'Data' },
      { title: 'Security Engineer', company: 'SecureNet', location: 'Washington, DC', type: 'Full-time', salary: '$125k - $155k', description: 'Protect infrastructure and applications from security threats.', requirements: ['Cybersecurity experience', 'Penetration testing', 'Network security'], category: 'Security' },
      { title: 'Cloud Architect', company: 'CloudNine', location: 'Remote', type: 'Full-time', salary: '$150k - $190k', description: 'Design and implement cloud solutions on AWS and Azure.', requirements: ['AWS/Azure certification', 'Cloud architecture', 'Terraform'], category: 'DevOps' },
      { title: 'Full Stack Developer', company: 'WebWorks', location: 'Chicago, IL', type: 'Full-time', salary: '$100k - $130k', description: 'Work on both frontend and backend using React and Node.js.', requirements: ['React', 'Node.js', 'MongoDB/PostgreSQL'], category: 'Development' },
      { title: 'Technical Writer', company: 'DocuPro', location: 'Remote', type: 'Contract', salary: '$70k - $90k', description: 'Create clear documentation for developer tools and APIs.', requirements: ['Technical writing experience', 'API documentation', 'Markdown/Git'], category: 'Writing' }
    ]);
    res.json({ message: 'Jobs seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob, getCategories, seedJobs };
