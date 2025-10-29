import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface GitHubPullRequest {
  id: number
  number: number
  title: string
  body: string | null
  html_url: string
  state: 'open' | 'closed'
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
  user: {
    login: string
    avatar_url: string
    html_url: string
  }
  head: {
    ref: string
    repo: {
      name: string
      full_name: string
      owner: {
        login: string
      }
    }
  }
  base: {
    ref: string
    repo: {
      name: string
      full_name: string
      owner: {
        login: string
      }
    }
  }
}

export interface ProcessedContribution {
  title: string
  description: string
  repository: string
  link: string
  date: string
  type: 'feature' | 'fix' | 'perf' | 'docs' | 'refactor' | 'test' | 'chore'
  state: 'open' | 'closed' | 'merged'
}

// Extract PR type from title (conventional commits)
function extractPRType(title: string): ProcessedContribution['type'] {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.startsWith('feat')) return 'feature'
  if (lowerTitle.startsWith('fix')) return 'fix'
  if (lowerTitle.startsWith('perf')) return 'perf'
  if (lowerTitle.startsWith('docs')) return 'docs'
  if (lowerTitle.startsWith('refactor')) return 'refactor'
  if (lowerTitle.startsWith('test')) return 'test'
  if (lowerTitle.startsWith('chore')) return 'chore'
  
  return 'feature' // default
}


// Format date to year
function formatDate(dateString: string): string {
  return new Date(dateString).getFullYear().toString()
}


export async function fetchUserPullRequests(username: string, limit: number = 50): Promise<ProcessedContribution[]> {
  const token = process.env.GITHUB_TOKEN
  
  if (!token) {
    return []
  }

  try {
    // Try the merged search first using advanced search
    const { data } = await octokit.request('GET /search/issues', {
      q: `is:pr author:${username} is:merged`,
      sort: 'updated',
      order: 'desc',
      per_page: limit,
      advanced_search: 'true',
    })
    
    // If no merged PRs found, try finding closed PRs that might be merged
    if (data.total_count === 0) {
      const { data: closedData } = await octokit.request('GET /search/issues', {
        q: `is:pr author:${username} is:closed`,
        sort: 'updated',
        order: 'desc',
        per_page: limit,
        advanced_search: 'true',
      })
      
      // Filter for actually merged PRs from the closed results
      const mergedPRs = closedData.items.filter((item: unknown) => {
        const pr = item as { pull_request?: { merged_at: string | null } }
        return pr.pull_request?.merged_at
      })
      
      const pullRequests = mergedPRs as unknown as GitHubPullRequest[]
      
    const contributions = pullRequests
      .filter(pr => {
        // Extract repository owner from the URL to filter out self repos
        const repoUrl = pr.html_url
        const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull/)
        const repoOwner = repoMatch ? repoMatch[1] : 'unknown'
        
        // Only include PRs from other repositories (not your own)
        return repoOwner !== username
      })
      .map(pr => {
        // Extract repository name from the URL since the search API doesn't include full repo info
        const repoUrl = pr.html_url
        const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull/)
        const repository = repoMatch ? repoMatch[1] : 'unknown'
        
        return {
          title: pr.title,
          description: `Contributed to ${repository}`,
          repository: repository,
          link: pr.html_url,
          date: formatDate(pr.merged_at || pr.created_at),
          type: extractPRType(pr.title),
          state: 'merged' as const,
        }
      })

      return contributions
    }
    
    const pullRequests = data.items as unknown as GitHubPullRequest[]
    
    const contributions = pullRequests
      .filter(pr => {
        // Extract repository owner from the URL to filter out self repos
        const repoUrl = pr.html_url
        const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull/)
        const repoOwner = repoMatch ? repoMatch[1] : 'unknown'
        
        // Only include PRs from other repositories (not your own)
        return repoOwner !== username
      })
      .map(pr => {
        // Extract repository name from the URL since the search API doesn't include full repo info
        const repoUrl = pr.html_url
        const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull/)
        const repository = repoMatch ? repoMatch[1] : 'unknown'
        
        return {
          title: pr.title,
          description: `Contributed to ${repository}`,
          repository: repository, // Only show company/org name
          link: pr.html_url,
          date: formatDate(pr.merged_at || pr.created_at), // Use merged date if available
          type: extractPRType(pr.title),
          state: 'merged' as const,
        }
      })
    
    return contributions
  } catch {
    return []
  }
}

// Fallback data in case API fails
export const fallbackContributions: ProcessedContribution[] = [
  {
    title: "issue #38: added drag and drop support for mobile",
    description: "Implemented drag-and-drop functionality for mobile devices to improve user experience.",
    repository: "sohzm",
    link: "https://github.com/sohzm/wisk/pull/44",
    date: "2025",
    type: "feature",
    state: "merged"
  },
  {
    title: "fixed keys handler",
    description: "Fixed a bug related to handling keys in the column component.",
    repository: "sohzm",
    link: "https://github.com/sohzm/wisk/pull/41",
    date: "2025",
    type: "fix",
    state: "merged"
  },
  {
    title: "issue #8 added drag n drop",
    description: "Implemented drag and drop functionality with auto-scroll, hold delay, and multi-element support.",
    repository: "sohzm",
    link: "https://github.com/sohzm/wisk/pull/25",
    date: "2025",
    type: "feature",
    state: "merged"
  }
]
