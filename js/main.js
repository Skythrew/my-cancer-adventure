const quiz = {
    title: "My Cancer Adventure",
    questions: [
        {
            label: "Choose one lifestyle risk:",
            uniqueChoice: true,
            answers: [
                {
                    label: "Smoking",
                    score: 1,
                    valid: true,
                },
                {
                    label: "Lack of exercise",
                    score: 1,
                    valid: false,
                },
                {
                    label: "Virus infection",
                    score: 1,
                    valid: true,
                },
                {
                    label: "Too intensive UV exposure",
                    score: 1,
                    valid: true,
                },
                {
                    label: "Mutation inheritance",
                    score: 1,
                    valid: true,
                },
                {
                    label: "Spontaneous mutation",
                    score: 1,
                    valid: true,
                }
            ]
        },
        {
            label: "You're in bad shape... What do you want to do ?",
            uniqueChoice: true,
            answers: [
                {
                    label: "Biopsy",
                    score: 2,
					ref: 4
                },
                {
                    label: "Let you go",
                    score: 0
                }
            ]
        },
		{
			label: "<span class=\"text-red-500\">You're in a very bad shape...</span> What do you want to do ?",
			uniqueChoice: true,
			answers: [
				{
					label: "Biopsy",
					score: 1,
					ref: 4
				},
				{
					label: "Let the life go",
					score: -1
				}
			]
		},
		{
			label: "You're in a <span class=\"text-red-500\">terrible baaddd shape</span>... What do you want to do ?",
			uniqueChoice: true,
			answers: [
				{
					label: "Biopsy",
					score: 0
				}
			]
		},
		{
			label: "You're doing your biopsy thanks to Doctor Fristot, who's telling you that you actually have a cancer due to \"{factor}\". You're affected by...",
			uniqueChoice: true,
			answers: [
				{
					label: "Lung cancer",
					score: 0
				},
				{
					label: "Colon cancer",
					score: 0
				},
				{
					label: "Liver cancer",
					score: 0
				},
				{
					label: "Skin cancer",
					score: 0
				},
				{
					label: "Retina cancer",
					score: 0
				},
				{
					label: "Melanoma cancer",
					score: 0
				}
			]
		},
		{
			label: "{goodCancer} Your cancer is causing a ... tumor",
			uniqueChoice: true,
			answers: [
				{
					label: "Benign",
					score: 0
				},
				{
					label: "Malign",
					score: 2,
					ref: 7
				}
			]
		},
		{
			label: "<span class=\"text-red-500\">You're now having metastasis appearing on your body!!!</span> Your cancer is causing a ... tumor",
			uniqueChoice: true,
			answers: [
				{
					label: "Benign",
					score: -1,
					ref: 6
				},
				{
					label: "Malign",
					score: 0
				}
			]
		},
		{
			label: "What's the best way to cure your {chosenCancer} cancer ?",
			uniqueChoice: true,
			answers: [
				{
					label: "Surgery",
					score: 4
				},
				{
					label: "Chemotherapy",
					score: 3
				},
				{
					label: "Radiation",
					score: 2,
				},
				{
					label: "Gene therapy (experimental)",
					score: 1
				}
			]
		},
		{
			label: "How many people die from cancer per year ?",
			uniqueChoice: true,
			answers: [
				{
					label: "5.7 Millions",
					score: 0
				},
				{
					label: "10.0 Millions",
					score: 2
				},
				{
					label: "13.4 Millions",
					score: 0
				},
				{
					label: "17.8 Millions",
					score: 0
				}
			]
		}
	]
}

let name = '';

function askName() {
	while (name.length == 0)
		name = window.prompt('Please enter your name!');

	document.getElementById('home').classList.add('hidden');
	document.getElementById('qcm').classList.remove('hidden');
	document.getElementById('patient').classList.remove('hidden');
	document.getElementById('name').textContent = name;
	document.getElementById('age').textContent = Math.floor(Math.random() * 100) + 1; 

	update();
}

let currentQuestion = -1;
var chosenCancer = '';
var goodCancer = 'You\'re right!!';
var factor = '';
var score = 0;

document.title = quiz.title

