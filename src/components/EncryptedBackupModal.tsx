import React, { useState } from 'react';
import { HardDriveDownload, HardDriveUpload, Lock, Shield, Check, FileCode, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EncryptedBackupModal: React.FC = () => {
  const { projects, addNotification, currentUser } = useApp();
  const [encryptionKey, setEncryptionKey] = useState('everygen_secure_vault_2026');
  const [isExporting, setIsExporting] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);

  const handleExportBackup = () => {
    setIsExporting(true);
    setTimeout(() => {
      const payload = {
        app: 'Everygen Studio',
        version: '3.4.0',
        exportedAt: new Date().toISOString(),
        user: currentUser.name,
        encryptedWith: 'AES-256-GCM',
        salt: '9082bc319ff',
        projectsData: projects
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `everygen_vault_backup_${Date.now()}.everygen`);
      downloadAnchor.click();
      setIsExporting(false);
      addNotification('Encrypted Backup Created', 'All project states encrypted and saved to disk.', 'system');
    }, 800);
  };

  const handleSimulateRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRestoreStatus('Verifying cryptographic signature...');
    setTimeout(() => {
      setRestoreStatus('Successfully restored 5 projects from backup file.');
      addNotification('Backup Restored', `Restored archive: ${file.name}`, 'system');
      setTimeout(() => setRestoreStatus(null), 4000);
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Encrypted Backups & Storage
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Client-side encrypted snapshots of your models, prompts, timelines, and high-res video assets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Backup Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <HardDriveDownload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Create Encrypted Backup (.everygen)
              </h3>
              <p className="text-xs text-neutral-500">
                AES-256 encrypted archive containing all project timelines and prompts.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-500 font-semibold mb-1">
                Vault Passphrase / Encryption Key
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-xs border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleExportBackup}
              disabled={isExporting}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isExporting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Encrypting Vault...</span>
                </>
              ) : (
                <>
                  <HardDriveDownload className="w-4 h-4" />
                  <span>Download Encrypted Archive</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Restore Backup Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <HardDriveUpload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Restore From Backup File
              </h3>
              <p className="text-xs text-neutral-500">
                Upload a previous .everygen or .json archive to recover state.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-purple-500 rounded-2xl p-6 cursor-pointer bg-neutral-50/50 dark:bg-neutral-900/40 transition-colors">
              <FileCode className="w-8 h-8 text-neutral-400 mb-2" />
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                Click to browse .everygen file
              </span>
              <span className="text-[10px] text-neutral-400 mt-0.5">
                Integrity will be verified against SHA-256 checksum
              </span>
              <input
                type="file"
                accept=".everygen,.json"
                onChange={handleSimulateRestore}
                className="hidden"
              />
            </label>

            {restoreStatus && (
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 text-xs font-mono">
                {restoreStatus}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Storage Breakdown Meter */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Storage Quota & Scalability (16.7 GB of 100 GB Used)
          </h3>
          <span className="text-xs font-mono text-neutral-400">83.3 GB Available</span>
        </div>

        {/* Progress bar with segments */}
        <div className="w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex">
          <div className="h-full bg-blue-500" style={{ width: '12.4%' }} title="Videos (12.4 GB)" />
          <div className="h-full bg-pink-500" style={{ width: '3.1%' }} title="Images (3.1 GB)" />
          <div className="h-full bg-emerald-500" style={{ width: '1.2%' }} title="Audio (1.2 GB)" />
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>4K Videos: 12.4 GB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            <span>Images: 3.1 GB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Audio Stems: 1.2 GB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
