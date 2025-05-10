
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const EmptyState = ({ icon: Icon, title, description }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div 
      variants={cardVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      className="col-span-full w-full"
    >
      <Card className="bg-card shadow-lg text-center dark:border-slate-700">
        <CardContent className="p-10">
          {Icon && <Icon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />}
          <p className="text-foreground/80 text-lg font-semibold">{title}</p>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyState;
  