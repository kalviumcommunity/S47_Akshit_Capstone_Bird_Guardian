import React from 'react';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-neutral-800 rounded-md ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden h-[420px] flex flex-col">
    <Skeleton className="h-56 w-full rounded-none" />
    <div className="p-5 flex-1 flex flex-col gap-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="mt-auto space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
      </div>
    </div>
  </div>
);

export default Skeleton;
