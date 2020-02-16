const myLesson = [
    {lesson: 1, status: true},
    {lesson: 2, status: true},
    {lesson: 3, status: false},
    {lesson: 4, status: true},
    {lesson: 5, status: false},
    {lesson: 6, status: true},
    {lesson: 7, status: true},
    {lesson: 8, status: true},
    {lesson: 9, status: true},
    {lesson: 10, status: false}
];

const falseLesson = myLesson.filter((item) => !item.status);


console.log(falseLesson)