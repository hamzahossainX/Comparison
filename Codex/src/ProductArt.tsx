import { useId } from 'react'
import type { ProductKind } from './data'

export default function ProductArt({ kind = 'headphones', color = '#a9bba2', className = '' }: { kind?: ProductKind; color?: string; className?: string }) {
  const id = useId().replace(/:/g, '')
  return <svg className={className} viewBox="0 0 480 400" role="img" aria-label={`${kind} product illustration`}>
    <defs>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0.8"><stop stopColor="#f3f5ed"/><stop offset="0.35" stopColor={color}/><stop offset="1" stopColor={color} stopOpacity="0.7"/></linearGradient>
      <linearGradient id={`${id}-dark`}><stop stopColor="#293d32"/><stop offset="0.45" stopColor="#627060"/><stop offset="1" stopColor="#293b30"/></linearGradient>
      <linearGradient id={`${id}-metal`}><stop stopColor="#a5aaa1"/><stop offset="0.45" stopColor="#f0f2e7"/><stop offset="1" stopColor="#8c978a"/></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#23352b" stopOpacity="0.2"/><stop offset="1" stopColor="#23352b" stopOpacity="0"/></radialGradient>
      <pattern id={`${id}-weave`} width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.8" fill="#34483c" opacity="0.35"/></pattern>
    </defs>
    <ellipse cx="240" cy="352" rx="143" ry="24" fill={`url(#${id}-shadow)`}/>
    {kind === 'headphones' && <g transform="rotate(-18 240 200)">
      <path d="M125 235V158C125 18 355 18 355 158V235" fill="none" stroke={`url(#${id}-dark)`} strokeWidth="24"/>
      <path d="M119 223V155C119 12 361 12 361 155V223" fill="none" stroke={`url(#${id}-body)`} strokeWidth="22"/>
      <path d="M120 189v57m240-57v57" stroke={`url(#${id}-metal)`} strokeWidth="12" strokeLinecap="round"/>
      <rect x="125" y="208" width="59" height="118" rx="28" fill={`url(#${id}-dark)`}/>
      <rect x="98" y="202" width="60" height="126" rx="29" fill={`url(#${id}-body)`}/>
      <rect x="300" y="208" width="59" height="118" rx="28" fill={`url(#${id}-dark)`}/>
      <rect x="325" y="200" width="67" height="129" rx="31" fill={`url(#${id}-body)`}/>
      <rect x="333" y="209" width="49" height="111" rx="25" fill="none" stroke="white" strokeOpacity="0.3"/>
      <text x="357" y="268" textAnchor="middle" fill="#4a5c49" opacity="0.65" fontSize="10" letterSpacing="2" transform="rotate(90 357 268)">AURE</text>
      <rect x="360" y="307" width="12" height="4" rx="2" fill="#50634e"/>
    </g>}
    {kind === 'earbuds' && <g>
      <rect x="136" y="203" width="211" height="124" rx="53" fill={`url(#${id}-body)`}/>
      <path d="M140 249c50 13 153 13 204 0" fill="none" stroke="#aea99d" strokeWidth="2"/>
      <ellipse cx="242" cy="206" rx="103" ry="27" fill="#d6d3c9"/>
      <ellipse cx="242" cy="204" rx="95" ry="20" fill="#b6b7ad"/>
      <g transform="translate(162 74) rotate(-14)"><rect x="9" y="25" width="25" height="109" rx="12" fill={`url(#${id}-body)`}/><ellipse cx="22" cy="27" rx="32" ry="29" fill={`url(#${id}-body)`}/><ellipse cx="0" cy="26" rx="9" ry="15" fill="#48534a"/><path d="M14 118h14" stroke="#93988e" strokeWidth="3"/></g>
      <g transform="translate(289 73) rotate(18)"><rect x="0" y="25" width="25" height="109" rx="12" fill={`url(#${id}-body)`}/><ellipse cx="12" cy="27" rx="32" ry="29" fill={`url(#${id}-body)`}/><ellipse cx="35" cy="26" rx="9" ry="15" fill="#48534a"/><path d="M6 118h13" stroke="#93988e" strokeWidth="3"/></g>
      <text x="240" y="291" textAnchor="middle" fontSize="13" letterSpacing="4" fill="#747a6d">AURE</text><circle cx="240" cy="308" r="2" fill="#617859"/>
    </g>}
    {kind === 'speaker' && <g>
      <rect x="151" y="76" width="179" height="253" rx="67" fill={`url(#${id}-body)`}/>
      <rect x="151" y="96" width="179" height="230" rx="61" fill={`url(#${id}-weave)`}/>
      <ellipse cx="240" cy="91" rx="77" ry="21" fill={color}/>
      <ellipse cx="240" cy="88" rx="62" ry="13" fill="#879a88"/>
      <path d="M214 88h8m34-4v8m-4-4h8" stroke="#e2e8dc" strokeWidth="2"/>
      <circle cx="240" cy="87" r="3" fill="#e2e8dc"/><rect x="221" y="275" width="38" height="17" rx="3" fill="#b6c3b1"/>
      <text x="241" y="287" textAnchor="middle" fontSize="8" letterSpacing="1" fill="#435d46">AURE</text>
    </g>}
  </svg>
}
