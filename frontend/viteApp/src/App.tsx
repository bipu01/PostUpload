import axios from "axios";

import { useEffect, useState } from "react";
import StudentCard from "./UserCard";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const baseUrl = `http://localhost:3000/`;
  const [studentName, setStudentName] = useState(String);
  const [studentAge, setStudentAge] = useState(Number);
  const [studentGPA, setStudentGPA] = useState(Number);
  const [imgURL, setImgURL] = useState(String);
  const [image, setImage] = useState<File>();

  const [loadedStudents, setLoadedStudents] = useState<Array<studentProp>>([]);

  const fetchStudentsAll = async () => {
    const fetchStudents = await axios.get(baseUrl + "studentsFromDb/");
    // console.log((fetchStudents).data)

    setLoadedStudents(fetchStudents.data.list.reverse());
    // console.log(fetchStudents);
  };

  useEffect(() => {
    fetchStudentsAll();
  }, [baseUrl]);

  const firebaseImgListRef = ref(storage, "studentImages/");
  useEffect(() => {
    listAll(firebaseImgListRef).then((res) => {
      console.log(res.items[0].name);
    });
  }, []);

  const uploadStudent = async () => {
    const pathref = ref(storage, `studentImages/${image?.name + v4()}`);
    if (image) {
      await uploadBytes(pathref, image).then((res) => {
        console.log(res);
      });
      const imageUrl = await getDownloadURL(pathref);
      console.log(imageUrl);
      setImgURL(imageUrl);
    }
  };

  useEffect(() => {
    if (imgURL) {
      addStudent();
    }
  }, [imgURL]);

  const addStudent = async () => {
    await axios.post(baseUrl + "saveStudent/", {
      name: studentName,
      age: studentAge,
      gpa: studentGPA,
      img: imgURL,
    });
    fetchStudentsAll();
  };

  return (
    <div
      id="grandParent"
      className=" flex justify-center items-center flex-col gap-12 bg-gray-200"
    >
      <label htmlFor="inputField" className="flex flex-row gap-4 mt-8">
        <div className="flex gap-4 flex-wrap p-4 mt-8">
          <div className=" space-x-4 space-y-4">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudentName(e.currentTarget.value)
              }
              type="text"
              placeholder="Name:"
              className="p-2 rounded-lg border-2 border-black"
            />

            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudentAge(Number(e.currentTarget.value))
              }
              type="number"
              placeholder="Age:"
              className="p-2 rounded-lg border-2  border-black"
            />

            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudentGPA(Number(e.currentTarget.value))
              }
              type="number"
              placeholder="GPA:"
              className="p-2 rounded-lg border-2  border-black"
            />

            <button
              onClick={uploadStudent}
              type="submit"
              className=" bg-orange-800 text-white p-2 px-4 rounded-lg"
            >
              Add student
            </button>
          </div>

          <label htmlFor="inpFile" className="w-48">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.currentTarget.files?.[0]) {
                  setImage(e.currentTarget.files?.[0]);
                  const imgPreview = document.getElementById("img-preview");
                  const url = URL.createObjectURL(e.currentTarget.files?.[0]);
                  if (imgPreview) {
                    imgPreview.style.backgroundImage = `url(${url})`;
                  }

                  console.log(e.currentTarget.files?.[0].name);
                }
              }}
              id="inpFile"
              type="file"
              accept="image"
              className="hidden"
            />
            <div
              id="img-preview"
              className={`border-dashed border-2 border-black hover:cursor-pointer w-48 h-32 p-4 bg-cover`}
            >
              <h1 className=" font-bold opacity-50">Upload image here</h1>
            </div>
          </label>
        </div>
      </label>

      <div
        id="parent"
        className="flex flex-wrap items-center bg-slate-400 gap-4 w-full p-8"
      >
        {loadedStudents.map((student: studentProp) => {
          return (
            <StudentCard
              key={student._id}
              name={student.name}
              age={student.age}
              gpa={student.gpa}
              img={student.img}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
