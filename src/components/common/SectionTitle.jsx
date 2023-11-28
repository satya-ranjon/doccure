export default function SectionTitle({ name }) {
  return (
    <div className="flex justify-center items-center">
      <h1 className=" text-center font-bold text-4xl border-b-2 pb-2 border-zinc-600 px-5">
        {name}
      </h1>
    </div>
  );
}
