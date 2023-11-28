const PageHeader = ({ children }) => {
  return (
    <div className=" w-full uppercase bg-[#f8fafc] py-16 flex justify-center items-center">
      <span className=" text-2xl font-bold text-zinc-600">{children}</span>
    </div>
  );
};

export default PageHeader;
