import React, { useState } from 'react';
import {
  Copy,
  Check,
  Database,
  Globe,
  GitBranch,
  CloudCheck,
  LogIn,
  Download,
  FolderArchive
} from 'lucide-react';
import JSZip from 'jszip';
import { REAL_VIDEO_EPISODES } from '../data/realVideoCatalog';

// Import raw source files directly via Vite's ?raw loader so the user can download the exact 100% buildable project ZIP from inside the web app!
import rawPackageJson from '../../package.json?raw';
import rawTsConfig from '../../tsconfig.json?raw';
import rawViteConfig from '../../vite.config.ts?raw';
import rawIndexHtml from '../../index.html?raw';
import rawVercelJson from '../../vercel.json?raw';
import rawFirebaseConfig from '../../firebase-applet-config.json?raw';
import rawFirestoreRules from '../../firestore.rules?raw';
import rawMainTsx from '../main.tsx?raw';
import rawIndexCss from '../index.css?raw';
import rawAppTsx from '../App.tsx?raw';
import rawFirebaseLib from '../lib/firebase.ts?raw';
import rawCurriculum from '../data/curriculum.ts?raw';
import rawSeeds1 from '../data/episodeSeedsPart1.ts?raw';
import rawSeeds2 from '../data/episodeSeedsPart2.ts?raw';
import rawRealCatalog from '../data/realVideoCatalog.ts?raw';
import rawBlockySvg from './BlockyCharacterSVG.tsx?raw';
import rawRealPlayer from './RealVideoPlayer.tsx?raw';
import rawEpisodeQuiz from './EpisodeQuiz.tsx?raw';
import rawGrammarLab from './GrammarLabTab.tsx?raw';
import rawWeeklyPlanner from './WeeklyCalendarPlanner.tsx?raw';

interface StackSetupModalProps {
  userEmail?: string | null;
  onGoogleSignIn: () => void;
}

