import React from 'react';
import { CharacterId } from '../data/curriculum';

interface BlockyCharacterSVGProps {
  character: CharacterId;
  isSpeaking?: boolean;
  actionType?: 'walk' | 'jump' | 'celebrate' | 'alert' | 'think';
  size?: 'sm' | 'md' | 'lg';
}

export const BlockyCharacterSVG: React.FC<BlockyCharacterSVGProps> = ({
  character,
  isSpeaking = false,
  actionType = 'walk',
  size = 'md'
}) => {
  const dimensions =
    size === 'sm' ? 'w-12 h-12' : size === 'lg' ? 'w-32 h-36' : 'w-24 h-28';

  const bounceClass = isSpeaking
    ? ' -translate-y-2 scale-105'
    : actionType === 'celebrate'
    ? ' -translate-y-1'
    : '';

  if (character === 'baaren') {
    // Brown Blocky Bear (Super Bear Adventure style)
    return (
      <div className={`relative transition-transform duration-200 ${dimensions}${bounceClass}`}>
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
          {/* Ears */}
          <rect x="20" y="10" width="22" height="22" rx="5" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <rect x="25" y="15" width="12" height="12" rx="3" fill="#D97706" />
          <rect x="78" y="10" width="22" height="22" rx="5" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <rect x="83" y="15" width="12" height="12" rx="3" fill="#D97706" />
          {/* Blocky Head */}
          <rect x="24" y="22" width="72" height="58" rx="10" fill="#B45309" stroke="#451A03" strokeWidth="3.5" />
          {/* Snout */}
          <rect x="40" y="48" width="40" height="26" rx="6" fill="#FDE68A" stroke="#451A03" strokeWidth="2.5" />
          {/* Nose & Smile */}
          <rect x="53" y="52" width="14" height="8" rx="3" fill="#1E293B" />
          {isSpeaking ? (
            <rect x="52" y="63" width="16" height="7" rx="3" fill="#7F1D1D" />
          ) : (
            <path d="M 50 64 Q 60 71 70 64" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {/* Eyes */}
          <rect x="38" y="34" width="8" height="12" rx="2" fill="#0F172A" />
          <rect x="40" y="35" width="3" height="4" fill="#FFFFFF" />
          <rect x="74" y="34" width="8" height="12" rx="2" fill="#0F172A" />
          <rect x="76" y="35" width="3" height="4" fill="#FFFFFF" />
          {/* Blocky Torso */}
          <rect x="32" y="80" width="56" height="40" rx="8" fill="#B45309" stroke="#451A03" strokeWidth="3.5" />
          <rect x="42" y="86" width="36" height="28" rx="6" fill="#FCD34D" />
          {/* Arms */}
          <rect x="14" y="82" width="18" height="32" rx="6" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <rect x="88" y="82" width="18" height="32" rx="6" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          {/* Legs */}
          <rect x="35" y="118" width="22" height="18" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          <rect x="63" y="118" width="22" height="18" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  if (character === 'tito') {
    // Friendly Green Blocky Turtle
    return (
      <div className={`relative transition-transform duration-200 ${dimensions}${bounceClass}`}>
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
          {/* Shell behind */}
          <rect x="22" y="68" width="76" height="50" rx="16" fill="#78350F" stroke="#14532D" strokeWidth="3" />
          {/* Blocky Green Head */}
          <rect x="28" y="24" width="64" height="52" rx="12" fill="#22C55E" stroke="#14532D" strokeWidth="3.5" />
          {/* Big Friendly Eyes */}
          <rect x="36" y="35" width="14" height="16" rx="4" fill="#FFFFFF" stroke="#14532D" strokeWidth="2" />
          <rect x="41" y="39" width="7" height="9" rx="2" fill="#0F172A" />
          <rect x="70" y="35" width="14" height="16" rx="4" fill="#FFFFFF" stroke="#14532D" strokeWidth="2" />
          <rect x="73" y="39" width="7" height="9" rx="2" fill="#0F172A" />
          {/* Smile */}
          {isSpeaking ? (
            <rect x="50" y="58" width="20" height="8" rx="4" fill="#14532D" />
          ) : (
            <path d="M 46 60 Q 60 68 74 60" stroke="#14532D" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          )}
          {/* Torso & Plastron (Belly plate) */}
          <rect x="34" y="76" width="52" height="42" rx="8" fill="#16A34A" stroke="#14532D" strokeWidth="3.5" />
          <rect x="40" y="80" width="40" height="34" rx="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
          <line x1="60" y1="80" x2="60" y2="114" stroke="#CA8A04" strokeWidth="2" />
          <line x1="40" y1="97" x2="80" y2="97" stroke="#CA8A04" strokeWidth="2" />
          {/* Arms & Legs */}
          <rect x="18" y="80" width="16" height="28" rx="6" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
          <rect x="86" y="80" width="16" height="28" rx="6" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
          <rect x="36" y="116" width="20" height="18" rx="4" fill="#15803D" stroke="#14532D" strokeWidth="3" />
          <rect x="64" y="116" width="20" height="18" rx="4" fill="#15803D" stroke="#14532D" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  if (character === 'spike') {
    // Blue Spiky Shell Guardian Turtle
    return (
      <div className={`relative transition-transform duration-200 ${dimensions}${bounceClass}`}>
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
          {/* Spikes on Shell */}
          <polygon points="35,45 45,25 55,45" fill="#E2E8F0" stroke="#1E3A8A" strokeWidth="3" />
          <polygon points="65,45 75,25 85,45" fill="#E2E8F0" stroke="#1E3A8A" strokeWidth="3" />
          <polygon points="50,40 60,16 70,40" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="3" />
          {/* Giant Blue Shell */}
          <rect x="16" y="40" width="88" height="62" rx="22" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="4" />
          <rect x="24" y="84" width="72" height="14" rx="6" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="2.5" />
          {/* Strong Green Head */}
          <rect x="32" y="54" width="56" height="40" rx="8" fill="#16A34A" stroke="#14532D" strokeWidth="3.5" />
          {/* Determined Eyebrows & Eyes */}
          <rect x="40" y="64" width="12" height="10" rx="2" fill="#FEF08A" stroke="#14532D" strokeWidth="2" />
          <rect x="44" y="66" width="5" height="6" fill="#0F172A" />
          <rect x="68" y="64" width="12" height="10" rx="2" fill="#FEF08A" stroke="#14532D" strokeWidth="2" />
          <rect x="71" y="66" width="5" height="6" fill="#0F172A" />
          {/* Mouth */}
          {isSpeaking ? (
            <rect x="48" y="80" width="24" height="7" rx="3" fill="#7F1D1D" />
          ) : (
            <line x1="48" y1="83" x2="72" y2="83" stroke="#14532D" strokeWidth="3.5" strokeLinecap="round" />
          )}
          {/* Heavy Legs */}
          <rect x="26" y="98" width="26" height="32" rx="6" fill="#15803D" stroke="#14532D" strokeWidth="3.5" />
          <rect x="68" y="98" width="26" height="32" rx="6" fill="#15803D" stroke="#14532D" strokeWidth="3.5" />
        </svg>
      </div>
    );
  }

  if (character === 'buzz') {
    // Queen Buzz & Royal Blocky Bee
    return (
      <div className={`relative transition-transform duration-200 ${dimensions}${bounceClass}`}>
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
          {/* Translucent Wings */}
          <ellipse cx="32" cy="48" rx="20" ry="12" transform="rotate(-25 32 48)" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <ellipse cx="88" cy="48" rx="20" ry="12" transform="rotate(25 88 48)" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          {/* Royal Golden Crown */}
          <polygon points="44,28 48,12 60,22 72,12 76,28" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
          <circle cx="60" cy="19" r="3" fill="#EC4899" />
          {/* Antennae */}
          <line x1="48" y1="30" x2="40" y2="16" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="15" r="4" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <line x1="72" y1="30" x2="80" y2="16" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="15" r="4" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          {/* Blocky Bee Body */}
          <rect x="28" y="28" width="64" height="72" rx="14" fill="#FACC15" stroke="#713F12" strokeWidth="3.5" />
          {/* Honey Stripes */}
          <rect x="29" y="66" width="62" height="12" fill="#451A03" />
          <rect x="29" y="84" width="62" height="10" fill="#451A03" />
          {/* Eyes & Smile */}
          <rect x="40" y="40" width="10" height="14" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <rect x="43" y="43" width="5" height="8" rx="1" fill="#0F172A" />
          <rect x="70" y="40" width="10" height="14" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <rect x="72" y="43" width="5" height="8" rx="1" fill="#0F172A" />
          {isSpeaking ? (
            <circle cx="60" cy="57" r="5" fill="#7F1D1D" />
          ) : (
            <path d="M 52 56 Q 60 62 68 56" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {/* Little Bee Feet */}
          <rect x="42" y="100" width="10" height="14" rx="4" fill="#1E293B" />
          <rect x="68" y="100" width="10" height="14" rx="4" fill="#1E293B" />
        </svg>
      </div>
    );
  }

  // Default: 'gloom' — Purple Blocky Trickster Bear
  return (
    <div className={`relative transition-transform duration-200 ${dimensions}${bounceClass}`}>
      <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
        {/* Purple Ears */}
        <rect x="20" y="12" width="22" height="22" rx="5" fill="#6B21A8" stroke="#3B0764" strokeWidth="3" />
        <rect x="25" y="17" width="12" height="12" rx="3" fill="#C084FC" />
        <rect x="78" y="12" width="22" height="22" rx="5" fill="#6B21A8" stroke="#3B0764" strokeWidth="3" />
        <rect x="83" y="17" width="12" height="12" rx="3" fill="#C084FC" />
        {/* Purple Blocky Head */}
        <rect x="24" y="24" width="72" height="56" rx="10" fill="#9333EA" stroke="#3B0764" strokeWidth="3.5" />
        {/* Light Purple Snout */}
        <rect x="40" y="50" width="40" height="24" rx="6" fill="#E9D5FF" stroke="#3B0764" strokeWidth="2.5" />
        <rect x="53" y="54" width="14" height="7" rx="3" fill="#3B0764" />
        {/* Mischievous Eyebrows */}
        <line x1="34" y1="32" x2="48" y2="37" stroke="#3B0764" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="86" y1="32" x2="72" y2="37" stroke="#3B0764" strokeWidth="3.5" strokeLinecap="round" />
        {/* Eyes */}
        <rect x="38" y="38" width="8" height="10" rx="2" fill="#0F172A" />
        <rect x="74" y="38" width="8" height="10" rx="2" fill="#0F172A" />
        {/* Mouth */}
        {isSpeaking ? (
          <rect x="52" y="64" width="16" height="6" rx="3" fill="#581C87" />
        ) : (
          <path d="M 50 67 Q 60 63 70 67" stroke="#3B0764" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {/* Torso */}
        <rect x="32" y="80" width="56" height="38" rx="8" fill="#9333EA" stroke="#3B0764" strokeWidth="3.5" />
        <rect x="42" y="86" width="36" height="26" rx="6" fill="#D8B4FE" />
        {/* Arms & Legs */}
        <rect x="14" y="82" width="18" height="30" rx="6" fill="#7E22CE" stroke="#3B0764" strokeWidth="3" />
        <rect x="88" y="82" width="18" height="30" rx="6" fill="#7E22CE" stroke="#3B0764" strokeWidth="3" />
        <rect x="35" y="118" width="22" height="18" rx="4" fill="#581C87" stroke="#3B0764" strokeWidth="3" />
        <rect x="63" y="118" width="22" height="18" rx="4" fill="#581C87" stroke="#3B0764" strokeWidth="3" />
      </svg>
    </div>
  );
};
