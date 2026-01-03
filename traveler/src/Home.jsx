import React, { useEffect, useState } from "react";
import {
  Map,
  TrendingUp,
  Plus,
  Search,
  Bell,
  Sparkles,
  ArrowRight,
  User,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const MOCK_TRIPS = [
  { id: 1, city: "Paris", date: "12 Mar 2026", budget: 1200 },
  { id: 2, city: "Tokyo", date: "05 Apr 2026", budget: 1800 },
];

const RECOMMENDATIONS = [
  { id: 1, title: "Bali", desc: "Perfect for beaches & sunsets" },
  { id: 2, title: "Rome", desc: "Culture, food & history" },
];

/* ---------------- COMPONENT ---------------- */
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFDFF]">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-white border-r items-center flex-col py-6 z-50">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mb-10">
          <Map className="text-white" />
        </div>

        <button className="p-3 text-indigo-600 bg-indigo-50 rounded-xl mb-4">
          <TrendingUp />
        </button>

        <button className="p-3 text-slate-400 hover:text-indigo-600">
          <User />
        </button>
      </aside>

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 md:left-20 h-16 bg-white/80 backdrop-blur border-b px-6 flex justify-between items-center z-40">
        <h1 className="font-bold text-lg">Wanderlust AI</h1>

        <div className="flex items-center gap-4">
          <Bell className="text-slate-600" />
          <img
            src="https://picsum.photos/40"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="md:ml-20 pt-20 pb-20 px-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Hello, Alex 👋
            </h2>
            <p className="text-slate-500">Plan your next adventure</p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow">
            <Plus className="w-5 h-5" />
            Plan New Trip
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* -------- LEFT COLUMN -------- */}
          <div className="lg:col-span-2 space-y-12">
            {/* Upcoming Trips */}
            <section>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Map className="text-indigo-600" />
                Upcoming Trips
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {MOCK_TRIPS.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border"
                  >
                    <h4 className="font-bold text-lg">{trip.city}</h4>
                    <p className="text-sm text-slate-500">{trip.date}</p>
                    <p className="mt-2 font-semibold text-indigo-600">
                      ${trip.budget}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Recommendations */}
            <section>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-amber-500" />
                AI Recommendations
              </h3>

              {loading ? (
                <div className="p-10 bg-slate-50 rounded-2xl text-center text-slate-500">
                  Loading recommendations...
                </div>
              ) : (
                <div className="grid gap-4">
                  {RECOMMENDATIONS.map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-white p-4 rounded-xl border"
                    >
                      <h4 className="font-bold">{rec.title}</h4>
                      <p className="text-sm text-slate-500">{rec.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* -------- RIGHT COLUMN -------- */}
          <div className="space-y-6">
            {/* Budget Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
              <p className="text-slate-400 text-sm mb-1">Total Budget</p>
              <h2 className="text-3xl font-bold mb-4">$3,000</h2>

              <button className="bg-white/10 hover:bg-white/20 w-full py-3 rounded-xl flex justify-center items-center gap-2">
                Manage Wallet
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Popular Cities */}
            <div className="bg-white p-6 rounded-3xl border shadow-sm">
              <h4 className="font-bold mb-4">Popular Cities</h4>

              {["London", "Rome", "Dubai"].map((city) => (
                <div
                  key={city}
                  className="flex justify-between items-center py-2 hover:bg-slate-50 rounded-lg px-2 cursor-pointer"
                >
                  <span className="font-medium">{city}</span>
                  <Plus className="text-slate-400 w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center z-50">
        <TrendingUp />
        <Search />
        <Plus className="text-indigo-600" />
        <User />
      </nav>
    </div>
  );
};

export default Home;
