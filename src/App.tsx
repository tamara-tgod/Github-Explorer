import { useState } from "react";
import type { GitHubRepo, GitHubUser } from "./types";
import Header from "./component/Topbar";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repo, setRepo] = useState<GitHubRepo[] | null>(null);

  // fetch github api
  async function fetchGitHubUser(
    username: string,
  ): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos`),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("Failed to fetch Github user");
    }

    const user: GitHubUser = await userResponse.json();
    const repos: GitHubRepo[] = await reposResponse.json();
    return { user, repos };
  }

  // handle username search
  async function handleSearch() {
    setError("");
    try {
      if (userName === "") {
        setError("Please enter a username");
        return;
      }
      setLoading(true);
      const { user, repos } = await fetchGitHubUser(userName);
      setUser(user);
      setRepo(repos);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#0d1117]">
      <Header />
      <div className="bg-[#0d1117] min-h-screen p-8 max-w-2xl mx-auto flex flex-col gap-3 font-syne ">
        <div>
          <h1 className="flex items-center gap-2 text-white text-2xl">
            GitHub Explorer
            <span className="bg-[#1f6feb33] text-[#58a6ff] border border-[#388bfd55] rounded-3xl px-2 text-xs ">
              v1.0
            </span>
          </h1>
          <p className="text-[#7ee787] text-sm">
            // search any github user by username
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a GitHub username..."
            onChange={(e) => setUserName(e.target.value)}
            className="flex-1 bg-[#161b22] border border-[#30363d] rounded-xl py-1 px-3 text-white outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#238636] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#2ea043]"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-white">Searching...</p>}
        <div>
          {user ? (
            <div
              id="user-card"
              className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden px-2 py-2"
            >
              {/* avatar, name bio */}
              <div className="flex items-center gap-5 p-6 border-b border-[#21262d]">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-24 h-24 rounded-full"
                />
                <div className="text-white">
                  <h2>{user.name}</h2>
                  <p className="text-blue-400 text-xs">@{user.login}</p>
                  <p className="text-xs text-[#8b949e]">{user.bio}</p>
                </div>
              </div>
              <div className="py-3 px-8 border-b border-[#21262d]">
                <a
                  className="text-[#8b949e] text-xs flex items-center gap-1"
                  href={user.html_url}
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-4xl"></div>
                  View Profile
                </a>
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 divide-x divide-[#21262d] border-b border-[#21262d]">
                <div className="text-center py-5">
                  <p className="text-2xl font-bold text-white">
                    {user.public_repos}
                  </p>
                  <p className="text-[#484f58] text-xs uppercase tracking-widest mt-1">
                    Public Repos
                  </p>
                </div>
                <div className="text-center py-5">
                  <p className="text-2xl font-bold text-white">
                    {user.followers}
                  </p>
                  <p className="text-[#484f58] text-xs uppercase tracking-widest mt-1">
                    Followers
                  </p>
                </div>
                <div className="text-center py-5">
                  <p className="text-2xl font-bold text-white">
                    {user.following}
                  </p>
                  <p className="text-[#484f58] text-xs uppercase tracking-widest mt-1">
                    Following
                  </p>
                </div>
              </div>

              <div>
                <p className="uppercase text-[#8b949e] text-sm mb-3 py-3">
                  // Top Repositories
                </p>
                {/* repo */}
                {repo &&
                  repo.slice(0, 3).map((r) => (
                    <div
                      key={r.name}
                      className="flex justify-between items-center py-3 px-3 w-[94%] m-auto mb-3 bg-[#0d1117] border border-[#21262d] rounded-xl"
                    >
                      <div>
                        <p className="text-[#58a6ff]">{r.name}</p>
                        <p className="text-[#8b949e]">
                          {r.description || "No description"}
                        </p>
                      </div>

                      <div className="flex gap-3 text-[#8b949e]">
                        <p>{r.language || "Unknown"}</p>
                        <p>{r.stargazers_count}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-white">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
// WHDH-PXFD