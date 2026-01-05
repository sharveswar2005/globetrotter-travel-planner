import React, { useEffect, useState } from "react";

export default function CreateTrip({ onSave, tripToEdit, onDelete }) {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState([]);

  /* ================= LOAD EDIT TRIP ================= */
  useEffect(() => {
    if (tripToEdit) {
      setTripName(tripToEdit.city);
      setStartDate(tripToEdit.start);
      setEndDate(tripToEdit.end);
      setDays(tripToEdit.days || []);
    }
  }, [tripToEdit]);

  /* ================= AUTO-GENERATE DAYS (ONLY FOR NEW TRIP) ================= */
  useEffect(() => {
    if (!startDate || !endDate || tripToEdit) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const generatedDays = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      generatedDays.push({
        date: d.toISOString().split("T")[0],
        activities: [],
      });
    }

    setDays(generatedDays);
  }, [startDate, endDate, tripToEdit]);

  /* ================= ACTIVITY HANDLERS ================= */
  const addActivity = (dayIdx) => {
    setDays((prev) =>
      prev.map((day, idx) =>
        idx === dayIdx
          ? {
              ...day,
              activities: [...day.activities, { name: "", cost: 0 }],
            }
          : day
      )
    );
  };

  const updateActivity = (dayIdx, actIdx, field, value) => {
    setDays((prev) =>
      prev.map((day, dIdx) =>
        dIdx === dayIdx
          ? {
              ...day,
              activities: day.activities.map((act, aIdx) =>
                aIdx === actIdx ? { ...act, [field]: value } : act
              ),
            }
          : day
      )
    );
  };

  /* ================= TOTAL COST ================= */
  const totalCost = days.reduce(
    (sum, day) =>
      sum +
      day.activities.reduce((s, act) => s + Number(act.cost || 0), 0),
    0
  );

  /* ================= SAVE ================= */
  const handleSave = () => {
    if (!tripName || !startDate || !endDate) {
      alert("Please fill trip name and dates");
      return;
    }

    onSave({
      id: tripToEdit?.id || Date.now(),
      city: tripName,
      start: startDate,
      end: endDate,
      days,
      totalCost,
    });
  };

  /* ================= UI ================= */
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {tripToEdit ? "Edit Trip" : "Create Trip"}
      </h2>

      <input
        placeholder="Trip Name"
        className="w-full border p-2 rounded mb-3"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <input
          type="date"
          className="flex-1 border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="flex-1 border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* DAY-WISE ITINERARY */}
      <div className="max-h-[320px] overflow-y-auto space-y-4">
        {days.map((day, dIdx) => (
          <div key={day.date} className="border rounded-xl p-3">
            <h4 className="font-semibold mb-2">
              Day {dIdx + 1} – {day.date}
            </h4>

            {day.activities.map((act, aIdx) => (
              <div key={aIdx} className="flex gap-2 mb-2">
                <input
                  placeholder="Activity"
                  className="flex-1 border p-1 rounded"
                  value={act.name}
                  onChange={(e) =>
                    updateActivity(dIdx, aIdx, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Cost"
                  className="w-24 border p-1 rounded"
                  value={act.cost}
                  onChange={(e) =>
                    updateActivity(dIdx, aIdx, "cost", e.target.value)
                  }
                />
              </div>
            ))}

            <button
              onClick={() => addActivity(dIdx)}
              className="text-blue-500 text-sm"
            >
              + Add Activity
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 font-bold text-green-600">
        Total Cost: ${totalCost}
      </p>

      <div className="flex gap-2 mt-4">
        {tripToEdit && (
          <button
            onClick={() => onDelete(tripToEdit.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded"
          >
            Delete
          </button>
        )}
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white py-2 rounded"
        >
          Save Trip
        </button>
      </div>
    </div>
  );
}
