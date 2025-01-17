
export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full p-5  md:p-12 items-center justify-center rounded-md shadow-md border border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-black  ">
      {children}
    </div>
  );
};
