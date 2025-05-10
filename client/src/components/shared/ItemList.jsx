
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ItemList = ({ items, renderItem, emptyState, isLoading, loadingState }) => {
  if (isLoading && loadingState) {
    return <>{loadingState}</>;
  }

  if (!isLoading && items.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence>
        {items.map(item => renderItem(item))}
      </AnimatePresence>
    </div>
  );
};

export default ItemList;
  