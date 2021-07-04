var highScoreChart = document.querySelector(".high-scores");
//var pressForInput = document.createElement("button");
var startButton=document.querySelector(".start-button");

var myQuiz = document.querySelector("#myQuiz");
var correctOrIncorrect = document.querySelector("#correctOrIncorrect");
var timerElement = document.querySelector('.timer-count');
myQuiz.setAttribute("style","Display:none;");
var finalScore = document.createElement("p");
var quizIndex = 0;
var userAnswer = localStorage.getItem("userAnswer");
var listItem;
var list;
var listHeader;
var listLength;
var answerVariable;
var correctAnswerCount=0;
var wrongAnswerCount=0;
var timer;
var timerCount;
var correctOrIncorrectCount = 0;
var nameLabel = document.createElement("p");
nameLabel.textContent = "Your Name ";
var userName = document.getElementById("uName");
var saveButton = document.getElementById("save");
var lastSlide = document.createElement("div");
lastSlide.appendChild(nameLabel);
nameLabel.setAttribute("style","font-weight:bold;");
lastSlide.appendChild(userName);
userName.setAttribute("style","border:2px solid black;");
nameLabel.setAttribute("style","display:inline;");
lastSlide.appendChild(finalScore);
lastSlide.appendChild(saveButton);
saveButton.setAttribute("style","display:block;border:2px solid black;text-decoration:bold;");
var topScore=0;
var topScorerName="";



highScoreChart.addEventListener("click",function(){

//window.open("./highestscore.html", "_blank");
});



saveButton.addEventListener("click", function(event) {
    
    
    event.preventDefault();
  saveButton.disabled="true";

    var userData = {
      user: "myUser",
      
      userName: userName.value.trim(),
      score:finalScore.textContent
    };
    localStorage.setItem("userData", JSON.stringify(userData));


    var userDataHighest = JSON.parse(localStorage.getItem("userDataHighest"));
    if(userDataHighest!== null){
      if (userDataHighest.score > finalScore.textContent  ){
        topScore = userDataHighest.score;
        topScorerName = userDataHighest.userName;
      }else{
        var userDataHighest = {
          user: "myUser",
          userName: userName.value.trim(),
          score:finalScore.textContent
        }
        localStorage.setItem("userDataHighest", JSON.stringify(userDataHighest));
    topScore = finalScore.textContent;
    topScorerName = userName.value.trim();

      }
    }else {
      var userDataHighest = {
        user: "myUser",
        userName: userName.value.trim(),
        score:finalScore.textContent
      }
      localStorage.setItem("userDataHighest", JSON.stringify(userDataHighest));
  topScore = finalScore.textContent;
  topScorerName = userName.value.trim();

    }
  });

    

   
var myCount;
myQuiz.id="myQuizId";
           


var myQuestions = [
  {
    question: "How can you get the total number of arguments passed to a function?",
    answers: {
      1: "using args.length property",
      2: "using arguments length property",
      3: "both of the above",
      4: "none of the above"
      },
    correctAnswer: "using arguments length property"
  },
  {
    question: " Which of the following type of variable takes precedence over other if names are same?",
    answers: {
      1: "global variable",
      2: "local variable",
      3: "none of the above",
      4: "all of the above"
      },
    correctAnswer:"local variable"
  },
  {
    question: "Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?",
    answers: {
      1: "toExponential()",
      2: "toFixed()",
      3: "toPrecision()",
      4: "toLocaleString()"
      },
    correctAnswer: "toFixed()"
  },
  {
    question: "Which of the following function of Array object reverses the order of the elements of an array?",
    answers: {
      1: "reverse()",
      2: "push()",
      3: "reduce()",
      4: "reduceRight()"
      },
    correctAnswer: "reverse()"
  },
  {
    question: "Which of the following function of Array object returns a new array comprised of this array joined with other array(s) and/or value(s)?",
    answers: {
      1: "concat()",
      2: "pop()",
      3: "push()",
      4: "some()"
      },
    correctAnswer: "concat()"
  },
  {
    question: "Which of the following function of String object returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order?",
    answers: {
      1: "localeCompare()",
      2: "search()",
      3: "substr()",
      4: "concat()"
      },
    correctAnswer: "localeCompare()"
  }
];
                console.log(myQuestions);
                console.log(myQuestions);
 startButton.setAttribute("style","background-color:purple;left-margin:70px;");


startButton.addEventListener("click",function(){
    
    //window.alert("it is clicked");
    timerCount = 20;
    startButton.disabled = true;
    localStorage.setItem("correctAnswerCount",0);
    localStorage.setItem("wrongAnswerCount",0);
    startTimer();

    showQuestions(quizIndex);
      
})
   

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
      timerCount--;
      if(correctOrIncorrectCount===1){
        correctOrIncorrect.textContent ="";
        correctOrIncorrectCount=0;
      }else{
      correctOrIncorrectCount++;}
      timerElement.textContent = "time remaining: "+ timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (quizIndex==myQuestions.length && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          resultScreen();
          
          //winGame();
        }
      }

      if (timerCount === 0 && quizIndex<myQuestions.length) {
        
        clearInterval(timer);
        removeElement();
       // resultScreen();
        //showForm();
        //timeOverResultScreen();
        
      }
    }, 2000);
  }



