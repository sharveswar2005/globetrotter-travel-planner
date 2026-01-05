import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function CalendarPage({ trips, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const getTripForDate = (date) =>
    trips.find(
      (t) =>
        new Date(date) >= new Date(t.start) &&
        new Date(date) <= new Date(t.end)
    );

  const getDayPlan = () => {
    if (!selectedDate) return null;
    const trip = getTripForDate(selectedDate);
    return trip?.days.find(
      (d) => d.date === selectedDate.toISOString().split("T")[0]
    );
  };

  const dayPlan = getDayPlan();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl w-[900px] flex gap-6">
        {/* CALENDAR */}
        <div>
          <Calendar
            onChange={setSelectedDate}
            tileContent={({ date }) => {
              const trip = getTripForDate(date);
              return trip ? (
                <div className="text-xs mt-1 bg-indigo-600 text-white rounded px-1">
                  {trip.city}
                </div>
              ) : null;
            }}
            prevLabel={<ChevronLeft />}
            nextLabel={<ChevronRight />}
          />
        </div>

        {/* DAY PLAN */}
        <div className="flex-1">
          <div className="flex justify-between mb-3">
            <h3 className="font-bold">Day Plan</h3>
            <X onClick={onClose} className="cursor-pointer" />
          </div>

          {!dayPlan && (
            <p className="text-gray-500">
              Select a date to view itinerary
            </p>
          )}

          {dayPlan && (
            <>
              <p className="font-semibold mb-2">{dayPlan.date}</p>
              {dayPlan.activities.length === 0 && (
                <p className="text-sm text-gray-500">No activities planned</p>
              )}
              {dayPlan.activities.map((a, i) => (
                <div
                  key={i}
                  className="border p-2 rounded mb-2 flex justify-between"
                >
                  <span>{a.name}</span>
                  <span className="font-semibold">${a.cost}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
