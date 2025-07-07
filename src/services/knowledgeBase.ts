
export interface KnowledgeEntry {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
  followUps?: string[];
  context?: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  // BlueBridge Platform Specific
  {
    id: 'bluebridge-overview',
    category: 'platform-help',
    keywords: ['bluebridge', 'platform', 'what is', 'about', 'overview', 'help'],
    question: 'What is BlueBridge and how does it work?',
    answer: 'BlueBridge is your intelligent career companion that connects talented professionals with their ideal opportunities. Our AI-powered platform analyzes your skills, experience, and preferences to match you with jobs that truly fit. We offer personalized job recommendations, resume optimization, salary insights, and comprehensive career guidance to accelerate your professional growth.',
    followUps: ['How does AI job matching work?', 'What services do you offer?', 'How do I get started?']
  },
  {
    id: 'bluebridge-features',
    category: 'platform-help',
    keywords: ['features', 'services', 'what can you do', 'capabilities', 'tools'],
    question: 'What services and features does BlueBridge offer?',
    answer: 'BlueBridge provides comprehensive career services: AI-powered job matching that finds opportunities perfectly aligned with your profile, intelligent resume optimization with personalized feedback, real-time salary insights and market data, application tracking and management tools, professional networking opportunities, expert career coaching, interview preparation resources, and instant job alerts. Everything you need to advance your career in one platform.',
    followUps: ['How does resume optimization work?', 'Tell me about salary insights', 'How do I track applications?']
  },

  // Job Search Strategy
  {
    id: 'job-search-strategy',
    category: 'job-search',
    keywords: ['find jobs', 'job search', 'job hunting', 'looking for work', 'career search'],
    question: 'How do I effectively search for jobs on BlueBridge?',
    answer: 'BlueBridge makes job searching intelligent and efficient. Start by completing your comprehensive profile so our AI understands your skills and preferences. Set up personalized job alerts for roles that match your criteria. Use our advanced filters to narrow down opportunities by location, salary, company size, and more. Apply directly through our platform and track all your applications in one place. Our AI continuously learns from your preferences to suggest better matches over time.',
    followUps: ['How do I optimize my profile?', 'What makes a good job alert?', 'How do I track applications?']
  },
  {
    id: 'ai-job-matching',
    category: 'job-search',
    keywords: ['ai matching', 'job recommendations', 'smart matching', 'personalized jobs'],
    question: 'How does BlueBridge\'s AI job matching work?',
    answer: 'Our AI analyzes multiple data points to find your perfect match: your skills, experience, career goals, salary expectations, preferred company culture, and work style preferences. The system learns from your application behavior and feedback to continuously improve recommendations. We also consider market trends and company hiring patterns to present opportunities at the right time. The more you interact with the platform, the smarter your job recommendations become.',
    followUps: ['How do I improve my match accuracy?', 'What data does the AI consider?', 'Can I give feedback on matches?']
  },

  // Profile & Resume Optimization
  {
    id: 'profile-optimization',
    category: 'profile',
    keywords: ['profile', 'optimize profile', 'improve profile', 'profile tips', 'complete profile'],
    question: 'How do I optimize my BlueBridge profile for better job matches?',
    answer: 'A strong BlueBridge profile is your key to better opportunities. Complete all sections with detailed information about your experience, skills, and achievements. Use specific keywords relevant to your target roles. Quantify your accomplishments with numbers and metrics. Upload a professional photo and keep your profile updated with recent projects and certifications. Our AI provides personalized suggestions to enhance your visibility to employers and improve match accuracy.',
    followUps: ['What keywords should I use?', 'How do I quantify achievements?', 'How often should I update my profile?']
  },
  {
    id: 'resume-optimization',
    category: 'profile',
    keywords: ['resume', 'cv', 'resume tips', 'improve resume', 'resume help'],
    question: 'How does BlueBridge help optimize my resume?',
    answer: 'BlueBridge\'s AI-powered resume optimization analyzes your resume against successful profiles in your field and current job market trends. We provide specific recommendations to improve keyword density, formatting, and content structure. Our system suggests action verbs, helps quantify achievements, and ensures your resume is ATS-friendly. You\'ll receive a detailed optimization score and step-by-step improvement suggestions tailored to your target roles.',
    followUps: ['What is ATS optimization?', 'How do I improve my resume score?', 'What are good action verbs?']
  },

  // Career Development & Advice
  {
    id: 'career-advancement',
    category: 'career-advice',
    keywords: ['career growth', 'career development', 'advance career', 'promotion', 'career path'],
    question: 'How can BlueBridge help me advance my career?',
    answer: 'BlueBridge supports your career advancement through personalized guidance and market insights. We analyze career progression patterns in your field to suggest strategic next steps. Our platform identifies skill gaps and recommends relevant training or certifications. We provide salary benchmarking data to support promotion discussions and help you understand your market value. Plus, our career coaching resources offer strategies for networking, leadership development, and long-term career planning.',
    followUps: ['What skills should I develop?', 'How do I negotiate a promotion?', 'What certifications are valuable?']
  },
  {
    id: 'salary-insights',
    category: 'career-advice',
    keywords: ['salary', 'compensation', 'pay', 'market value', 'salary data'],
    question: 'How does BlueBridge provide salary insights?',
    answer: 'BlueBridge offers comprehensive salary intelligence based on real market data. We analyze compensation across different roles, experience levels, locations, and company sizes. Our platform shows salary ranges for your current role and target positions, helping you understand your market value. We also provide insights on total compensation packages including benefits, equity, and bonuses. This data empowers you to make informed career decisions and negotiate confidently.',
    followUps: ['How accurate is your salary data?', 'What affects salary ranges?', 'How do I negotiate salary?']
  },

