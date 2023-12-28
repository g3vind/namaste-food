const Shimmer = () => {
  return (
    <div className="flex flex-wrap">
      {Array(10)
        .fill("")
        .map((e,i) => (
          <div key={i} className="w-52 h-72 m-5 bg-gray-200"></div>
        ))}
    </div>
  );
};

export default Shimmer;