function resultScreen(){
     myCount=localStorage.getItem("correctAnswerCount");
    
    finalScore.textContent="Your Score is: "+myCount;
    finalScore.setAttribute("style","font-weight:bold;border:2px solid black;display:inline;margin-left:10px;padding-top:10px;margin-bottom:9px;");
    myQuiz.appendChild(lastSlide);
    
    
    
}

function showInput(){
    
    
    document.body.innerHTML = userInput;
    
}


function showQuestions(quizIndex){

    
        console.log(myQuestions);
        listHeader = myQuestions[quizIndex].question;
        listHeader = document.createElement("h1");
        listHeader.id="listHeaderId";
        myQuiz.appendChild(listHeader);
        listHeader.textContent=myQuestions[quizIndex].question;
         list=document.createElement("ol");
         list.id = "ol";
         list.classList.add("line-row");
        listHeader.appendChild(list);
        for(letter in myQuestions[quizIndex].answers){
             answerVariable=myQuestions[quizIndex].correctAnswer;
            listItem= document.createElement("li");
            
             listItem.id=letter;  
             listItem.setAttribute("state","hide");       
            listItem.textContent= myQuestions[quizIndex].answers[letter];
            listItem.setAttribute("style","color:white;");
            listItem.classList.add('unselected');
            
            
            list.appendChild(listItem);
            console.log(list);
            myQuiz.setAttribute("style","Display:block;"); 
            

            
             
    }
    
console.log("the list length is"+list.childElementCount);
listLength=list.childElementCount;
//var checkClicked = list.children[quizIndex].textContent;
for(var k = 0;k<listLength;k++){
    
    list.children[k].addEventListener("click",myScript);
    console.log("value of this is: "+this);
    var currentElementId=list.children[k].id;
    console.log("element for "+list.children[k]+"is "+currentElementId);
    var currentElement=list.children[k];
    
}
    
    
list.onmouseover = function(event){
  console.log("mouse over event detected");
  if (event.target.tagName != "LI") return;

  if (event.ctrlKey || event.metaKey) {
    toggleSelect(event.target);
  } else {
    singleSelect(event.target);
  }
  console.log(list.getElementsByClassName("selected"));
  console.log(list.getElementsByClassName("unselected"));
}

list.onmouseout = function(event){
  console.log("mouse out event detected");
  if (event.target.tagName != "LI") return;

  if (event.ctrlKey || event.metaKey) {
    toggleSelect(event.target);
  } else {
    singleSelect(event.target);
  }
  
  list.onmousedown = function() {
    return false;
  } 
 }

           
            function toggleSelect(li) {
              console.log("i am in toggle");
              li.classList.toggle('selected');
              li.classList.toggle('unselected');
            }
            
            function singleSelect(li) {
              let selected = list.getElementsByClassName('selected');
              for(let elem of selected) {
                elem.classList.remove('selected');
                elem.classList.add('unselected');
              }
              li.classList.add('selected');
              li.classList.remove('unselected');
            }
        
              console.log(list.getElementsByClassName("selected"));
              console.log(list.getElementsByClassName("unselected"));

          }  










function myScript(e){
    e.target.setAttribute("style","color:gray;");
    console.log("My log says "+e.target);
    //alert(e.target.textContent);
    
    correctOrIncorrect.setAttribute("style","border-top:2px solid black;font-weight:bold;text-align:center;padding:10px;");
    if(e.target.textContent===answerVariable){
        //alert("correct");
        correctAnswerCount++;
        localStorage.setItem("correctAnswerCount",correctAnswerCount);
        correctOrIncorrect.textContent="Correct";

                }
        else{
            wrongAnswerCount++;
            if(timerCount<=3){timerCount=0;}
            else
            {timerCount=timerCount-3;}
            localStorage.setItem("wrongAnswerCount",wrongAnswerCount);
            console.log("incorrect");
            correctOrIncorrect.textContent="InCorrect";
        }
        console.log("call to remove element");
        //alert("going to remove element now");
        removeElement();
        


}

function removeElement(){
    var element=document.getElementById("listHeaderId");
    element.parentNode.removeChild(element);
    
    console.log("The Removed element is "+element);
    
    quizIndex++;
    if(quizIndex<myQuestions.length && timerCount > 0){
       
        console.log("value of quiz index is "+quizIndex);
        showQuestions(quizIndex);

    }
    else{
      clearInterval(timer);
          resultScreen();
        console.log("nothing to show");
    }
}
              