export const triggerDirectZipDownload = async () => {
  const zip = new JSZip();

  const supabaseSqlSchema = `-- SUPABASE POSTGRESQL SCHEMA FOR 100 ENGLISH VIDEOS, 1000 QUESTIONS & 3-VIDEOS/WEEK CALENDAR
create table if not exists public.episodes (
  id integer primary key,
  title text not null,
  level text not null check (level in ('L3', 'L4')),
  duration_minutes integer not null check (duration_minutes between 15 and 20),
  youtube_url text not null,
  grammar_rule_1 text not null,
  grammar_rule_2 text not null,
  week_number integer not null,
  day_slot_index integer not null
);

create table if not exists public.user_progress (
  user_id uuid references auth.users(id) primary key,
  start_date date not null default current_date,
  study_days text not null default 'Mon-Wed-Fri',
  scores_map jsonb not null default '{}'::jsonb,
  custom_youtube_ids jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Users manage own English schedule & scores"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);`;

  const cleanPackageJsonForVercel = JSON.stringify(
    {
      name: 'super-bear-english-adventure',
      private: true,
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite --port=3000 --host=0.0.0.0',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        '@tailwindcss/vite': '^4.3.3',
        '@vitejs/plugin-react': '^6.1.1',
        firebase: '^12.19.0',
        jszip: '^3.10.2',
        'lucide-react': '^0.546.0',
        react: '^19.0.1',
        'react-dom': '^19.0.1',
        vite: '^8.3.0'
      },
      devDependencies: {
        '@types/node': '^22.14.0',
        '@types/react': '^19.3.0',
        '@types/react-dom': '^19.3.0',
        tailwindcss: '^4.3.3',
        typescript: '^7.0.2'
      }
    },
    null,
    2
  );

  // Root configuration files
  zip.file('.npmrc', 'legacy-peer-deps=true\n');
  zip.file('package.json', cleanPackageJsonForVercel);
  zip.file('tsconfig.json', rawTsConfig);
  zip.file('vite.config.ts', rawViteConfig);
  zip.file('index.html', rawIndexHtml);
  zip.file('vercel.json', rawVercelJson);
  zip.file('firebase-applet-config.json', rawFirebaseConfig);
  zip.file('firestore.rules', rawFirestoreRules);
  zip.file('supabase_schema.sql', supabaseSqlSchema);

  // Source files
  zip.file('src/main.tsx', rawMainTsx);
  zip.file('src/index.css', rawIndexCss);
  zip.file('src/App.tsx', rawAppTsx);
  zip.file('src/lib/firebase.ts', rawFirebaseLib);

  // Data files
  zip.file('src/data/curriculum.ts', rawCurriculum);
  zip.file('src/data/episodeSeedsPart1.ts', rawSeeds1);
  zip.file('src/data/episodeSeedsPart2.ts', rawSeeds2);
  zip.file('src/data/realVideoCatalog.ts', rawRealCatalog);

  // Component files
  zip.file('src/components/BlockyCharacterSVG.tsx', rawBlockySvg);
  zip.file('src/components/RealVideoPlayer.tsx', rawRealPlayer);
  zip.file('src/components/EpisodeQuiz.tsx', rawEpisodeQuiz);
  zip.file('src/components/GrammarLabTab.tsx', rawGrammarLab);
  zip.file('src/components/WeeklyCalendarPlanner.tsx', rawWeeklyPlanner);
  zip.file(
    'src/components/StackSetupHub.tsx',
    `import React from 'react';
export const triggerDirectZipDownload = async () => {};
export const StackSetupHub: React.FC<{ userEmail?: string | null; onGoogleSignIn: () => void }> = ({ userEmail }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-200">
    <h1 className="text-2xl font-bold text-slate-900">Cloud Sync & Deployment Ready</h1>
    <p className="text-sm text-slate-600 mt-2">{userEmail ? \`Connected as \${userEmail}\` : 'Sign in with Google to sync your progress.'}</p>
  </div>
);`
  );

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'super-bear-english-vercel-github.zip';
  a.click();
  URL.revokeObjectURL(url);
};

