
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Mic, Building, Upload } from 'lucide-react';

const menuItems = [
  { 
    title: 'Home', 
    icon: <Home />, 
    path: '/',
    gradientFrom: '#1e40af', 
    gradientTo: '#2563eb' 
  },
  { 
    title: 'Jobs', 
    icon: <Briefcase />, 
    path: '/jobs',
    gradientFrom: '#1d4ed8', 
    gradientTo: '#3b82f6' 
  },
  { 
    title: 'Voice', 
    icon: <Mic />, 
    path: '/voice-bot',
    gradientFrom: '#1e3a8a', 
    gradientTo: '#1d4ed8' 
  },
  { 
    title: 'Hire', 
    icon: <Building />, 
    path: '/hire',
    gradientFrom: '#0ea5e9', 
    gradientTo: '#06b6d4' 
  },
  { 
    title: 'Resume', 
    icon: <Upload />, 
    path: '/upload-resume',
    gradientFrom: '#0284c7', 
    gradientTo: '#0ea5e9' 
  }
];

export default function GradientMenu() {
  const location = useLocation();

  return (
    <div className="flex justify-center items-center py-1">
      <ul className="flex gap-2 lg:gap-3">
        {menuItems.map(({ title, icon, path, gradientFrom, gradientTo }, idx) => {
          const isActive = location.pathname === path;
          
          return (
            <li
              key={idx}
              style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
              className={`relative w-10 h-10 lg:w-12 lg:h-12 shadow-blue-soft rounded-full flex items-center justify-center transition-all duration-500 hover:w-28 lg:hover:w-32 hover:shadow-blue-glow group cursor-pointer ${
                isActive 
                  ? 'bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] w-28 lg:w-32 shadow-blue-glow' 
                  : 'bg-white hover:bg-white border border-slate-200/60'
              }`}
            >
              {/* Gradient background on hover/active */}
              <span className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500 ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
              
              {/* Subtle glow */}
              <span className={`absolute top-1 inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[8px] lg:blur-[12px] -z-10 transition-all duration-500 ${
                isActive ? 'opacity-30' : 'opacity-0 group-hover:opacity-30'
              }`}></span>

              <Link to={path} className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Icon */}
                <span className={`transition-all duration-500 ${
                  isActive ? 'scale-0' : 'group-hover:scale-0'
                } delay-0`}>
                  <span className={`text-base lg:text-lg ${isActive ? 'text-white' : 'text-slate-600'}`}>
                    {icon}
                  </span>
                </span>

                {/* Title */}
                <span className={`absolute text-white uppercase tracking-wider text-xs lg:text-sm font-semibold transition-all duration-500 ${
                  isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                } delay-150`}>
                  {title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
