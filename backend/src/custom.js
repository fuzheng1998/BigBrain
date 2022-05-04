/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  // {
  // id: 0
  //   content: "",
  //   points: 10,
  //   type: "multiple",
  //   time: 10
  //   options: [
  //   {
  //      id:  1
  //      content: "this is a dog"
  //   }
  //   ],
  //  answers: []
  //  mediaType: null
  //  image: ""
  //  videoCode: ""
  // }


  // delete question.answers;
  let newQuestion = JSON.parse(JSON.stringify(question));
  delete newQuestion.answers;
  return newQuestion;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  console.log("Call getCorrectAnswer Backend: ", new Date().toUTCString());
  return question.answers;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.options.map(op => op.id);
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.time;
};