document.addEventListener('click', (event) => {
    console.log(event.target);

    if (event.target.classList.contains('answer')) {
        if (event.target.classList.contains('selected')) {
            event.target.classList.remove('selected');
            event.target.classList.remove('bg-sky-300');
            event.target.classList.remove('scale-125');
        } else {
            if (quiz.questions[currentQuestion].uniqueChoice && document.querySelectorAll('.selected').length >= 1)
                return;

            event.target.classList.add('selected');
            event.target.classList.add('bg-sky-300');
            event.target.classList.add('scale-125');
        }

        console.log('OK');
    }
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getSelectedAnswers() {
    let answers = [];
    
    for (const el of document.querySelectorAll('.selected')) {
        answers.push(quiz.questions[currentQuestion].answers[el.getAttribute('ansId')]);
    };

    return answers;
}

function submit() {
    let selectedAnswers = getSelectedAnswers();
    
    if (selectedAnswers.length < 1) {
        return;
    }

    console.log(selectedAnswers);

	if (currentQuestion == 0) {
		switch (quiz.questions[0].answers.indexOf(selectedAnswers[0])) {
			case 0:
				chosenCancer = 'lung';
				break;
			case 1:
				chosenCancer = 'colon';
				break;
			case 2:
				chosenCancer = 'liver';
				break;
			case 3:
				chosenCancer = 'skin';
				break;
			case 4:
				chosenCancer = 'retina';
				break;
			case 5:
				chosenCancer = 'melanoma';
				break;
		}

		quiz.questions[4].answers[quiz.questions[0].answers.indexOf(selectedAnswers[0])].score += 2;
		factor = selectedAnswers[0].label;
	} else if (currentQuestion == 4) {
		if (selectedAnswers[0].score == 0) {
			goodCancer = '<span class="text-red-500">You\'re wrong, you\'re affected by "' + chosenCancer + ' cancer"!!!</span>';
		}

		document.getElementById('cancerName').textContent = '"' + Array.from(chosenCancer)[0].toUpperCase() + Array.from(chosenCancer).slice(1).join('') + ' cancer"';
		document.getElementById('cancer').classList.remove('hidden');
	}
	
    for (const answer of selectedAnswers) {
        score += answer.score;
    }

    update();
}

function update() {
    if (getSelectedAnswers().length == 1) {
        if (typeof getSelectedAnswers()[0].ref != 'undefined')
            currentQuestion = getSelectedAnswers()[0].ref;
        else if (typeof quiz.questions[currentQuestion].ref != 'undefined')
            currentQuestion = quiz.questions[currentQuestion].ref;
        else
            currentQuestion += 1;
    }
    else {
        if (typeof quiz.questions[currentQuestion] != 'undefined') {
            if (typeof quiz.questions[currentQuestion].ref != undefined) {
                currentQuestion = quiz.questions[currentQuestion].ref;
            }
            else {
                currentQuestion += 1;
            }
        }
        else {
            currentQuestion += 1;
        }
    }
	
	if (currentQuestion == quiz.questions.length) {
		end();
	} else {

		document.querySelector('#score').innerHTML = 'Score (not really meaningful since all answers are <strong>correct</strong>): ' + score;
		let variableName = quiz.questions[currentQuestion].label.match(/\{(.*?)\}/);
		console.log(variableName);
		
		if (variableName != null)
			document.querySelector('#questionTitle').innerHTML = quiz.questions[currentQuestion].label.replace('{', '').replace('}', '').replace(variableName[1], window[variableName[1]]);
		else
			document.querySelector('#questionTitle').innerHTML = quiz.questions[currentQuestion].label;

		document.querySelector('#ansContainer').innerHTML = '';
		
		const answersToShow = [];
		
		for (let i = 0; i < quiz.questions[currentQuestion].answers.length; i++) {
			answersToShow.push(i);
		}
		
		randomAnswers = answersToShow.sort((a, b) => 0.5 - Math.random());
		
		for (const answerToShow of answersToShow) {
			document.querySelector('#ansContainer').innerHTML += '<div ansId="' + answerToShow + '" class="flex content-stretch content-center grow text-center basis-0 flex-col px-8 py-4 border-2 rounded-lg shadow transition-all duration-275 hover:scale-125 cursor-pointer answer active">' + quiz.questions[currentQuestion].answers[answerToShow].label + '</div>'
		}
	
	}
}

function end() {
	document.getElementById('qcm').classList.add('hidden');
	document.getElementById('end').classList.remove('hidden');
	document.getElementById('finalScore').textContent = score;
	
	let message = '';
	
	if (score <= 1)
		message = 'You died...';
	else if (score <= 4)
		message = 'You\'ll probably die very soon... We advise you to study a little bit more !';
	else if (score <= 8)
		message = 'Not too bad... Actually, you\'ve not been healed but at least you\'re not in a bad shape';
	else if (score <= 10)
		message = 'Thanks to your choices, you feel really better but you have to keep following your treatment(s).';
	else if (score <= 12)
		message = 'Congratulations ! You\'ve been healed correctly ! You can be proud of yourself ! BUT, be careful, since your cancer can start spreading again.';
	else if (score <= 13)
		message = 'Our biggest congratulations to you ! You made the PERFECT choices !! You can now sleep soundly, since there\'s almost a zero-risk to be affected once again.';

	document.getElementById('message').textContent = message;
	document.getElementById('score').textContent = score;
	document.getElementById('scoreLi').classList.remove('hidden');
}