import { SkeletonCard } from "@/components/custom/SkeletonCard";

export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 max-md:grid-cols-2 max-sm:grid-cols-1">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
