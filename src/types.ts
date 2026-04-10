export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location?: string;
  blog?: string;
}

export interface GitHubRepo {
  name: string;
  description?: string;
  language?: string;
  stargazers_count: number;
}