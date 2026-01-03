import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRIPS = [
  {
    id: 1,
    title: "Paris Trip",
    start: new Date("2024-01-04"),
    end: new Date("2024-01-07"),
  },
  {
    id: 2,
    title: "NYC Getaway",
    start: new Date("2024-01-15"),
    end: new Date("2024-01-18"),
  },
  {
    id: 3,
    title: "Japan Adventure",
    start: new Date("2024-01-16"),
    end: new Date("2024-01-22"),
  },
];

const CalendarPage = () => {
  const [value, setValue] = useState(new Date("2024-01-01"));

  const getTrip = (date) =>
    TRIPS.find((t) => date >= t.start && date <= t.end);

  return (
    <div className="min-h-screen bg-[#FBFDFF] p-8">
      <h1 className="text-2xl font-bold mb-6">Calendar View</h1>

      <div className="bg-white p-6 rounded-3xl shadow max-w-4xl mx-auto">
        <Calendar
          value={value}
          onChange={setValue}
          tileContent={({ date, view }) =>
            view === "month" && getTrip(date) ? (
              <div className="mt-1 text-xs bg-indigo-600 text-white rounded px-1">
                {getTrip(date).title}
              </div>
            ) : null
          }
          prevLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
