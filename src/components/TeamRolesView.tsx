import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Key,
  Lock,
  UserCheck,
  Check,
  AlertTriangle,
  QrCode,
  Smartphone,
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TeamRolesView: React.FC = () => {
  const { currentUser, toggle2FA, collaborators, switchRole } = useApp();
  const [totpCode, setTotpCode] = useState('');
  const [verifiedTotp, setVerifiedTotp] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);

  const permissionsMatrix = [
    { name: 'Generate 4K UHD Video', owner: true, admin: true, creator: true, reviewer: false },
    { name: 'Spend Generation Credits', owner: true, admin: true, creator: true, reviewer: false },
    { name: 'Delete Project Assets', owner: true, admin: true, creator: false, reviewer: false },
    { name: 'Manage Billing & Upgrades', owner: true, admin: true, creator: false, reviewer: false },
    { name: 'Create API Keys & Webhooks', owner: true, admin: false, creator: false, reviewer: false },
    { name: 'Review, Comment & Approve', owner: true, admin: true, creator: true, reviewer: true },
    { name: 'Invite Team Members', owner: true, admin: true, creator: false, reviewer: false }
  ];

  const recoveryCodes = [
    'EVG-9921-X902',
    'EVG-4412-B817',
    'EVG-3310-M924',
    'EVG-8820-K119'
  ];

  const handleCopyRecovery = () => {
    navigator.clipboard.writeText(recoveryCodes.join('\n'));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 select-none">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Roles, Permissions & Two-Factor Auth (2FA)
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Enforce granular role-based access control (RBAC) and hardware-grade security across your production team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Two-Factor Authentication Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Two-Factor Authentication (2FA)
                </h3>
                <p className="text-xs text-neutral-500">
                  TOTP authenticator app protection (Google Authenticator, 1Password)
                </p>
              </div>
            </div>

            <button
              onClick={toggle2FA}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentUser.twoFactorEnabled
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {currentUser.twoFactorEnabled ? '2FA Active' : '2FA Disabled'}
            </button>
          </div>

          {currentUser.twoFactorEnabled && (
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center gap-4">
                {/* QR representation */}
                <div className="w-24 h-24 rounded-xl bg-white p-2 border border-neutral-300 shadow-xs flex items-center justify-center">
                  <div className="w-full h-full bg-neutral-900 rounded p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-4 h-4 bg-white rounded-xs" />
                      <div className="w-4 h-4 bg-white rounded-xs" />
                    </div>
                    <div className="text-[7px] text-center font-mono text-white">EVERYGEN</div>
                    <div className="flex justify-between">
                      <div className="w-4 h-4 bg-white rounded-xs" />
                      <div className="w-2 h-2 bg-white rounded-xs" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-neutral-800 dark:text-neutral-200">
                    Scan with Authenticator
                  </div>
                  <div className="text-[11px] text-neutral-500 leading-relaxed">
                    Open your TOTP app and scan this QR code or enter secret key:
                  </div>
                  <div className="font-mono text-[10px] bg-neutral-200/80 dark:bg-neutral-800 px-2 py-0.5 rounded w-fit text-blue-600">
                    JBSW Y3DP EHPK 3PXP
                  </div>
                </div>
              </div>

              {/* Recovery Codes */}
              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Emergency Recovery Codes
                  </span>
                  <button
                    onClick={handleCopyRecovery}
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {copiedCodes ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCodes ? 'Copied!' : 'Copy all'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  {recoveryCodes.map(code => (
                    <div key={code} className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 text-center border border-neutral-200 dark:border-neutral-700">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current User Role Switcher */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Active Session Role
              </h3>
              <p className="text-xs text-neutral-500">
                Currently operating as <strong>{currentUser.role}</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {(['Owner', 'Admin', 'Creator', 'Reviewer'] as const).map(role => (
              <button
                key={role}
                onClick={() => switchRole(role)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  currentUser.role === role
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 font-bold text-blue-600 dark:text-blue-400'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>{role}</span>
                  {currentUser.role === role && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="text-[10px] text-neutral-400 font-normal">
                  {role === 'Owner' && 'Full system, billing & admin authority'}
                  {role === 'Admin' && 'Project, credit & team management'}
                  {role === 'Creator' && 'Prompting & high-res generation'}
                  {role === 'Reviewer' && 'Comment & timeline annotation only'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role Permission Matrix Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Granular Permission Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-semibold">
                <th className="pb-3">Action Capability</th>
                <th className="pb-3 text-center">Owner</th>
                <th className="pb-3 text-center">Admin</th>
                <th className="pb-3 text-center">Creator</th>
                <th className="pb-3 text-center">Reviewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
              {permissionsMatrix.map((row) => (
                <tr key={row.name} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                  <td className="py-3 font-medium text-neutral-800 dark:text-neutral-200">
                    {row.name}
                  </td>
                  <td className="py-3 text-center">
                    {row.owner ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : '—'}
                  </td>
                  <td className="py-3 text-center">
                    {row.admin ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : '—'}
                  </td>
                  <td className="py-3 text-center">
                    {row.creator ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : '—'}
                  </td>
                  <td className="py-3 text-center">
                    {row.reviewer ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
