
import { knowledgeBaseService } from './knowledgeBase';

export interface GitIngestResponse {
  summary: string;
  tree: string;
  content: string;
  repository: string;
  filesAnalyzed: number;
  estimatedTokens: number;
}

export interface RepositoryAnalysis {
  metadata: {
    name: string;
    fileCount: number;
    tokenCount: number;
  };
  structure: string;
  codeContent: string;
  insights: string[];
}

export class GitIngestService {
  private baseUrl = 'https://gitingest.com/api';

  async analyzeRepository(repoUrl: string, options?: {
    includePatterns?: string[];
    excludePatterns?: string[];
    maxFileSize?: number;
    branch?: string;
  }): Promise<GitIngestResponse> {
    try {
      console.log('Analyzing repository:', repoUrl);
      
      // Extract repo info from URL
      const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!repoMatch) {
        throw new Error('Invalid GitHub repository URL');
      }

      const [, owner, repo] = repoMatch;
      const cleanRepo = repo.replace(/\.git$/, '');

      // Build API request
      const params = new URLSearchParams({
        url: repoUrl,
        ...(options?.branch && { branch: options.branch }),
        ...(options?.maxFileSize && { maxSize: options.maxFileSize.toString() })
      });

      // Add patterns if specified
      if (options?.includePatterns) {
        options.includePatterns.forEach(pattern => params.append('include', pattern));
      }
      if (options?.excludePatterns) {
        options.excludePatterns.forEach(pattern => params.append('exclude', pattern));
      }

      const response = await fetch(`${this.baseUrl}/ingest?${params}`);
      
      if (!response.ok) {
        throw new Error(`GitIngest API error: ${response.status} - ${response.statusText}`);
      }

      const rawContent = await response.text();
      
      // Parse the structured response
      const parsed = this.parseGitIngestOutput(rawContent);
      
      console.log('Repository analysis completed:', {
        repository: parsed.repository,
        filesAnalyzed: parsed.filesAnalyzed,
        estimatedTokens: parsed.estimatedTokens
      });

      return parsed;
    } catch (error) {
      console.error('Error analyzing repository:', error);
      throw error;
    }
  }

  private parseGitIngestOutput(rawContent: string): GitIngestResponse {
    const lines = rawContent.split('\n');
    let summary = '';
    let tree = '';
    let content = '';
    let repository = '';
    let filesAnalyzed = 0;
    let estimatedTokens = 0;

    let currentSection = 'summary';
    let contentStarted = false;

    for (const line of lines) {
      // Parse summary section
      if (line.startsWith('Repository:')) {
        repository = line.replace('Repository: ', '').trim();
        summary += line + '\n';
      } else if (line.startsWith('Files analyzed:')) {
        filesAnalyzed = parseInt(line.replace('Files analyzed: ', '').trim());
        summary += line + '\n';
      } else if (line.startsWith('Estimated tokens:')) {
        const tokenStr = line.replace('Estimated tokens: ', '').trim();
        estimatedTokens = parseFloat(tokenStr.replace('k', '')) * (tokenStr.includes('k') ? 1000 : 1);
        summary += line + '\n';
      }
      // Parse directory structure
      else if (line.startsWith('Directory structure:')) {
        currentSection = 'tree';
        tree += line + '\n';
      } else if (line.startsWith('└─') || line.startsWith('├─') || line.startsWith('│')) {
        if (currentSection === 'tree') {
          tree += line + '\n';
        }
      }
      // Parse file contents
      else if (line.startsWith('================================================')) {
        currentSection = 'content';
        contentStarted = true;
        content += line + '\n';
      } else if (contentStarted) {
        content += line + '\n';
      }
    }

    return {
      summary: summary.trim(),
      tree: tree.trim(),
      content: content.trim(),
      repository,
      filesAnalyzed,
      estimatedTokens
    };
  }

  async generateRepositoryInsights(analysis: GitIngestResponse): Promise<RepositoryAnalysis> {
    const insights: string[] = [];

    // Analyze file types and structure
    const fileTypes = this.extractFileTypes(analysis.content);
    if (fileTypes.length > 0) {
      insights.push(`This repository contains ${fileTypes.join(', ')} files`);
    }

    // Analyze project structure
    if (analysis.tree.includes('src/')) {
      insights.push('Follows standard source code organization with src/ directory');
    }
    if (analysis.tree.includes('test/') || analysis.tree.includes('tests/')) {
      insights.push('Includes test files - good testing practices');
    }
    if (analysis.tree.includes('README')) {
      insights.push('Well-documented with README file');
    }

    // Analyze size and complexity
    if (analysis.filesAnalyzed > 50) {
      insights.push('Large codebase with comprehensive structure');
    } else if (analysis.filesAnalyzed > 10) {
      insights.push('Medium-sized project with good organization');
    } else {
      insights.push('Small, focused project');
    }

    return {
      metadata: {
        name: analysis.repository,
        fileCount: analysis.filesAnalyzed,
        tokenCount: analysis.estimatedTokens
      },
      structure: analysis.tree,
      codeContent: analysis.content,
      insights
    };
  }

  private extractFileTypes(content: string): string[] {
    const fileTypeRegex = /FILE: [^\.]+\.(\w+)/g;
    const types = new Set<string>();
    let match;

    while ((match = fileTypeRegex.exec(content)) !== null) {
      types.add(match[1]);
    }

    return Array.from(types);
  }

  async generateContextualResponse(query: string, repositoryContext?: RepositoryAnalysis): Promise<string> {
    console.log('Generating contextual response for:', query);
    console.log('With repository context:', repositoryContext?.metadata);

    const normalizedQuery = query.toLowerCase().trim();
    
    // First, try to find a match in the knowledge base
    const knowledgeMatch = knowledgeBaseService.findBestMatch(query);
    
    if (knowledgeMatch) {
      console.log('Found knowledge base match:', knowledgeMatch.id);
      return knowledgeMatch.answer;
    }

    // Repository-specific responses
    if (repositoryContext) {
      if (this.containsKeywords(normalizedQuery, ['analyze', 'repository', 'repo', 'code', 'project'])) {
        return `I've analyzed the repository "${repositoryContext.metadata.name}" which contains ${repositoryContext.metadata.fileCount} files with approximately ${repositoryContext.metadata.tokenCount} tokens. 

Here are the key insights:
${repositoryContext.insights.map(insight => `• ${insight}`).join('\n')}

The project structure includes:
${repositoryContext.structure}

Would you like me to dive deeper into specific files or analyze particular aspects of the codebase?`;
      }

      if (this.containsKeywords(normalizedQuery, ['files', 'structure', 'organization'])) {
        return `The repository structure shows:

${repositoryContext.structure}

This repository contains ${repositoryContext.metadata.fileCount} files total. ${repositoryContext.insights.join('. ')}

Would you like me to examine specific files or explain any part of the structure?`;
      }

      if (this.containsKeywords(normalizedQuery, ['code', 'implementation', 'how does', 'what does'])) {
        // Extract relevant code snippets based on query
        const relevantCode = this.findRelevantCode(normalizedQuery, repositoryContext.codeContent);
        if (relevantCode) {
          return `Based on the code analysis, here's what I found:

${relevantCode}

This gives you insight into how the functionality is implemented. Would you like me to explain any specific part or analyze other aspects of the code?`;
        }
      }
    }

    // Enhanced contextual responses for common patterns
    if (this.containsKeywords(normalizedQuery, ['hello', 'hi', 'hey', 'start', 'begin'])) {
      return "Hello! I'm your BlueBridge AI assistant powered by GitIngest for comprehensive code analysis. I can help you analyze entire repositories, understand code structures, explain implementations, and provide insights about codebases. What repository would you like me to analyze today?";
    }
    
    if (this.containsKeywords(normalizedQuery, ['github', 'repository', 'analyze this'])) {
      return "I can analyze any GitHub repository for you! Just provide the repository URL (like https://github.com/owner/repo-name) and I'll give you a comprehensive analysis including file structure, code insights, and detailed explanations. What repository would you like me to examine?";
    }

    // Default career-focused responses (maintaining original functionality)
    if (this.containsKeywords(normalizedQuery, ['job', 'work', 'career', 'position', 'employment'])) {
      return "I can help you with job searches and career development! Additionally, I can analyze code repositories to help you understand projects, evaluate codebases for potential roles, or review open-source contributions. Would you like career advice or repository analysis?";
    }

    return `I understand you're asking about "${query}". I specialize in repository analysis using GitIngest technology and career guidance. I can analyze entire GitHub repositories, explain code structures, and provide career advice. 

For repository analysis, just share a GitHub URL and I'll provide comprehensive insights. For other assistance, feel free to ask about:
• Code repository analysis and insights
• Career development and job searching  
• Technical project evaluation
• Code structure explanations

What would you like to explore?`;
  }

  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private findRelevantCode(query: string, content: string): string | null {
    // Simple relevance matching - could be enhanced with more sophisticated NLP
    const sections = content.split('================================================');
    const queryKeywords = query.toLowerCase().split(' ');
    
    for (const section of sections) {
      const lowerSection = section.toLowerCase();
      const matchCount = queryKeywords.filter(keyword => 
        keyword.length > 2 && lowerSection.includes(keyword)
      ).length;
      
      if (matchCount >= 2) {
        // Return the first 500 characters of relevant section
        return section.substring(0, 500).trim() + (section.length > 500 ? '...' : '');
      }
    }
    
    return null;
  }
}

export const gitIngestService = new GitIngestService();
