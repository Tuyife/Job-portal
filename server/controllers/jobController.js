const Job = require('../models/Job');

const sampleJobs = [
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
  { title: 'Technical Writer', company: 'DocuPro', location: 'Remote', type: 'Contract', salary: '$70k - $90k', description: 'Create clear documentation for developer tools and APIs.', requirements: ['Technical writing experience', 'API documentation', 'Markdown/Git'], category: 'Writing' },
  { title: 'Marketing Specialist', company: 'BrandBoost', location: 'Chicago, IL', type: 'Full-time', salary: '$70k - $90k', description: 'Develop marketing campaigns and grow brand awareness.', requirements: ['Digital marketing', 'SEO knowledge', 'Campaign management'], category: 'Marketing' },
  { title: 'HR Coordinator', company: 'PeopleFirst', location: 'Remote', type: 'Full-time', salary: '$55k - $70k', description: 'Support recruitment and employee experience for a fast-growing team.', requirements: ['HR operations', 'communication', 'organization'], category: 'Human Resources' },
  { title: 'Sales Executive', company: 'RevenueRush', location: 'Dallas, TX', type: 'Full-time', salary: '$85k - $105k', description: 'Drive enterprise sales and close high-value deals.', requirements: ['Sales experience', 'CRM skills', 'pipeline management'], category: 'Sales' },
  { title: 'Customer Support Lead', company: 'HelpHub', location: 'Remote', type: 'Full-time', salary: '$65k - $78k', description: 'Lead customer support agents and improve support outcomes.', requirements: ['customer success', 'team leadership', 'SaaS experience'], category: 'Customer Support' },
  { title: 'Content Strategist', company: 'StoryLine', location: 'New York, NY', type: 'Contract', salary: '$75k - $95k', description: 'Create content strategies and editorial calendars for B2B brands.', requirements: ['Content planning', 'writing skills', 'analytics'], category: 'Marketing' },
  { title: 'Business Analyst', company: 'InsightLoop', location: 'Austin, TX', type: 'Full-time', salary: '$95k - $115k', description: 'Analyze business requirements and translate them to product teams.', requirements: ['data analysis', 'stakeholder communication', 'process improvement'], category: 'Analytics' },
  { title: 'Motion Designer', company: 'FrameFlow', location: 'Los Angeles, CA', type: 'Contract', salary: '$70k - $88k', description: 'Design animated experiences for digital products and campaigns.', requirements: ['After Effects', 'motion graphics', 'storytelling'], category: 'Design' },
  { title: 'Social Media Manager', company: 'BuzzWave', location: 'Remote', type: 'Part-time', salary: '$55k - $70k', description: 'Manage social channels and build audience engagement.', requirements: ['social strategy', 'community management', 'content creation'], category: 'Marketing' },
  { title: 'Data Engineer', company: 'PipelinePro', location: 'Seattle, WA', type: 'Full-time', salary: '$125k - $150k', description: 'Build and maintain data pipelines for analytics and reporting.', requirements: ['ETL', 'Python', 'SQL'], category: 'Data' },
  { title: 'AI Researcher', company: 'NeuroLabs', location: 'Boston, MA', type: 'Full-time', salary: '$160k - $190k', description: 'Develop research-driven AI models and prototypes.', requirements: ['machine learning', 'research papers', 'Python'], category: 'Data' },
  { title: 'Mobile QA Engineer', company: 'AppCheck', location: 'Remote', type: 'Full-time', salary: '$85k - $100k', description: 'Test mobile applications and improve product quality.', requirements: ['mobile testing', 'automation', 'attention to detail'], category: 'QA' },
  { title: 'Finance Manager', company: 'MoneyMap', location: 'Miami, FL', type: 'Full-time', salary: '$110k - $135k', description: 'Manage financial planning and reporting for high-growth teams.', requirements: ['finance strategy', 'budgeting', 'forecasting'], category: 'Finance' },
  { title: 'Product Designer', company: 'BrightBuild', location: 'San Diego, CA', type: 'Full-time', salary: '$105k - $130k', description: 'Design seamless product interfaces and flows.', requirements: ['UI/UX', 'prototyping', 'research'], category: 'Design' },
  { title: 'Content Marketing Writer', company: 'WriteWise', location: 'Remote', type: 'Contract', salary: '$65k - $82k', description: 'Write marketing content, case studies, and thought leadership.', requirements: ['writing', 'SEO', 'content strategy'], category: 'Writing' },
  { title: 'Operations Coordinator', company: 'FlowOps', location: 'Denver, CO', type: 'Full-time', salary: '$62k - $75k', description: 'Help optimize operational workflows and team coordination.', requirements: ['operations', 'process design', 'project support'], category: 'Operations' },
  { title: 'Technical Recruiter', company: 'TalentForge', location: 'Remote', type: 'Full-time', salary: '$70k - $88k', description: 'Source top engineering talent and manage candidate relationships.', requirements: ['recruiting', 'sales', 'technical screening'], category: 'Human Resources' },
  { title: 'Email Marketing Specialist', company: 'PulseMail', location: 'New York, NY', type: 'Full-time', salary: '$72k - $88k', description: 'Create email campaigns and optimize conversion rates.', requirements: ['email marketing', 'copywriting', 'analytics'], category: 'Marketing' },
  { title: 'Customer Success Manager', company: 'ScaleServe', location: 'Remote', type: 'Full-time', salary: '$90k - $112k', description: 'Drive product adoption and ensure customer satisfaction.', requirements: ['customer success', 'account management', 'SaaS'], category: 'Customer Support' },
  { title: 'Performance Marketing Lead', company: 'GrowthRamp', location: 'Chicago, IL', type: 'Full-time', salary: '$110k - $140k', description: 'Plan and execute paid media campaigns.', requirements: ['PPC', 'data-driven marketing', 'optimization'], category: 'Marketing' },
  { title: 'Technical Support Analyst', company: 'FixIt', location: 'Remote', type: 'Full-time', salary: '$60k - $74k', description: 'Resolve client technical issues for enterprise products.', requirements: ['troubleshooting', 'customer care', 'software support'], category: 'Customer Support' },
  { title: 'Enterprise Account Manager', company: 'DealFlow', location: 'San Francisco, CA', type: 'Full-time', salary: '$125k - $155k', description: 'Manage major accounts and grow revenue for enterprise clients.', requirements: ['relationship management', 'sales', 'strategy'], category: 'Sales' },
  { title: 'Frontend Architect', company: 'PixelPulse', location: 'Remote', type: 'Full-time', salary: '$145k - $175k', description: 'Design architecture for scalable frontend applications.', requirements: ['design systems', 'React', 'performance'], category: 'Development' },
  { title: 'Video Producer', company: 'StoryCraft', location: 'Austin, TX', type: 'Contract', salary: '$72k - $90k', description: 'Produce brand-focused videos for product launches.', requirements: ['video editing', 'storyboarding', 'motion'], category: 'Design' },
  { title: 'Accessibility Specialist', company: 'InclusionWorks', location: 'Remote', type: 'Full-time', salary: '$95k - $115k', description: 'Ensure digital products meet accessibility standards.', requirements: ['WCAG', 'UX', 'testing'], category: 'Design' },
  { title: 'Data Analytics Manager', company: 'TrendLogic', location: 'Seattle, WA', type: 'Full-time', salary: '$130k - $155k', description: 'Lead analytics strategy and business intelligence projects.', requirements: ['analytics', 'leadership', 'data visualization'], category: 'Analytics' },
  { title: 'AI Product Manager', company: 'NeuralWorks', location: 'Boston, MA', type: 'Full-time', salary: '$150k - $180k', description: 'Manage AI product roadmaps and execution.', requirements: ['AI product', 'stakeholder alignment', 'technical knowledge'], category: 'Product' },
  { title: 'Site Reliability Engineer', company: 'OpsPulse', location: 'Denver, CO', type: 'Full-time', salary: '$135k - $165k', description: 'Ensure platform reliability and incident response.', requirements: ['SRE', 'monitoring', 'system design'], category: 'DevOps' },
  { title: 'HR Business Partner', company: 'PeopleWorks', location: 'New York, NY', type: 'Full-time', salary: '$102k - $122k', description: 'Partner with business leaders on HR strategy.', requirements: ['HR strategy', 'business partnership', 'coaching'], category: 'Human Resources' },
  { title: 'Growth Marketing Analyst', company: 'ScaleLab', location: 'Remote', type: 'Full-time', salary: '$85k - $100k', description: 'Track growth metrics and optimize funnels.', requirements: ['analytics', 'growth marketing', 'experimentation'], category: 'Marketing' },
  { title: 'Senior API Engineer', company: 'Connectify', location: 'Miami, FL', type: 'Full-time', salary: '$140k - $170k', description: 'Build reliable APIs and integrate external systems.', requirements: ['API design', 'Node.js', 'REST/GraphQL'], category: 'Development' },
  { title: 'Legal Counsel', company: 'LawBridge', location: 'Remote', type: 'Full-time', salary: '$130k - $155k', description: 'Provide legal advice for contracts and privacy.', requirements: ['corporate law', 'contracts', 'compliance'], category: 'Legal' },
  { title: 'Creative Director', company: 'VisionForge', location: 'Los Angeles, CA', type: 'Full-time', salary: '$160k - $190k', description: 'Lead creative vision for brand campaigns and product launches.', requirements: ['creative leadership', 'branding', 'design direction'], category: 'Design' },
  { title: 'Analytics Engineer', company: 'DataCraft', location: 'Remote', type: 'Full-time', salary: '$120k - $145k', description: 'Model data for analytics and BI reporting.', requirements: ['dbt', 'SQL', 'data modeling'], category: 'Analytics' },
  { title: 'Compliance Analyst', company: 'SecureLedger', location: 'Boston, MA', type: 'Full-time', salary: '$90k - $110k', description: 'Support compliance initiatives for finance products.', requirements: ['compliance', 'regulation', 'documentation'], category: 'Finance' },
  { title: 'Technical Account Executive', company: 'CloudWave', location: 'Remote', type: 'Full-time', salary: '$115k - $145k', description: 'Manage technical sales relationships and product demos.', requirements: ['technical sales', 'SaaS', 'customer success'], category: 'Sales' },
  { title: 'Motion UI Developer', company: 'LumaLabs', location: 'San Francisco, CA', type: 'Contract', salary: '$95k - $115k', description: 'Build animated user interfaces for mobile and web.', requirements: ['animation', 'React', 'CSS'], category: 'Development' },
  { title: 'People Operations Lead', company: 'CultureHub', location: 'Remote', type: 'Full-time', salary: '$110k - $130k', description: 'Drive employee programs and culture initiatives.', requirements: ['people ops', 'program management', 'communications'], category: 'Human Resources' },
  { title: 'Support Engineer', company: 'SoftServe', location: 'Austin, TX', type: 'Full-time', salary: '$68k - $82k', description: 'Help customers troubleshoot platform issues.', requirements: ['support', 'technical troubleshooting', 'communication'], category: 'Customer Support' },
  { title: 'Business Operations Analyst', company: 'OptiFlow', location: 'Chicago, IL', type: 'Full-time', salary: '$80k - $95k', description: 'Analyze operations and improve internal processes.', requirements: ['operations analysis', 'process mapping', 'cross-functional collaboration'], category: 'Operations' },
  { title: 'Performance Engineer', company: 'LoadStar', location: 'Remote', type: 'Full-time', salary: '$140k - $170k', description: 'Optimise application performance under heavy load.', requirements: ['performance testing', 'profiling', 'backend systems'], category: 'Development' },
  { title: 'E-commerce Strategist', company: 'CartBoost', location: 'Los Angeles, CA', type: 'Full-time', salary: '$95k - $120k', description: 'Drive e-commerce growth with merchandising and conversion optimization.', requirements: ['e-commerce', 'digital marketing', 'analytics'], category: 'Marketing' },
  { title: 'Employee Experience Designer', company: 'WorkplaceHQ', location: 'Remote', type: 'Full-time', salary: '$100k - $125k', description: 'Design internal digital experiences for employees.', requirements: ['UX', 'employee research', 'HR tech'], category: 'Design' },
  { title: 'Data Privacy Specialist', company: 'TrustSphere', location: 'Seattle, WA', type: 'Full-time', salary: '$118k - $140k', description: 'Help teams meet privacy and security regulations.', requirements: ['privacy law', 'GDPR', 'data governance'], category: 'Security' },
  { title: 'Visual Designer', company: 'PixelPeak', location: 'New York, NY', type: 'Full-time', salary: '$92k - $112k', description: 'Create high-quality visual assets for product marketing.', requirements: ['visual design', 'illustration', 'branding'], category: 'Design' },
  { title: 'Senior Program Manager', company: 'ProjectPulse', location: 'Boston, MA', type: 'Full-time', salary: '$145k - $175k', description: 'Lead complex technical programs across engineering teams.', requirements: ['program management', 'stakeholder alignment', 'execution'], category: 'Product' },
  { title: 'Local SEO Specialist', company: 'SearchCraft', location: 'Chicago, IL', type: 'Contract', salary: '$68k - $85k', description: 'Optimize local search presence for growing businesses.', requirements: ['SEO', 'local listings', 'analytics'], category: 'Marketing' },
  { title: 'Cloud Security Architect', company: 'VaultWorks', location: 'Remote', type: 'Full-time', salary: '$150k - $180k', description: 'Design secure cloud environments and risk controls.', requirements: ['cloud security', 'architecture', 'compliance'], category: 'Security' },
  { title: 'Email Automation Manager', company: 'SparkSend', location: 'New York, NY', type: 'Full-time', salary: '$88k - $105k', description: 'Build automated email campaigns for customer acquisition.', requirements: ['automation', 'segmentation', 'CRM'], category: 'Marketing' },
  { title: 'Customer Operations Manager', company: 'ServiceFlow', location: 'Remote', type: 'Full-time', salary: '$98k - $118k', description: 'Improve operational efficiency for customer success teams.', requirements: ['ops', 'customer success', 'process improvement'], category: 'Operations' },
  { title: 'Brand Designer', company: 'IdentityLab', location: 'San Francisco, CA', type: 'Full-time', salary: '$110k - $135k', description: 'Create strong brand identity systems and visual direction.', requirements: ['brand design', 'art direction', 'creative tools'], category: 'Design' },
  { title: 'Machine Learning Engineer', company: 'TensorWorks', location: 'Boston, MA', type: 'Full-time', salary: '$150k - $185k', description: 'Implement production ML systems and model deployment.', requirements: ['ML engineering', 'Python', 'MLOps'], category: 'Data' },
  { title: 'Growth Operations Specialist', company: 'ScaleUp', location: 'Remote', type: 'Full-time', salary: '$90k - $108k', description: 'Support growth teams with experimentation and analytics.', requirements: ['growth ops', 'data', 'project management'], category: 'Marketing' },
  { title: 'Strategy Analyst', company: 'FutureRoad', location: 'New York, NY', type: 'Full-time', salary: '$105k - $125k', description: 'Research market opportunities and advise leadership decisions.', requirements: ['strategy', 'analysis', 'communication'], category: 'Product' },
  { title: 'Cleaner', company: 'CleanSwift Services', location: 'Chicago, IL', type: 'Part-time', salary: '$18 - $24/hr', description: 'Keep homes, offices, and shared spaces spotless with a reliable cleaning schedule.', requirements: ['Attention to detail', 'Time management', 'Reliable transportation'], category: 'Services', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Driver', company: 'CityRide Logistics', location: 'Dallas, TX', type: 'Full-time', salary: '$25 - $32/hr', description: 'Deliver packages and support daily dispatch operations with professionalism and safety.', requirements: ['Valid driver license', 'Safe driving record', 'Customer service mindset'], category: 'Services', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80' }
];

const ensureSampleJobs = async () => {
  const titles = sampleJobs.map(job => job.title);
  const existing = await Job.find({ title: { $in: titles } }).select('title');
  const existingTitles = new Set(existing.map(job => job.title));
  const toInsert = sampleJobs.filter(job => !existingTitles.has(job.title));

  if (toInsert.length > 0) {
    await Job.insertMany(toInsert);
    console.log(`[OK] Seeded ${toInsert.length} new sample jobs`);
  }

  return toInsert.length;
};

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
    await Job.insertMany(sampleJobs);
    res.json({ message: 'Jobs seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sampleJobs, ensureSampleJobs, getJobs, getJobById, createJob, updateJob, deleteJob, getCategories, seedJobs };
