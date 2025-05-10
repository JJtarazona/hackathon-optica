
import React from 'react';
import { motion } from 'framer-motion';

const TableLayout = ({ headers, children }) => {
  return (
    <motion.div
      className="overflow-x-auto bg-card shadow-md rounded-lg dark:border-slate-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <table className="w-full min-w-full">
        <thead>
          <tr className="bg-accent/80 dark:bg-slate-800/80">
            {headers.map((header, index) => (
              <th 
                key={index} 
                className={`p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${header === "Acciones" ? "text-right" : ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border dark:divide-slate-700">
          {children}
        </tbody>
      </table>
    </motion.div>
  );
};

export default TableLayout;
  