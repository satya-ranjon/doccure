const DashboardContainer = ({ label, children }) => {
  return (
    <div className="w-full  break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 p-8">
      <h1 className="  uppercase text-2xl font-bold mb-5">{label}</h1>
      {children}
    </div>
  );
};

export default DashboardContainer;
