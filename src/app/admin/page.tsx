"use client";

import { useState } from "react";
import { addTreeLink } from "@/lib/firebase";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    url: "",
    iconUrl: "",
    order: 1,
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Add link to firebase
    const success = await addTreeLink(formData);
    
    if (success) {
      setStatus("success");
      setFormData({ title: "", subtitle: "", url: "", iconUrl: "", order: formData.order + 1 });
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "order" ? parseInt(value) || 0 : value
    }));
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-2xl font-semibold mb-2">Add New Link</h1>
        <p className="text-white/50 text-sm mb-6">Dynamically upload a link to your portfolio directly to Firebase.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Title *</label>
            <input 
              required
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. latest vlog"
              className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Subtitle</label>
            <input 
              type="text" 
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="e.g. a day in the life"
              className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">URL *</label>
            <input 
              required
              type="url" 
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm text-white/70">Icon (Emoji or URL)</label>
              <input 
                type="text" 
                name="iconUrl"
                value={formData.iconUrl}
                onChange={handleChange}
                placeholder="e.g. 📹"
                className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1 w-24">
              <label className="text-sm text-white/70">Order</label>
              <input 
                type="number" 
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="mt-4 bg-white text-black font-semibold rounded-xl py-3 hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Uploading..." : "Upload Link"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm text-center mt-2">Link uploaded successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center mt-2">Failed to upload. Check Firebase config.</p>
          )}
        </form>
      </div>
    </main>
  );
}
