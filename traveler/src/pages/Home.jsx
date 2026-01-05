import React, { useEffect, useState, useMemo } from "react";
import CreateTrip from "../components/CreateTrip";
import CalendarPage from "./CalendarPage";
import {
  Map,
  TrendingUp,
  Plus,
  Bell,
  Sparkles,
  ArrowRight,
  User,
} from "lucide-react";

// Default trips
const MOCK_TRIPS = [
  {
    id: 1,
    city: "Paris",
    start: "2026-03-12",
    end: "2026-03-15",
    totalCost: 1200,
  },
  {
    id: 2,
    city: "Tokyo",
    start: "2026-04-05",
    end: "2026-04-10",
    totalCost: 1800,
  },
];

// Helper: generate default itinerary days for a trip
const generateDays = (trip) => {
  const start = new Date(trip.start);
  const end = new Date(trip.end);
  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push({
      date: d.toISOString().split("T")[0],
      activities: [],
    });
  }
  return days;
};

const Home = () => {
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem("trips");
    const parsed = saved ? JSON.parse(saved) : MOCK_TRIPS;
    // Add default itinerary if missing
    return parsed.map((t) => ({
      ...t,
      days: t.days || generateDays(t),
    }));
  });

  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Save trips to localStorage
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const totalBudget = useMemo(
    () => trips.reduce((sum, trip) => sum + Number(trip.totalCost || 0), 0),
    [trips]
  );

  const handleNewTrip = () => {
    setSelectedTrip(null);
    setShowModal(true);
  };

  const handleEditTrip = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const handleSaveTrip = (trip) => {
    // Add default days if missing
    if (!trip.days) trip.days = generateDays(trip);

    const exists = trips.find((t) => t.id === trip.id);
    if (exists) {
      setTrips(trips.map((t) => (t.id === trip.id ? trip : t)));
    } else {
      setTrips([trip, ...trips]);
    }
    setSelectedTrip(null);
    setShowModal(false);
  };

  const handleDeleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
    setSelectedTrip(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-[#FBFDFF] relative">
      {/* Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-white shadow-lg flex-col py-6 items-center z-50 rounded-tr-3xl rounded-br-3xl">
        <div className="w-12 h-12 bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] rounded-xl flex items-center justify-center mb-10">
          <Map className="text-white" />
        </div>
        <button className="p-3 bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] text-white rounded-xl mb-4">
          <TrendingUp />
        </button>
        <button className="p-3 text-slate-400 hover:text-[#22D3EE]">
          <User />
        </button>
      </aside>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 md:left-20 h-16 bg-gradient-to-r from-[#4ADE80]/30 to-[#22D3EE]/30 backdrop-blur border-b px-6 flex justify-between items-center z-40">
        <h1 className="font-bold text-lg text-gray-800">Wanderlust AI</h1>
        <div className="flex items-center gap-4">
          <Bell />
          <img src="https://picsum.photos/40" className="w-10 h-10 rounded-full" />
          <button
            onClick={() => {
              localStorage.removeItem("isAuth");
              window.location.href = "/";
            }}
            className="text-red-500 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="md:ml-20 pt-20 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Hello, Alex 👋</h2>
            <p className="text-gray-500">Plan your next adventure</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleNewTrip}
              className="bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <Plus size={18} /> Plan New Trip
            </button>

            <button
              onClick={() => setShowCalendar(true)}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              Trip Calendar
            </button>
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Map /> Upcoming Trips
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    onClick={() => handleEditTrip(trip)}
                    className="bg-white p-5 rounded-2xl shadow cursor-pointer"
                  >
                    <h4 className="font-bold text-lg">{trip.city}</h4>
                    <p className="text-sm text-gray-500">
                      {trip.start} → {trip.end}
                    </p>
                    <p className="mt-2 font-semibold text-[#4ADE80]">
                      ₹{trip.totalCost || 0}
                    </p>

                    {/* Default day-wise itinerary */}
                    <div className="mt-2">
                      {trip.days?.map((day, idx) => (
                        <p key={idx} className="text-xs text-gray-400">
                          Day {idx + 1} - {day.date}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div
              className="bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] text-white p-6 rounded-3xl shadow-xl cursor-pointer"
            >
              <p className="text-white/70 text-sm mb-1">Total Trip Cost</p>
              <h2 className="text-3xl font-bold mb-4">₹{totalBudget}</h2>
              <div className="bg-white/20 w-full py-3 rounded-xl flex justify-center items-center gap-2">
                Manage Costs <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>
            <CreateTrip
              onSave={handleSaveTrip}
              tripToEdit={selectedTrip}
              onDelete={handleDeleteTrip}
            />
          </div>
        </div>
      )}

      {showCalendar && (
        <CalendarPage trips={trips} onClose={() => setShowCalendar(false)} />
      )}
    </div>
  );
};

export default Home;