import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  Video,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CalendarEvent } from '../types';

export const CalendarSyncView: React.FC = () => {
  const { calendarEvents, addCalendarEvent, projects } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<'TikTok' | 'YouTube Shorts' | 'Instagram Reels'>('TikTok');
  const [date, setDate] = useState('2026-10-05');
  const [time, setTime] = useState('17:00');
  const [format, setFormat] = useState('Disney');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvt: CalendarEvent = {
      id: 'evt_' + Date.now(),
      title,
      platform,
      date,
      time,
      format,
      status: 'scheduled'
    };

    addCalendarEvent(newEvt);
    setTitle('');
    setShowAddModal(false);
  };

  const handleExportICS = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//NovaGen Studio//Content Calendar//EN\n";
    calendarEvents.forEach(evt => {
      const cleanDate = evt.date.replace(/-/g, '');
      const cleanTime = evt.time.replace(/:/g, '') + '00';
      icsContent += `BEGIN:VEVENT\nSUMMARY:${evt.title} (${evt.platform})\nDTSTART:${cleanDate}T${cleanTime}Z\nDESCRIPTION:NovaGen Studio Scheduled Release for ${evt.format}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `novagen_publishing_schedule.ics`;
    a.click();
  };

  const getPlatformBadge = (plat: string) => {
    switch (plat) {
      case 'TikTok':
        return 'bg-black text-white dark:bg-white dark:text-black';
      case 'YouTube Shorts':
        return 'bg-red-600 text-white';
      case 'Instagram Reels':
        return 'bg-gradient-to-r from-purple-600 to-pink-500 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Content Calendar & Sync
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Schedule automated multi-platform video releases, track peak engagement times & export to Google Calendar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportICS}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sync iCal / Google</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Release</span>
          </button>
        </div>
      </div>

      {/* Schedule Timeline List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timeline cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="p-4 rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-blue-600" />
              <span>Upcoming Scheduled Drops ({calendarEvents.length})</span>
            </h3>

            <div className="space-y-3">
              {calendarEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-400 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getPlatformBadge(evt.platform)}`}>
                        {evt.platform}
                      </span>
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {evt.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                      <span>Format: {evt.format}</span>
                      <span>·</span>
                      <span>Status: {evt.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                        {evt.date}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {evt.time} EST
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Sync Info & Best Posting Windows */}
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              Optimal Publishing Windows
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/30">
                <div className="font-bold text-purple-700 dark:text-purple-300">TikTok Peak</div>
                <div className="text-neutral-600 dark:text-neutral-400 mt-0.5">18:00 – 21:00 EST (Thursday & Sunday)</div>
              </div>

              <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30">
                <div className="font-bold text-red-700 dark:text-red-300">YouTube Shorts</div>
                <div className="text-neutral-600 dark:text-neutral-400 mt-0.5">12:00 – 15:00 EST (High retention noon hour)</div>
              </div>

              <div className="p-3 rounded-2xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200/50 dark:border-pink-900/30">
                <div className="font-bold text-pink-700 dark:text-pink-300">Instagram Reels</div>
                <div className="text-neutral-600 dark:text-neutral-400 mt-0.5">09:00 – 11:00 EST (Morning commute feed)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in select-none">
          <div className="bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Schedule Video Drop
            </h3>

            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-500 mb-1">Release Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Disney Puppy Remix Drop"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 border border-transparent"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-500 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-500 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-500 mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
                >
                  Schedule Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