export const StackSetupHub: React.FC<StackSetupModalProps> = ({
  userEmail,
  onGoogleSignIn
}) => {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);

  // Direct GitHub Push State (No Command Line, No File Upload Hassle!)
  const [ghToken, setGhToken] = useState('');
  const [ghOwner, setGhOwner] = useState('');
  const [ghRepo, setGhRepo] = useState('');
  const [ghBranch, setGhBranch] = useState('main');
  const [isPushingGh, setIsPushingGh] = useState(false);
  const [ghPushStatus, setGhPushStatus] = useState<{
    type: 'idle' | 'progress' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleDirectPushToGitHub = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = ghToken.trim();
    const owner = ghOwner.trim();
    const repo = ghRepo.trim();
    const branch = ghBranch.trim() || 'main';

    if (!token || !owner || !repo) {
      setGhPushStatus({
        type: 'error',
        message: 'Please fill in your GitHub Token, GitHub Username, and Repository Name.'
      });
      return;
    }

    setIsPushingGh(true);
    setGhPushStatus({
      type: 'progress',
      message: 'Connecting to GitHub API & preparing all 20 project files (with fixed videos + fixed package.json)...'
    });

    try {
      const cleanPackageJsonForVercel = JSON.stringify(
        {
          name: 'super-bear-english-adventure',
          private: true,
          version: '1.0.0',
          type: 'module',
          scripts: {
            dev: 'vite --port=3000 --host=0.0.0.0',
            build: 'vite build',
            preview: 'vite preview'
          },
          dependencies: {
            '@tailwindcss/vite': '^4.3.3',
            '@vitejs/plugin-react': '^6.1.1',
            firebase: '^12.19.0',
            jszip: '^3.10.2',
            'lucide-react': '^0.546.0',
            react: '^19.0.1',
            'react-dom': '^19.0.1',
            vite: '^8.3.0'
          },
          devDependencies: {
            '@types/node': '^22.14.0',
            '@types/react': '^19.3.0',
            '@types/react-dom': '^19.3.0',
            tailwindcss: '^4.3.3',
            typescript: '^7.0.2'
          }
        },
        null,
        2
      );

      const filesToPush: Record<string, string> = {
        '.npmrc': 'legacy-peer-deps=true\n',
        'package.json': cleanPackageJsonForVercel,
        'tsconfig.json': rawTsConfig,
        'vite.config.ts': rawViteConfig,
        'index.html': rawIndexHtml,
        'vercel.json': rawVercelJson,
        'firebase-applet-config.json': rawFirebaseConfig,
        'firestore.rules': rawFirestoreRules,
        'src/main.tsx': rawMainTsx,
        'src/index.css': rawIndexCss,
        'src/App.tsx': rawAppTsx,
        'src/lib/firebase.ts': rawFirebaseLib,
        'src/data/curriculum.ts': rawCurriculum,
        'src/data/episodeSeedsPart1.ts': rawSeeds1,
        'src/data/episodeSeedsPart2.ts': rawSeeds2,
        'src/data/realVideoCatalog.ts': rawRealCatalog,
        'src/components/BlockyCharacterSVG.tsx': rawBlockySvg,
        'src/components/RealVideoPlayer.tsx': rawRealPlayer,
        'src/components/EpisodeQuiz.tsx': rawEpisodeQuiz,
        'src/components/GrammarLabTab.tsx': rawGrammarLab,
        'src/components/WeeklyCalendarPlanner.tsx': rawWeeklyPlanner,
        'src/components/StackSetupHub.tsx': `import React from 'react';
export const triggerDirectZipDownload = async () => {};
export const StackSetupHub: React.FC<{ userEmail?: string | null; onGoogleSignIn: () => void }> = ({ userEmail }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-200">
    <h1 className="text-2xl font-bold text-slate-900">Cloud Sync & Deployment Ready</h1>
    <p className="text-sm text-slate-600 mt-2">{userEmail ? \`Connected as \${userEmail}\` : 'Sign in with Google to sync your progress.'}</p>
  </div>
);`
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      };

      const entries = Object.entries(filesToPush);
      let count = 0;

      for (const [filePath, content] of entries) {
        count++;
        setGhPushStatus({
          type: 'progress',
          message: `Uploading file ${count} of ${entries.length}: ${filePath}...`
        });

        // Check if file already exists to get its SHA
        const getRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
          { headers }
        );
        let existingSha: string | undefined;
        if (getRes.ok) {
          const existingData = await getRes.json();
          existingSha = existingData.sha;
        }

        // Encode UTF-8 string to base64
        const utf8Bytes = new TextEncoder().encode(content);
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
          binary += String.fromCharCode(utf8Bytes[i]);
        }
        const base64Content = btoa(binary);

        const putRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
          {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              message: `Update ${filePath} (100 verified videos + Vercel fix)`,
              content: base64Content,
              branch,
              ...(existingSha ? { sha: existingSha } : {})
            })
          }
        );

        if (!putRes.ok) {
          const errJson = await putRes.json().catch(() => ({}));
          throw new Error(
            errJson.message || `Failed to upload ${filePath} (HTTP ${putRes.status})`
          );
        }
      }

      setGhPushStatus({
        type: 'success',
        message: `✅ SUCCESS! All ${entries.length} files were pushed directly to https://github.com/${owner}/${repo}! Vercel will now automatically redeploy your updated site in ~45 seconds!`
      });
    } catch (err: any) {
      setGhPushStatus({
        type: 'error',
        message: `GitHub API Error: ${err?.message || 'Check your Token, Username, and Repo name.'}`
      });
    } finally {
      setIsPushingGh(false);
    }
  };

  const supabaseSqlSchema = `-- SUPABASE POSTGRESQL SCHEMA FOR 100 ENGLISH VIDEOS, 1000 QUESTIONS & 3-VIDEOS/WEEK CALENDAR
create table if not exists public.episodes (
  id integer primary key,
  title text not null,
  level text not null check (level in ('L3', 'L4')),
  duration_minutes integer not null check (duration_minutes between 15 and 20),
  youtube_url text not null,
  grammar_rule_1 text not null,
  grammar_rule_2 text not null,
  week_number integer not null,
  day_slot_index integer not null
);

create table if not exists public.user_progress (
  user_id uuid references auth.users(id) primary key,
  start_date date not null default current_date,
  study_days text not null default 'Mon-Wed-Fri',
  scores_map jsonb not null default '{}'::jsonb,
  custom_youtube_ids jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Users manage own English schedule & scores"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);`;

  const vercelJsonConfig = `{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBlock(key);
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  const handleDownloadFullProjectZip = async () => {
    setIsGeneratingZip(true);
    try {
      await triggerDirectZipDownload();
    } catch (err) {
      console.error('Error generating ZIP:', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const handleDownloadJsonDataset = () => {
    const dataStr = JSON.stringify(REAL_VIDEO_EPISODES, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'english-l3-l4-100-videos-1000-questions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* OPTION A: DIRECT 1-CLICK PUSH TO GITHUB VIA PERSONAL ACCESS TOKEN (NO ZIP, NO CLI) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-400 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-num text-emerald-400 font-bold">
              ★ FASTEST WAY: PUSH DIRECTLY TO YOUR GITHUB REPO WITH TOKEN (repo CHECKED)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">
              1-Click Push All Fixed Files to GitHub (Auto-Updates Vercel!)
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
              1. Click{' '}
              <a
                href="https://github.com/settings/tokens/new?scopes=repo&description=SuperBearEnglishVercel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 font-bold underline"
              >
                Create GitHub Token (Classic with "repo" checked) ↗
              </a>{' '}
              and click <strong>Generate token</strong> at the bottom.
              <br />
              2. Paste your Token, GitHub Username, and Repository Name below, then click{' '}
              <strong>Push All Fixed Code to GitHub Now</strong>!
            </p>
          </div>

          <button
            onClick={() => copyText('catalog_code', rawRealCatalog)}
            className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            {copiedBlock === 'catalog_code' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>
              {copiedBlock === 'catalog_code'
                ? '✓ Copied Fixed realVideoCatalog.ts!'
                : 'Copy Fixed realVideoCatalog.ts Code'}
            </span>
          </button>
        </div>

        <form
          onSubmit={handleDirectPushToGitHub}
          className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          <input
            type="password"
            value={ghToken}
            onChange={(e) => setGhToken(e.target.value)}
            placeholder="ghp_... (Your GitHub Token)"
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
          <input
            type="text"
            value={ghOwner}
            onChange={(e) => setGhOwner(e.target.value)}
            placeholder="GitHub Username (e.g. sonicommerce99)"
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
          <input
            type="text"
            value={ghRepo}
            onChange={(e) => setGhRepo(e.target.value)}
            placeholder="Repo Name (e.g. super-bear-english)"
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
          <input
            type="text"
            value={ghBranch}
            onChange={(e) => setGhBranch(e.target.value)}
            placeholder="Branch (main)"
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={isPushingGh}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
          >
            {isPushingGh ? 'Pushing to GitHub...' : '🚀 Push All Fixed Code to GitHub'}
          </button>
        </form>

        {ghPushStatus.type !== 'idle' && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-xs font-bold ${
              ghPushStatus.type === 'success'
                ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
                : ghPushStatus.type === 'error'
                ? 'bg-rose-950/90 border border-rose-500 text-rose-300'
                : 'bg-sky-950/90 border border-sky-500 text-sky-300'
            }`}
          >
            {ghPushStatus.message}
          </div>
        )}
      </div>

      {/* Main Big Download ZIP Banner (No Command Line Needed!) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono-num text-amber-400 font-bold">
            1-CLICK WEB DOWNLOAD · NO COMMAND LINE NEEDED
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">
            Download Full Project (.ZIP) for GitHub & Vercel
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Click the big yellow button on the right to download the complete source code (`super-bear-english-vercel-github.zip`) directly from your browser. Then unzip it and drag-and-drop the files into your GitHub repository!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadFullProjectZip}
            disabled={isGeneratingZip}
            className="px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold flex items-center gap-2.5 shadow-lg transition-colors cursor-pointer"
          >
            <FolderArchive className="w-5 h-5" />
            <span>
              {isGeneratingZip
                ? 'Creating .ZIP File...'
                : 'Download Complete Project (.ZIP)'}
            </span>
          </button>

          <button
            onClick={handleDownloadJsonDataset}
            className="px-4 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download 100 Videos (.JSON)</span>
          </button>
        </div>
      </div>

      {/* 3-Step Visual Web Guide (Mouse Only, Zero Command Line) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1: Unzip & Upload to GitHub Web */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
            <GitBranch className="w-5 h-5 text-amber-600" />
            <span>Step 1: Upload to GitHub.com (Web)</span>
          </div>
          <ol className="mt-3 space-y-2 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
            <li>
              Click <strong>“Download Complete Project (.ZIP)”</strong> above and extract (unzip) the folder on your computer.
            </li>
            <li>
              Go to <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-sky-700 font-bold underline">github.com/new</a>, type a repository name (e.g., <code>super-bear-english</code>), and click <strong>Create repository</strong>.
            </li>
            <li>
              Click the blue link <strong>“uploading an existing file”</strong> on the GitHub page.
            </li>
            <li>
              Drag & drop all extracted files (`package.json`, `index.html`, `vercel.json`, `src` folder) into the browser and click <strong>Commit changes</strong>!
            </li>
          </ol>
        </div>

        {/* Step 2: Import in Vercel Web */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                <Globe className="w-5 h-5 text-sky-600" />
                <span>Step 2: Deploy on Vercel.com (Web)</span>
              </div>
              <button
                onClick={() => copyText('vercel', vercelJsonConfig)}
                className="text-xs font-semibold text-sky-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBlock === 'vercel' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBlock === 'vercel' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <ol className="mt-3 space-y-2 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
              <li>
                Open <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-sky-700 font-bold underline">vercel.com/new</a> and sign in with your GitHub account.
              </li>
              <li>
                Find <code>super-bear-english</code> in your list and click <strong>Import</strong>.
              </li>
              <li>
                Click <strong>Deploy</strong>! Vercel automatically uses the included <code>vercel.json</code> file.
              </li>
            </ol>
            <pre className="mt-3 p-3 rounded-xl bg-slate-950 text-sky-300 font-mono-num text-[11px] overflow-x-auto">
              {vercelJsonConfig}
            </pre>
          </div>
        </div>

        {/* Step 3: Supabase SQL */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                <Database className="w-5 h-5 text-emerald-600" />
                <span>Step 3: Supabase SQL & Cloud Auth</span>
              </div>
              <button
                onClick={() => copyText('supabase', supabaseSqlSchema)}
                className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBlock === 'supabase' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBlock === 'supabase' ? 'Copied SQL' : 'Copy SQL'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Cloud Firestore is already active right now! If you also want tables in Supabase, copy this SQL into the Supabase SQL Editor:
            </p>
            <pre className="mt-3 p-3 rounded-xl bg-slate-950 text-emerald-300 font-mono-num text-[11px] max-h-40 overflow-y-auto">
              {supabaseSqlSchema}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            {userEmail ? (
              <div className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CloudCheck className="w-4 h-4 text-emerald-600" />
                <span>Synced as {userEmail}</span>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Google to Sync</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
