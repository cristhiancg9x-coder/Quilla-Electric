'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// Animation Variants
export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const staggerContainer: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const heroText: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.2,
    },
  },
};

export const navItem: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Glass Card Component
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  whileHover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  delay = 0,
  whileHover = true,
  onClick,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={whileHover ? "hover" : undefined}
      transition={{ delay }}
      className={`glass-card ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// Animated Container Component
interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: keyof JSX.IntrinsicElements;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = '',
  variants = fadeInUp,
  as: Component = 'div',
}) => {
  return (
    <Component
      variants={variants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </Component>
  );
};

// Stagger Grid Component
interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  cols?: number;
}

export const StaggerGrid: React.FC<StaggerGridProps> = ({
  children,
  className = '',
  cols = 1,
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={`grid grid-cols-1 md:grid-cols-${cols} gap-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Page Transition Component
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Modal Animation Component
interface ModalAnimationProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAnimation: React.FC<ModalAnimationProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Floating Animation Component
interface FloatingAnimationProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  children,
  className = '',
  duration = 6,
  delay = 0,
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Pulse Glow Animation Component
interface PulseGlowProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export const PulseGlow: React.FC<PulseGlowProps> = ({
  children,
  className = '',
  color = 'rgba(245, 158, 11, 0.3)',
}) => {
  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px ${color}`,
          `0 0 40px ${color}`,
          `0 0 20px ${color}`,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Shimmer Loading Component
interface ShimmerLoadingProps {
  className?: string;
  height?: string;
  width?: string;
}

export const ShimmerLoading: React.FC<ShimmerLoadingProps> = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
}) => {
  return (
    <motion.div
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={`glass-skeleton ${height} ${width} ${className}`}
    />
  );
};