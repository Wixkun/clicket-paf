import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
}

function Skeleton({ className, height, width, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-2xl bg-black/20 backdrop-blur-sm', className)}
      style={{
        height: height,
        width: width,
      }}
      {...props}
    />
  );
}

export { Skeleton };
