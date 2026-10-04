import React, { useState } from 'react';
import {
  Users,
  Send,
  MessageSquare,
  Clock,
  Share2,
  Copy,
  Check,
  Shield,
  Eye,
  Edit3,
  History,
  Sparkles,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoVisualPlayer } from './VideoVisualPlayer';

export const CollaborationRoom: React.FC = () => {
  const {
    collaborators,
    comments,
    addComment,
    currentUser,
    projects
  } = useApp();

  const [newComment, setNewComment] = useState('');
  const [commentTime, setCommentTime] = useState(2.4);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'comments' | 'history' | 'members'>('comments');

  const activeProject = projects[0] || {
    id: 'active_collab',
    title: 'Hydrate Commercial Remix 4K',
    visualTheme: 'car',
    duration: '8s',
    resolution: '1080p',
    model: 'Seedance 2.5',
    aspectRatio: '9:16' as const
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(newComment, commentTime);
    setNewComment('');
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(`https://novagen.ai/collab/room_nvg_${activeProject.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Live Session Active
            </span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {activeProject.title}
          </h2>
          <p className="text-xs text-neutral-500">
            Real-time multi-user review, frame-accurate commenting & permission controls.
          </p>
        </div>

        {/* Collaborators Avatar Stack & Share CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            {collaborators.map(c => (
              <div
                key={c.id}
                className="relative w-8 h-8 rounded-full border-2 border-white dark:border-[#0c0d12] flex items-center justify-center text-white text-xs font-bold shadow-xs cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: c.color }}
                title={`${c.name} (${c.role}) - ${c.activeNow ? 'Active now' : c.lastActive}`}
              >
                {c.avatar}
                {c.activeNow && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleCopyShareLink}
            className="px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Room'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Synchronized Video Player & Marker Scrubber */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col items-center">
            <div className="w-full max-w-sm">
              <VideoVisualPlayer
                theme={activeProject.visualTheme || 'cinematic-studio'}
                title={activeProject.title}
                prompt={activeProject.prompt}
                duration={activeProject.duration || '8s'}
                aspectRatio="9:16"
              />
            </div>

            {/* Frame Marker Bar */}
            <div className="w-full mt-4 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Timeline Annotation Point</span>
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                  {commentTime.toFixed(1)}s
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="8"
                step="0.1"
                value={commentTime}
                onChange={(e) => setCommentTime(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>0.0s (Hook)</span>
                <span>4.0s (Action Peak)</span>
                <span>8.0s (Outro CTA)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Collaboration Sidebar with Tabs */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-white dark:bg-[#080a12] border border-neutral-200 dark:border-neutral-800 shadow-md p-4 flex flex-col h-[520px]">
            {/* Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl mb-4 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('comments')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'comments'
                    ? 'bg-white dark:bg-[#1c1d29] text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Comments ({comments.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'history'
                    ? 'bg-white dark:bg-[#1c1d29] text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Version Log
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'members'
                    ? 'bg-white dark:bg-[#1c1d29] text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Team ({collaborators.length})
              </button>
            </div>

            {/* Comments Stream */}
            {activeTab === 'comments' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                            {c.userAvatar}
                          </div>
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">
                            {c.userName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                          <span className="px-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                            @{c.timestampSeconds.toFixed(1)}s
                          </span>
                          <span>{c.createdAt}</span>
                        </div>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed pl-7">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Post Comment Input */}
                <form onSubmit={handlePostComment} className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl p-1.5 border border-neutral-200 dark:border-neutral-700">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={`Add timestamped note at ${commentTime.toFixed(1)}s...`}
                      className="flex-1 px-3 py-1.5 bg-transparent text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none placeholder:text-neutral-400"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Version Log Tab */}
            {activeTab === 'history' && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {[
                  { v: 'v3 (Current)', date: '10m ago', author: 'Sarah Chen', desc: 'Regenerated with 1080p Seedance 2.5 at 24fps motion smoothing.' },
                  { v: 'v2', date: '2h ago', author: 'Marcus Vance', desc: 'Updated camera orbit speed to 6 and added rim lighting prompt cues.' },
                  { v: 'v1', date: 'Yesterday', author: 'sikiblue', desc: 'Initial draft remix from Hydrate commercial template.' }
                ].map(hist => (
                  <div key={hist.v} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                      <span>{hist.v}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{hist.date}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 font-medium">by {hist.author}</div>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                      {hist.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
                {collaborators.map(c => (
                  <div key={c.id} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: c.color }}>
                        {c.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-neutral-100">{c.name}</div>
                        <div className="text-[10px] text-neutral-400">{c.email}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold">
                      {c.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
