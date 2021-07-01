function init() {
    
    let questionNumber = 0
    let score = 0
    quizEl.innerHTML = `
    <div id="start">
        <p id="start">
            Are you worthy of a crown, or just muddling through the Middle Ages?
            Take our medieval kings and queens quiz and put your royal knowledge
            to the test...
        </p>
        <button class="buttons" id="start-quiz" 
                style="background-color: red; color: white; border-style:none;"
        >
            START QUIZ
        </button>
    </div>`

    
    quizEl.addEventListener('submit', function (e) {
        e.preventDefault()
        
        const selectedInput = e.target.querySelector('input[type=radio]:checked')
        const alert = e.target.querySelector('div.alert')
        if (selectedInput === null) {
            alert.innerHTML = 'You need to select an answer'
            alert.style.color = "darkorange"
        } else if (selectedInput.dataset.correct === "true") {
            alert.innerHTML = "That's correct!"
            alert.style.color = 'green'
            score++
        } else {
            alert.innerHTML = 'Oops! Try again!'
            alert.style.color = 'red'
        }
        if (questionNumber < (questions.length-1) && selectedInput !== null) {
            e.submitter.style.display="none"
            document.getElementById('next-question').style.display="inline"
            
        }
        if (questionNumber === (questions.length - 1)) {
            e.submitter.style.display="none"
            document.getElementById('show-score').style.display="inline"
        }
        
    })

    document.getElementById('show-score').onclick = function (e) {
        showResults(score)
        e.target.style.display="none"
    }

    document.getElementById('next-question').onclick = function (e) {
        console.log(e);
        questionNumber++
        e.target.style.display="none" 
        showQuiestion(questions, questionNumber)
    }
    document.getElementById('start-quiz').onclick = function(e) {
        showQuiestion(questions, 0)
    }
}
init()

function showResults(score) {
    let message
    if (score / questions.length < 0.5) message = 'You can do better!'
    else if (score / questions.length < 0.75) message = 'Good!'
    else if (score / questions.length < 1) message = 'You are best!'
    quizEl.innerHTML = `
    <div id="score">
        <h1 style="color: #486884">
            Your score is ${score}/${questions.length}
        </h1>
        <h1 style="color: green">
            ${message}
        </h1>
    </div>`
}

function showQuiestion(questions, qIndex) {
    let question = questions[qIndex]
    let quizStr = ''
    let answerStr = ''
    const answerOrder = randomRange(question.a.length)
    question.a.forEach((answer, aIndex) => {
        answerStr += `
        <li style="order:${answerOrder[aIndex]}">
            <label>
                <input 
                    type="radio" 
                    name="question-${qIndex}"
                    data-correct="${question.correct === aIndex}"
                >
                <p class="answers">${answer}</p>
               
            </label>
        </li>
        `
    })

    quizStr =`
    <form> 
        <h1 id="question">${question.q}</h1>
        <div class="alert">Choose the correct answer</div>
        <ul id="answer-List">
            ${answerStr}
        </ul>
            <button class="buttons" type="submit">Submit</button> 
    </form>
    
    `
    quizEl.innerHTML = quizStr;
}


//randomizer
function random(n) {
    const r = Math.random() * n
    return Math.floor(r)
}

function randomRange(x) {
    const arr = []
    for (let i = 0; i < x; i++) {
        arr.push(i)
    }

    const randomArr = []
    while(arr.length > 0) {
        randomIndex = random(arr.length)
        const randomNumber = arr[randomIndex]
        randomArr.push(randomNumber)
        arr.splice(randomIndex, 1)
    }

    return randomArr
}

