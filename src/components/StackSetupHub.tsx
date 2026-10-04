import React from 'react';
export const triggerDirectZipDownload = async () => {};
export const StackSetupHub: React.FC<{ userEmail?: string | null; onGoogleSignIn: () => void }> = ({ userEmail }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-200">
    <h1 className="text-2xl font-bold text-slate-900">Cloud Sync & Deployment Ready</h1>
    <p className="text-sm text-slate-600 mt-2">{userEmail ? `Connected as ${userEmail}` : 'Sign in with Google to sync your progress.'}</p>
  </div>
);