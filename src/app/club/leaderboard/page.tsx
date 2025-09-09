"use client";

import { useState, useEffect } from "react";

type Member = {
  id: string;
  name: string;
  roll: string;
  email: string;
  totalPoints: number;
  createdAt?: string;
  volunteering: number;
  facebook: number;
  intra: number;
  competitions: number;
  projects: number;
  blogs: number;
  forum: number;
};

export default function Leaderboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/points");
        
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        
        const data = await response.json();
        
        if (data.success) {
          // Filter out members with 0 points and sort
          const filtered = data.data
            .filter((m: Member) => m.totalPoints > 0)
            .sort((a: Member, b: Member) => {
              if (b.totalPoints === a.totalPoints) {
                return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
              }
              return b.totalPoints - a.totalPoints;
            });
          
          setMembers(filtered);
        } else {
          throw new Error(data.error || "Failed to fetch members");
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter by search
  const filteredMembers = members.filter((m) =>
    [m.name, m.roll, m.email].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex min-h-[100vh] flex-col bg-[#F6F6F6] py-28 md:py-36">
        <div className="container">
          <h1 className="text-6xl text-center mb-6">
            <span className="text-blue-500">Leader</span>
            <span>Board</span>
          </h1>
          <div className="text-center">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[100vh] flex-col bg-[#F6F6F6] py-28 md:py-36">
        <div className="container">
          <h1 className="text-6xl text-center mb-6">
            <span className="text-blue-500">Leader</span>
            <span>Board</span>
          </h1>
          <div className="text-center text-red-500">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100vh] flex-col bg-[#F6F6F6] py-28 md:py-36">
      <div className="container">
        <h1 className="text-6xl text-center mb-6">
          <span className="text-blue-500">Leader</span>
          <span>Board</span>
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name, roll, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="min-w-full bg-white text-black">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Roll</th>
                <th className="py-3 px-4 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m, i) => (
                  <tr key={m.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4 font-medium">{i + 1}</td>
                    <td className="py-3 px-4">{m.name}</td>
                    <td className="py-3 px-4">{m.roll}</td>
                    <td className="py-3 px-4 font-bold text-blue-600">{m.totalPoints}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    {members.length === 0 ? "No members found" : "No results found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Additional information */}
        {members.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        )}
      </div>
    </div>
  );
}