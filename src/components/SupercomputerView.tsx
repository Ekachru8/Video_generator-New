import React from 'react';
import { Cpu, Terminal, Activity, Zap, Server, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupercomputerView: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {activeTab === 'mcp' ? 'Model Context Protocol (MCP) Node' : 'Everygen Supercomputer GPU Cluster'}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {activeTab === 'mcp'
            ? 'Connect Claude, Cursor, and custom autonomous agents directly to Everygen video pipelines.'
            : 'Distributed H100 SXM5 render mesh running low-latency video synthesis and real-time audio diffusion.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Cluster Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            NOMINAL (99.98%)
          </div>
          <div className="text-[11px] text-neutral-500">
            64 active tensor nodes online across US-East & EU-Central
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Median Synthesis Latency</span>
            <Activity className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
            4.2s / clip
          </div>
          <div className="text-[11px] text-neutral-500">
            Accelerated via Seedance 2.5 FP8 TensorRT execution
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>GPU Temperature</span>
            <Zap className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
            48°C (Liquid Cooled)
          </div>
          <div className="text-[11px] text-neutral-500">
            Automated load balancing & thermal throttling guard
          </div>
        </div>
      </div>

      {/* Terminal Telemetry / Server Matrix */}
      <div className="p-6 rounded-3xl bg-neutral-900 text-neutral-100 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold text-neutral-200">
              {activeTab === 'mcp' ? 'mcp.everygen.json configuration' : 'cluster_telemetry.log'}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">SSH2 ENCRYPTED</span>
        </div>

        <pre className="p-4 rounded-2xl bg-neutral-950 font-mono text-xs leading-relaxed text-emerald-400/90 overflow-x-auto border border-neutral-800">
{activeTab === 'mcp' ? `{
  "mcpServers": {
    "everygen-video": {
      "command": "npx",
      "args": ["-y", "@everygen/mcp-server"],
      "env": {
        "EVERYGEN_API_KEY": "evg_live_9f82••••••••••••••4a91"
      }
    }
  }
}` : `[11:51:02 UTC] Node cluster node-us-east-4a allocated to user_sikiblue
[11:51:03 UTC] Kling 3.0 weights warm in VRAM (80GB / 80GB)
[11:51:04 UTC] Video frame generation started: 10s @ 1080p 24fps
[11:51:07 UTC] Synthesis completed with 0 frame drops
[11:51:08 UTC] Watermark removed and encoded to H.264 mp4 stream`}
        </pre>
      </div>
    </div>
  );
};
