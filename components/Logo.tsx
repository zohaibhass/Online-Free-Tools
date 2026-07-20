import * as React from 'react'

interface LogoProps {
    className?: string
    size?: number
    hideText?: boolean
}

export function Logo({ className, size = 40, hideText = false }: LogoProps) {
    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <rect width="64" height="64" rx="18" fill="url(#logo-gradient)" />
                <path d="M22 20H42" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 30H36" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 40H30" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M18 18L24 10" stroke="rgba(255,255,255,0.65)" strokeWidth="3" strokeLinecap="round" />
                <path d="M46 18L40 10" stroke="rgba(255,255,255,0.65)" strokeWidth="3" strokeLinecap="round" />
                <path d="M20 50H44" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2563EB" />
                        <stop offset="1" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>
            </svg>

            {!hideText && (
                <div className="hidden md:flex flex-col leading-tight">
                    <span className="text-base font-semibold tracking-tight text-foreground">Free Tools</span>
                    <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Online Toolkit</span>
                </div>
            )}
        </div>
    )
}
