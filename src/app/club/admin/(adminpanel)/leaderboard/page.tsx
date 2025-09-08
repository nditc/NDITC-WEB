// File: app/components/AdminLeaderboard.tsx
"use client";

import { useState, useEffect } from "react"; 

type Member = {
  id: string;
  name: string;
  roll: string;
  email: string;
  volunteering: number;
  facebook: number;
  intra: number;
  competitions: number;
  projects: number;
  blogs: number;
  forum: number;
  totalPoints: number;
  createdAt?: string;
  updatedAt?: string;
};

type NewMember = Omit<Member, "id" | "totalPoints" | "createdAt" | "updatedAt">;

export default function AdminLeaderboard() {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState<NewMember>({
    name: "",
    roll: "",
    email: "",
    volunteering: 0,
    facebook: 0,
    intra: 0,
    competitions: 0,
    projects: 0,
    blogs: 0,
    forum: 0,
  });

  // Fetch members from API
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/points");
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      
      const data = await response.json();
      
      if (data.success) {
        setMembers(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch members");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (member: Member) => {
    setEditingMember({...member});
  };

  const handleEditChange = (field: keyof Member, value: string | number) => {
    if (editingMember) {
      setEditingMember({
        ...editingMember,
        [field]: value
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingMember) return;
    
    try {
      // Calculate total points
      const totalPoints = 
        editingMember.volunteering +
        editingMember.facebook +
        editingMember.intra +
        editingMember.competitions +
        editingMember.projects +
        editingMember.blogs +
        editingMember.forum;

      const updateData = {
        ...editingMember,
        totalPoints
      };

      // Send update to API
      const response = await fetch(`/api/points/${editingMember.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to update member");
      }

      // Refresh data
      setEditingMember(null);
      fetchMembers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/points/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to delete member");
      }

      // Remove from local state
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddMember = async () => {
    try {
      const response = await fetch("/api/points", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to add member");
      }

      // Reset form and refresh data
      setNewMember({
        name: "",
        roll: "",
        email: "",
        volunteering: 0,
        facebook: 0,
        intra: 0,
        competitions: 0,
        projects: 0,
        blogs: 0,
        forum: 0,
      });
      setShowAddForm(false);
      fetchMembers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filtered = members
    .filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.roll.includes(search)
    )
    .sort((a, b) => {
      // Sort by total points descending, then by creation date ascending
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    });

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-center text-5xl font-medium tracking-wide text-blue-500 md:text-left lg:tracking-widest 2xl:text-6xl mb-6">
          Leaderboard
        </h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-5xl font-medium tracking-wide text-blue-500 md:text-left lg:tracking-widest 2xl:text-6xl mb-6">
        Leaderboard
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}
 
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name or roll..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {showAddForm ? "Cancel" : "Add Member"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-2xl text-center text-blue-500  mb-3">Add New Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Roll Number"
              value={newMember.roll}
              onChange={(e) => setNewMember({...newMember, roll: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              className="p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {[
              { key: "volunteering", label: "Volunteering" },
              { key: "facebook", label: "Facebook" },
              { key: "intra", label: "Intra" },
              { key: "competitions", label: "Competitions" },
              { key: "projects", label: "Projects" },
              { key: "blogs", label: "Blogs" },
              { key: "forum", label: "Forum" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type="number"
                  value={newMember[key as keyof NewMember] as number}
                  onChange={(e) => setNewMember({
                    ...newMember, 
                    [key]: parseInt(e.target.value) || 0
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Member
          </button>
        </div>
      )}
 
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white text-black text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-2">#</th>
              <th className="py-3">Name</th> 
              {
                editingMember?.id  && 
              <th className="py-3">Roll</th>
              }
              {
                editingMember?.id  && 
              <th className="py-3">Email</th>
              }
              <th className="py-3">Volunteering</th>
              <th className="py-3">Facebook</th>
              <th className="py-3">Intra</th>
              <th className="py-3">Competitions</th>
              <th className="py-3">Projects</th>
              <th className="py-3">Blogs</th>
              <th className="py-3">Forum</th>
              <th className="py-3 font-bold">Total</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, idx) => (
              <tr key={m.id} className="border-b hover:bg-gray-100">
                <td className="py-3 text-center border-r">{idx + 1}</td>
                <td className="py-3 pl-2">
                  {editingMember?.id === m.id ? (
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    m.name
                  )}
                </td>
                
                  {editingMember?.id === m.id && (
                    <td className="py-3 text-center"><input
                      type="roll"
                      value={editingMember.roll}
                      onChange={(e) => handleEditChange("roll", e.target.value)}
                      className="w-full p-1 border rounded text-center"
                    />
                    </td>
                  ) }
                
                  {editingMember?.id === m.id && (
                    <td className="py-3 text-center"><input
                      type="email"
                      value={editingMember.email}
                      onChange={(e) => handleEditChange("email", e.target.value)}
                      className="w-full p-1 border rounded text-center"
                    />
                    </td>
                  ) }
                

                {[
                  "volunteering",
                  "facebook",
                  "intra",
                  "competitions",
                  "projects",
                  "blogs",
                  "forum",
                ].map((field) => (
                  <td key={field} className="py-3 text-center">
                    {editingMember?.id === m.id ? (
                      <input
                        type="number"
                        value={editingMember[field as keyof Member] as number}
                        onChange={(e) => handleEditChange(field as keyof Member, parseInt(e.target.value) || 0)}
                        className="w-16 p-1 border rounded text-center"
                      />
                    ) : (
                      m[field as keyof Member] as number
                    )}
                  </td>
                ))}

                <td className="py-3 text-center font-bold text-blue-600">
                  {editingMember?.id === m.id ? (
                    editingMember.volunteering +
                    editingMember.facebook +
                    editingMember.intra +
                    editingMember.competitions +
                    editingMember.projects +
                    editingMember.blogs +
                    editingMember.forum
                  ) : (
                    m.totalPoints
                  )}
                </td>

                <td className="py-3 px-4 text-center space-y-1">
                  {editingMember?.id === m.id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="w-full px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="w-full px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded mt-1"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(m)}
                        className="w-full px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="w-full px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded mt-1"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={13}
                  className="py-3 text-center text-gray-500"
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}