  // Interview & Application Process
  {
    id: 'interview-preparation',
    category: 'application-help',
    keywords: ['interview', 'interview prep', 'interview tips', 'prepare interview'],
    question: 'How does BlueBridge help with interview preparation?',
    answer: 'BlueBridge provides comprehensive interview preparation tailored to your target roles. We offer company-specific insights, common interview questions for your field, and guidance on the STAR method for behavioral questions. Our platform includes interview simulation tools, tips for virtual interviews, and advice on what questions to ask employers. We also provide insights into company culture and recent news to help you make a strong impression.',
    followUps: ['What is the STAR method?', 'How do I prepare for virtual interviews?', 'What questions should I ask?']
  },
  {
    id: 'application-tracking',
    category: 'application-help',
    keywords: ['track applications', 'application status', 'manage applications', 'follow up'],
    question: 'How do I track and manage my job applications on BlueBridge?',
    answer: 'BlueBridge\'s application tracking system keeps you organized and proactive. Track all your applications in one dashboard with status updates, interview schedules, and follow-up reminders. Set automated alerts for application deadlines and follow-up dates. Our system helps you personalize each application and maintain detailed notes about each opportunity. You can also analyze your application success rates to optimize your job search strategy.',
    followUps: ['How do I set up follow-up reminders?', 'What should I track for each application?', 'How do I improve my success rate?']
  },

  // Company & Industry Insights
  {
    id: 'company-research',
    category: 'company-info',
    keywords: ['company research', 'company info', 'employer insights', 'company culture'],
    question: 'How can I research companies through BlueBridge?',
    answer: 'BlueBridge provides deep company insights to help you make informed decisions. Access detailed company profiles including culture, values, employee reviews, and growth trajectory. Our platform shows salary ranges and benefits offered by specific employers. We also provide insights into hiring patterns, team structures, and recent company news. This information helps you tailor your applications and prepare for interviews with confidence.',
    followUps: ['What company information is available?', 'How do I assess company culture?', 'How current is the company data?']
  },

  // Platform Navigation & Support
  {
    id: 'getting-started',
    category: 'platform-help',
    keywords: ['getting started', 'how to start', 'new user', 'setup', 'onboarding'],
    question: 'How do I get started with BlueBridge?',
    answer: 'Getting started with BlueBridge is simple and rewarding. First, create your comprehensive profile by adding your experience, skills, and career preferences. Upload your resume for AI-powered optimization suggestions. Set up job alerts for your target roles and locations. Complete our career assessment to improve match accuracy. Start applying to recommended positions and track your progress through our dashboard. Our onboarding process guides you through each step to maximize your success.',
    followUps: ['What information should I include in my profile?', 'How do I set up job alerts?', 'How long does setup take?']
  }
];

export class KnowledgeBaseService {
  private entries: KnowledgeEntry[] = knowledgeBase;

  findBestMatch(query: string, conversationHistory?: string): KnowledgeEntry | null {
    const normalizedQuery = query.toLowerCase();
    let bestMatch: KnowledgeEntry | null = null;
    let highestScore = 0;

    console.log('Searching knowledge base for:', normalizedQuery);

    for (const entry of this.entries) {
      const score = this.calculateRelevanceScore(normalizedQuery, entry, conversationHistory);
      if (score > highestScore && score > 0.2) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch) {
      console.log('Found best match:', bestMatch.id, 'Score:', highestScore);
    } else {
      console.log('No suitable match found in knowledge base');
    }

    return bestMatch;
  }

  private calculateRelevanceScore(query: string, entry: KnowledgeEntry, conversationHistory?: string): number {
    let score = 0;

    // Direct keyword matching (primary scoring)
    const matchedKeywords = entry.keywords.filter(keyword => 
      query.includes(keyword.toLowerCase())
    );
    score += (matchedKeywords.length / entry.keywords.length) * 0.7;

    // Partial keyword matching
    const partialMatches = entry.keywords.filter(keyword =>
      keyword.toLowerCase().split(' ').some(word => query.includes(word))
    );
    score += (partialMatches.length / entry.keywords.length) * 0.2;

    // Question similarity
    const questionWords = entry.question.toLowerCase().split(' ').filter(word => word.length > 3);
    const queryWords = query.split(' ').filter(word => word.length > 3);
    const commonWords = queryWords.filter(word => 
      questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))
    );
    score += (commonWords.length / Math.max(queryWords.length, questionWords.length)) * 0.1;

    return score;
  }

  getFollowUpSuggestions(entryId: string): string[] {
    const entry = this.entries.find(e => e.id === entryId);
    return entry?.followUps || [];
  }

  getCategoryEntries(category: string): KnowledgeEntry[] {
    return this.entries.filter(entry => entry.category === category);
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();
