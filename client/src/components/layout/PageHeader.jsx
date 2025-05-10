
import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, actions }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      {actions && (
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {actions}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;
  