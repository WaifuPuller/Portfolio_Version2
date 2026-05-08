import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FadeSection = ({ children, className = '', id, offset = ['start end', 'end start'] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ opacity, y }}
      className={`relative flex min-h-screen w-full flex-col items-center justify-center px-5 py-20 md:px-10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FadeSection;
