import { Skeleton } from "@/components/ui";

const ProductSkeleton = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>

      <Skeleton className='w-2/3 h-4 rounded-lg mt-4' />
      <Skeleton className='w-16 h-4 rounded-lg mt-2' />
      <Skeleton className='w-12 h-4 rounded-lg mt-2' />
    </div>
  );
};

export default ProductSkeleton;
