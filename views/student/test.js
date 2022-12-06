// user_collection

{
    "_id": { "63855e25fe858c566e6485c6"},
    "username": "ralin",
    "password": "$2b$10$MZGVwZjCRkbSxO6uSbIdouocvDUy5QznMhGUQNDXWtC/WuktGTJQa",
    "isInstructor" : "true"
    "enrolled_courses" : [{course_id: "63855e25fe858c566e6485c6", chapters_completed: [1,2,3] , course_completed: false}]
}

//courses_collection

{
    "_id": { "63855e25fe858c566e6485c6"},
    "title": "rali",
    "description": "$2b$10$MZGVwZjCRkbSxO6uSbIdouocvDUy5QznMhGUQNDXWtC/WuktGTJQa",
    "instructor_id" : "63855e25fe858c566e6485c6",
    cirriculm : {
        1:{
            type:"quiz", questions: 
        [{
            question: "What is 10/2?",
            answers: {
                a: '3',
                b: '5',
                c: '115'
            },
            correctAnswer: 'b'
        }]
    }
    },
    2: {type: "pdf", link: "LINK TO THE RESOURCE"}
}