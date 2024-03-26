const StudentCard = (prop: studentProp) => {
  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-lg w-28rem">
        <div className=" h-30rem w-26rem bg-gray-400 rounded-lg">
          <img
            src={prop.img}
            alt="img"
            className=" object-cover h-full w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="font-bold text-lg">{prop.name}</h1>
          <h2>Age: {prop.age}</h2>
          <h2>GPA: {prop.gpa}</h2>
        </div>
      </div>
    </>
  );
};

export default StudentCard;
