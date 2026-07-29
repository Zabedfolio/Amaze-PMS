"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Video, ArrowLeft, Globe, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "../ui/Button";

const mockSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthsList = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function SchedulingWidget({ onStepChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null); 
  const [widgetStep, setWidgetStep] = useState(1); 
  const [timezone, setTimezone] = useState("UTC");
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  
  useEffect(() => {
    if (typeof onStepChange === "function") {
      onStepChange(widgetStep);
    }
  }, [widgetStep, onStepChange]);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
      setTimezone(tz);
      
      const updateClock = () => {
        const time = new Date().toLocaleTimeString("en-US", {
          timeZone: tz,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        setCurrentTimeStr(time);
      };
      
      updateClock();
      const interval = setInterval(updateClock, 60000);
      return () => clearInterval(interval);
    } catch (e) {
      setTimezone("Asia/Kolkata");
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    setActiveSlot(null);
    setWidgetStep(2); 
  };

  const handleBackToCalendar = () => {
    if (widgetStep === 2) {
      setSelectedDate(null);
      setWidgetStep(1);
    } else if (widgetStep === 3) {
      setWidgetStep(2);
    }
  };

  const handleSlotConfirm = (slot) => {
    setSelectedTime(slot);
    setWidgetStep(3); 
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setWidgetStep(4); 
    }, 1200);
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setActiveSlot(null);
    setFormName("");
    setFormEmail("");
    setFormNotes("");
    setWidgetStep(1);
  };

  const isDateInPast = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(year, month, day);
    return dateToCheck < today;
  };

  const isDateAvailable = (day) => {
    if (isDateInPast(day)) return false;
    const dateToCheck = new Date(year, month, day);
    const dayOfWeek = dateToCheck.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; 
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      
      <div className="w-full bg-[#111114] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:grid md:grid-cols-12 min-h-[480px] md:min-h-[520px]">
        
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between bg-white/[0.01]">
          <div>
            
            {widgetStep > 1 && widgetStep < 4 && (
              <button 
                onClick={handleBackToCalendar}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-zinc-400 hover:text-white transition-all mb-6"
              >
                <ArrowLeft size={16} />
              </button>
            )}

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-accent tracking-widest uppercase font-display">Amaze Facility Consulting</span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight font-display">30 Minute Consultation</h3>
              
              <div className="flex flex-col gap-3 pt-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-zinc-500" />
                  <span className="font-medium text-zinc-300">30 min</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Video size={16} className="text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-tight">Web conferencing details provided upon confirmation.</span>
                </div>
              </div>
            </div>
          </div>

          {selectedDate && selectedTime && widgetStep < 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-1.5"
            >
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Selected Appointment</span>
              <span className="text-sm font-semibold text-zinc-200">{formatSelectedDate()}</span>
              <span className="text-sm font-bold text-emerald-400">{selectedTime}</span>
            </motion.div>
          )}

          {widgetStep < 4 && (
            <div className="hidden md:block mt-8 pt-4 border-t border-white/5 text-[11px] text-zinc-600">
              Action Group Operational SOP Consultation Desks.
            </div>
          )}
        </div>

        <div className="md:col-span-8 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {(widgetStep === 1 || widgetStep === 2) && (
              <motion.div 
                key="step-calendar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex-grow flex flex-col lg:grid lg:grid-cols-12"
              >
                
                <div className={`${widgetStep === 2 ? "lg:col-span-7" : "lg:col-span-12"} p-8 flex flex-col justify-between`}>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-6 font-display">Select a Date & Time</h4>
                    
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-bold text-zinc-300 font-display">
                        {monthsList[month]} {year}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={handlePrevMonth}
                          className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                        >
                          &lt;
                        </button>
                        <button 
                          onClick={handleNextMonth}
                          className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                        >
                          &gt;
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                      {daysOfWeek.map((day, idx) => (
                        <div key={idx} className="py-1">{day}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                      
                      {Array.from({ length: firstDayIndex }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="py-2.5 opacity-0" />
                      ))}

                      {Array.from({ length: totalDays }).map((_, idx) => {
                        const day = idx + 1;
                        const available = isDateAvailable(day);
                        const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

                        return (
                          <button
                            key={`day-${day}`}
                            disabled={!available}
                            onClick={() => handleDateClick(day)}
                            className={`py-2.5 rounded-full flex items-center justify-center transition-all relative ${
                              isSelected
                                ? "bg-accent text-white font-bold shadow-[0_0_12px_rgba(255,80,4,0.4)]"
                                : available
                                  ? "text-zinc-200 hover:bg-white/5 font-semibold bg-accent/5 hover:text-accent"
                                  : "text-zinc-700 cursor-not-allowed"
                            }`}
                          >
                            {day}
                            
                            {available && !isSelected && (
                              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-accent/40" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-500">
                    <Globe size={14} className="text-zinc-600" />
                    <span>
                      {timezone} ({currentTimeStr || "--:--"})
                    </span>
                  </div>
                </div>

                {widgetStep === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col max-h-[500px]"
                  >
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">
                      {selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </span>
                    <h5 className="text-sm font-bold text-white mb-4">Select Time Slot</h5>

                    <div className="flex-grow overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {mockSlots.map((slot) => {
                        const isActive = activeSlot === slot;
                        return (
                          <div key={slot} className="flex gap-2 w-full">
                            <button
                              onClick={() => setActiveSlot(slot)}
                              className={`py-3.5 px-4 rounded-xl border text-sm font-semibold transition-all text-center flex-grow ${
                                isActive 
                                  ? "bg-accent/10 border-accent text-accent" 
                                  : "bg-white/[0.02] border-white/5 text-zinc-300 hover:border-white/10 hover:bg-white/[0.04]"
                              }`}
                            >
                              {slot}
                            </button>
                            
                            <AnimatePresence>
                              {isActive && (
                                <motion.button
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: 85 }}
                                  exit={{ opacity: 0, width: 0 }}
                                  onClick={() => handleSlotConfirm(slot)}
                                  className="bg-accent text-white rounded-xl text-xs font-bold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 flex-shrink-0"
                                >
                                  Confirm
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {widgetStep === 3 && (
              <motion.div 
                key="step-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-8 w-full flex-grow flex flex-col justify-center"
              >
                <div className="max-w-md mx-auto w-full">
                  <h4 className="text-xl font-bold text-white mb-2 font-display">Confirm Details</h4>
                  <p className="text-xs text-zinc-400 mb-6">
                    Enter your coordinates to complete the appointment scheduling sequence.
                  </p>

                  <form id="scheduling-form" onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-accent outline-none transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Your Email *</label>
                      <input 
                        type="email" 
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-accent outline-none transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Additional Notes</label>
                      <textarea 
                        rows={3}
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Please share anything that will help prepare for our meeting."
                        className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-accent outline-none transition-colors resize-none"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        variant="accent" 
                        className="w-full py-4 text-xs tracking-wider uppercase font-bold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Scheduling Event..." : "Schedule Event"}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {widgetStep === 4 && (
              <motion.div 
                key="step-success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-8 w-full flex-grow flex flex-col items-center justify-center text-center"
              >
                <div className="max-w-md flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>

                  <h4 className="text-2xl font-extrabold text-white tracking-tight mb-2 font-display">Confirmed!</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    You are scheduled with Amaze PMS. A calendar invitation with video call details has been sent to your email.
                  </p>

                  <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-left mb-8 space-y-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Meeting Type</span>
                      <span className="text-sm font-bold text-white mt-0.5">30 Minute Consultation</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Date & Time</span>
                      <span className="text-sm font-bold text-emerald-400 mt-0.5">
                        {formatSelectedDate()} at {selectedTime} ({timezone})
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact Info</span>
                      <span className="text-xs text-zinc-300 mt-0.5">{formName} ({formEmail})</span>
                    </div>
                  </div>

                  <button 
                    onClick={resetBooking}
                    className="text-xs font-bold text-accent hover:text-accent-hover tracking-wider uppercase transition-colors"
                  >
                    Schedule Another Event
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors select-none">
        <a href="#troubleshoot" className="hover:underline flex items-center gap-1">
          <AlertCircle size={10} />
          Troubleshoot
        </a>
        <span>•</span>
        <a href="#cookies" className="hover:underline">Cookie settings</a>
      </div>
    </div>
  );
}
