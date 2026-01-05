import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Calendar,
  MapPin,
} from "lucide-react";

const DayWisePlanner = () => {
  const [stops, setStops] = useState([]);

  /* ---------------- ADD STOP ---------------- */
  const addStop = () => {
    setStops([
      ...stops,
      {
        id: Date.now(),
        city: "",
        startDate: "",
        endDate: "",
        days: [],
      },
    ]);
  };

  /* ---------------- ADD DAY ---------------- */
  const addDay = (stopId) => {
    setStops(
      stops.map((stop) =>
        stop.id === stopId
          ? {
              ...stop,
              days: [
                ...stop.days,
                { id: Date.now(), activities: [] },
              ],
            }
          : stop
      )
    );
  };

  /* ---------------- ADD ACTIVITY ---------------- */
  const addActivity = (stopId, dayId) => {
    setStops(
      stops.map((stop) =>
        stop.id === stopId
          ? {
              ...stop,
              days: stop.days.map((day) =>
                day.id === dayId
                  ? {
                      ...day,
                      activities: [
                        ...day.activities,
                        { name: "", cost: 0 },
                      ],
                    }
                  : day
              ),
            }
          : stop
      )
    );
  };

  /* ---------------- UPDATE ACTIVITY ---------------- */
  const updateActivity = (stopId, dayId, index, field, value) => {
    setStops(
      stops.map((stop) =>
        stop.id === stopId
          ? {
              ...stop,
              days: stop.days.map((day) =>
                day.id === dayId
                  ? {
                      ...day,
                      activities: day.activities.map((act, i) =>
                        i === index ? { ...act, [field]: value } : act
                      ),
                    }
                  : day
              ),
            }
          : stop
      )
    );
  };

  /* ---------------- COST CALCULATIONS ---------------- */
  const dayCost = (day) =>
    day.activities.reduce((sum, a) => sum + Number(a.cost || 0), 0);

  const totalTripCost = stops.reduce(
    (sum, stop) =>
      sum +
      stop.days.reduce((dSum, day) => dSum + dayCost(day), 0),
    0
  );

  /* ---------------- REORDER STOPS ---------------- */
  const moveStop = (index, direction) => {
    const newStops = [...stops];
    const target = newStops[index];
    newStops[index] = newStops[index + direction];
    newStops[index + direction] = target;
    setStops(newStops);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Day-wise Trip Planner
      </h2>

      {/* ADD STOP */}
      <button
        onClick={addStop}
        className="flex items-center gap-2 bg-[#22D3EE] text-white px-4 py-2 rounded-xl mb-6"
      >
        <Plus size={18} /> Add Stop
      </button>

      {/* STOPS */}
      <div className="space-y-6">
        {stops.map((stop, index) => (
          <div
            key={stop.id}
            className="border rounded-2xl p-5 bg-gray-50"
          >
            {/* STOP HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <MapPin size={18} /> Stop {index + 1}
              </h3>

              <div className="flex gap-2">
                {index > 0 && (
                  <ArrowUp
                    className="cursor-pointer"
                    onClick={() => moveStop(index, -1)}
                  />
                )}
                {index < stops.length - 1 && (
                  <ArrowDown
                    className="cursor-pointer"
                    onClick={() => moveStop(index, 1)}
                  />
                )}
              </div>
            </div>

            {/* CITY & DATES */}
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <input
                placeholder="City"
                className="border rounded-lg px-3 py-2"
                onChange={(e) =>
                  setStops(
                    stops.map((s) =>
                      s.id === stop.id
                        ? { ...s, city: e.target.value }
                        : s
                    )
                  )
                }
              />
              <input
                type="date"
                className="border rounded-lg px-3 py-2"
                onChange={(e) =>
                  setStops(
                    stops.map((s) =>
                      s.id === stop.id
                        ? { ...s, startDate: e.target.value }
                        : s
                    )
                  )
                }
              />
              <input
                type="date"
                className="border rounded-lg px-3 py-2"
                onChange={(e) =>
                  setStops(
                    stops.map((s) =>
                      s.id === stop.id
                        ? { ...s, endDate: e.target.value }
                        : s
                    )
                  )
                }
              />
            </div>

            {/* DAYS */}
            {stop.days.map((day, dayIndex) => (
              <div
                key={day.id}
                className="bg-white rounded-xl p-4 mb-3"
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar size={16} />
                  Day {dayIndex + 1} – ₹{dayCost(day)}
                </h4>

                {/* ACTIVITIES */}
                {day.activities.map((act, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-2 mb-2"
                  >
                    <input
                      placeholder="Activity"
                      className="border rounded px-2 py-1"
                      onChange={(e) =>
                        updateActivity(
                          stop.id,
                          day.id,
                          i,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="number"
                      placeholder="Cost"
                      className="border rounded px-2 py-1"
                      onChange={(e) =>
                        updateActivity(
                          stop.id,
                          day.id,
                          i,
                          "cost",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}

                <button
                  onClick={() => addActivity(stop.id, day.id)}
                  className="text-sm text-blue-600 mt-2"
                >
                  + Add Activity
                </button>
              </div>
            ))}

            <button
              onClick={() => addDay(stop.id)}
              className="text-sm text-green-600 mt-2"
            >
              + Add Day
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL COST */}
      <div className="mt-6 text-xl font-bold text-right">
        Total Trip Cost: ₹{totalTripCost}
      </div>
    </div>
  );
};

export default DayWisePlanner;
