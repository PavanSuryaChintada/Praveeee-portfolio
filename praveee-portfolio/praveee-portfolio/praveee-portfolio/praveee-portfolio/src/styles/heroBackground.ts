import { keyframes } from '@emotion/react';
import { css } from '@emotion/react';

const noiseAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 200% 200%; }
`;

export const heroBackground = css`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #0a0f0a;
  background-image: 
    /* Base dark color */
    linear-gradient(to bottom, #0a0f0a 0%, #0a0f0a 100%),
    /* Grid lines - 40px squares */
    linear-gradient(rgba(163, 230, 53, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(163, 230, 53, 0.15) 1px, transparent 1px),
    /* Color pinch effect */
    radial-gradient(
      circle at 70% 50%,
      rgba(163, 230, 53, 0.2) 0%,
      rgba(0, 0, 0, 0) 70%
    ),
    /* Subtle noise texture */
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05' /%3E%3C/svg%3E");
  
  background-size: 
    /* Base color */
    100% 100%,
    /* Grid size - 40px */
    40px 40px,
    40px 40px,
    /* Color pinch size */
    100% 100%,
    /* Noise size */
    200px 200px;
  
  /* Position the grid lines to align properly */
  background-position: 
    /* Base color */
    0 0,
    /* Grid offset */
    -1px -1px,
    -1px -1px,
    /* Color pinch position */
    0 0,
    /* Noise position */
    0 0;
  
  /* Animation for the noise texture */
  animation: ${noiseAnimation} 20s linear infinite;
  
  /* Ensure content is above the background */
  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const contentWrapper = css`
  position: relative;
  z-index: 1;
  height: 100%;
`;
