document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cardForm = document.getElementById('cardForm');
    const editCardBtn = document.getElementById('editCardBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const addCardBtn = document.getElementById('addCardBtn');
    const saveCardBtn = document.getElementById('saveCardBtn');
    const markMasteredBtn = document.getElementById('markMasteredBtn');
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const cardContent = document.querySelector('.card-content');
    const cardItems = document.querySelectorAll('.flashcard-item');
    const currentYearSpan = document.getElementById('current-year');
    
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Card flip functionality

    function flipCard() {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            showAnswerBtn.innerHTML = 'Show Question <i class="fas fa-eye"></i>';
        } else {
            showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
        }
    }

    

    
});