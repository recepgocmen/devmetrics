export function getAnimationStyle(disableAnimations: boolean = false): string {
  if (disableAnimations) return "";

  return `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes rankCircleAnim {
      from {
        stroke-dashoffset: var(--dm-rank-offset-start, 251.2);
      }
      to {
        stroke-dashoffset: var(--dm-rank-offset-end, 0);
      }
    }

    .dm-stagger {
      opacity: 0;
      animation: fadeInUp 0.3s ease-in-out forwards;
    }

    .dm-rank-circle {
      animation: rankCircleAnim 1s ease-in-out forwards;
    }

    .dm-rank-text {
      animation: scaleIn 0.5s ease-in-out forwards;
      animation-delay: 0.6s;
      opacity: 0;
    }
  `;
}

export function getStaggerDelay(index: number): string {
  return `animation-delay: ${150 + index * 150}ms;`;
}
