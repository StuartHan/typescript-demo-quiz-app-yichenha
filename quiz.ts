import { IQuestion } from './question.interface';

// Define the Quiz class
class Quiz {
    private questions: IQuestion[];
    private questionIndex: number;
    private correctAnswers: number;
    private selectedOption: string | null;

    constructor(questions: IQuestion[]) {
        this.questions = questions;
        this.questionIndex = 0;
        this.correctAnswers = 0;
        this.selectedOption = null;
    }

    // Display the current question
    public displayQuestion(): void {
        this.selectedOption = null;
        // Current question to display
        const question = this.questions[this.questionIndex];
        // Places to display the question
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');

        // UI validity check
        if (questionElement && optionsElement) {
            // Display question title
            questionElement.innerText = question.question;
            // Display options WAY 1
            // optionsElement.innerHTML = question.options.map(option => `<li>${option}</li>`).join('');
            // Display options WAY 2
            optionsElement.innerHTML = '';
            question.options.forEach((option: string) => {
                const button = document.createElement('button');
                button.innerText = option;
                button.addEventListener('click', () => {
                    this.selectOption(option); // Highlight button after it's clicked
                });
                optionsElement.appendChild(button);
            });

        }
    }

    // Select an option
    private selectOption(option: string): void {
        this.selectedOption = option;
        const options = document.querySelectorAll('#options button');
        options.forEach((opt: Element) => {
            if ((opt as HTMLButtonElement).innerText === option) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    // Submit the selected answer
    public submitAnswer(): void {
        if (this.selectedOption) {
            const question = this.questions[this.questionIndex];
            if (this.selectedOption === question.answer) {
                this.correctAnswers++;
            }
            this.questionIndex++;
            if (this.questionIndex < this.questions.length) {
                this.displayQuestion();
            } else {
                // If there are no more questions, display the result
                const resultElement = document.getElementById('result');
                const submitButton = document.getElementById('submit');
                if (resultElement) {
                    resultElement.innerText = `Score: ${this.correctAnswers}`;
                }
                if (submitButton) {
                    submitButton.style.display = 'none';
                }
            }            
        } else {
            alert('Please select an option');
        }
    }
    
}

// Define your questions
const questions: IQuestion[] = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "John von Neumann"], answer: "Charles Babbage" },
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "London"], answer: "Paris" },
    { question: "What color do you get when you mix red and white?", options: ["Pink", "Purple", "Orange"], answer: "Pink" },
    { question: "How many continents are there?", options: ["5", "6", "7"], answer: "7" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond"], answer: "Diamond" },
    { question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "What gas do plants absorb from the atmosphere for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Carbon Dioxide" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen"], answer: "William Shakespeare" },
  ];

// Create a new Quiz instance and set up event listeners
const quiz = new Quiz(questions);
document.addEventListener('DOMContentLoaded', () => {
    quiz.displayQuestion();
    const submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            quiz.submitAnswer();
        });
    }
});