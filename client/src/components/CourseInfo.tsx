import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Grade {
    student: string;
    grade: any;
}

const CourseInfo = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [grades, setGrades] = useState<Grade[]>([]);

    const nav = useNavigate();
    const props = useLocation();
    const user = props.state.user;
    const course = props.state.course;

    const goBack = () => {
        nav("/professor", { state: { user } });
    };

    const assignGrade = (index: number) => {
        if (grades[index].grade !== "No grade yet") {
            const studentId = course.students[index]; 
            console.log(studentId);
            
            
            nav("/assign_grade", { state: { course, studentId, user } });
        } else {
            console.log("Grade already exists");
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title || !description) {
            console.log("All fields are required");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/courses/${course._id}`, { title, description });
            console.log(response);
            goBack();
        } catch (error) {
            console.log("Error occurred while submitting the form:", error);
        }
    };

    useEffect(() => {
        const fetchGrades = async (student: string) => {
            try {
                const courseId = course._id;
                const response = await axios.get(`http://localhost:3001/grades/${student}/${courseId}`);
                const grade = response.data || "No grade yet";
                console.log(grade);

                return { student, grade }  as Grade;
            } catch (error) {
                console.error('Error fetching grades:', error);
                return { student, grade: "Error fetching grades" }  as Grade;
            }
        };

        const updateGrades = async () => {
            const updatedGrades = await Promise.all(course.students.map(async (studentId: string) => {
                const studentGrade = await fetchGrades(studentId);
                console.log(typeof studentGrade.grade);
                
                return studentGrade;
            }));
            setGrades(updatedGrades);
        };

        updateGrades();
    }, [course, user._id]);

    return (
        <div>
            <button className="btn btn-primary" onClick={goBack}>&lt;</button>
            <h1>Course Info</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Course Title</label>
                    <input type="text" className="form-control" id="title" value={course.title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Course description</label>
                    <input type="text" className="form-control" id="description" value={course.description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className='btn btn-primary'>Edit</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Student ID</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Assign Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((item, index) => (
                        <tr key={index}>
                            <td>{item.student}</td>
                            <td>{item.grade.grade}</td>
                            <td><button className='btn btn-primary' onClick={() => assignGrade(index)}>Assign grade</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseInfo;
