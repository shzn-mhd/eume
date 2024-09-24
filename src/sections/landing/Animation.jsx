import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// third party
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

// =============================|| LANDING - FADE IN ANIMATION ||============================= //

function Animation({ children, variants }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{
        x: {
          type: 'spring',
          stiffness: 150,
          damping: 30,
          duration: 0.5
        },
        opacity: { duration: 1 }
      }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

Animation.propTypes = {
  children: PropTypes.node,
  variants: PropTypes.object
};

export default Animation;
