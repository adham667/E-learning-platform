import { useState, useEffect } from 'react';
import UserType from'../../../src/types/user'
import axios from 'axios';
import "../Style.css"

import { useLocation } from 'react-router-dom';
import LogutButton from './LogutButton';



const StudentPage = () => {
    const props = useLocation();
    const [allCourses, setallcourses] = useState<any[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    const [professorNames, setProfessorNames] = useState<{ [key: string]: string }>({});
    const [grades, setgrades] = useState<string[]>([])
    const user = props.state.user;

    const handleEnroll = (index:number)=>{
        const newCourse = allCourses[index];
        console.log(newCourse);
        
        const studentId = user._id
        axios.post(`http://localhost:3001/courses/${newCourse._id}/enroll`, {studentId})
        .then(res=>{
            console.log(res.data);
            window.location.reload();
        })
        .catch(error=>{
            console.log(error);
        })
    }


    const handleDrop = (index:number)=>{
        const course = filteredCourses[index]
        axios.delete(`http://localhost:3001/courses/${course._id}/drop?studentId=${user._id}`)
    .then(res=>{
        console.log(res.data);
        window.location.reload();
        
    })
    .catch(error=>{
        console.log(error);
    })
    }

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/courses');
                const allCourses = response.data;
                setallcourses(allCourses)
                // Filter courses where user is a student
                const filteredCourses = allCourses.filter((course: { students: string | any[]; }) => course.students.includes(user._id));
                setFilteredCourses(filteredCourses);
                
                // Fetch professor names for all courses
                const professorIds = allCourses.map((course: { professor: { toString: () => any; }; }) => course.professor.toString());
                fetchProfessorNames(professorIds);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchAllCourses();
    }, [user._id]);

    const fetchProfessorNames = async (professorIds: string[]) => {
        try {
            const responses = await Promise.all(
                professorIds.map(professorId => axios.get<UserType>(`http://localhost:3001/user/${professorId}`))
            );
            
            
            // Extract professor names from responses
            const names = Object.fromEntries(
                responses.map(response => {
                    const professor = response.data;
                    return [professor._id, `${professor.firstName} ${professor.lastName}`];
                })
            );

            setProfessorNames(names);
        } catch (error) {
            console.error('Error fetching professor names:', error);
        }
    };
    useEffect(() => {
        let gradesArr: string[] =[];
        const fetchGrades = async (courseId:string) => {
            try {
                const studentId = user._id
                const response = await axios.get(`http://localhost:3001/grades/${studentId}/${courseId}`);
                const newgrade= response.data.grade
                gradesArr.push(newgrade)
                
                
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        filteredCourses.forEach((course) => {
                fetchGrades(course._id);
        });
        setgrades(gradesArr);
    }, [filteredCourses,user._id]);
    
    return (
        <div>
            <LogutButton/>
            <h1>StudentPage</h1>
            <h2>My courses</h2>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">course name</th>
                <th scope="col">professor name</th>
                <th scope="col">grade</th>
                <th>Drop course</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredCourses.map((item, index)=>(
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{professorNames[item.professor.toString()]}</td>
                            <td>{grades[index] !== undefined ? grades[index] : 'No grade yet'}</td>
                            <td><button className="btn btn-primary" onClick={()=>handleDrop(index)}>Drop</button></td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
            <br />
            <h2>all courses</h2>
            <table className='table'>
                <thead>
                    <tr>
                    <th scope="col">course name</th>
                    <th scope="col">professor name</th>
                    <th scope="col">Enroll</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        allCourses.map((item, index)=>(
                            <tr key={item}>
                                <td>{item.title}</td>
                                <td>{professorNames[item.professor.toString()]}</td>
                                <td><button className="btn btn-primary" onClick={()=>handleEnroll(index)}>Enroll</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default StudentPage;
