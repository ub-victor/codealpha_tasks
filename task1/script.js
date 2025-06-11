document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
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
    
    // Set current year in footer
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
    
    card.addEventListener('click', flipCard);
    showAnswerBtn.addEventListener('click', flipCard);
    
    // Navigation functions
    function goToNextCard() {
        card.classList.remove('flipped');
        showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
        
        const currentItem = document.querySelector('.flashcard-item.active');
        if (currentItem.nextElementSibling) {
            currentItem.classList.remove('active');
            currentItem.nextElementSibling.classList.add('active');
            cardContent.textContent = "What are the components of the CSS box model?";
        }
    }
    
    function goToPrevCard() {
        card.classList.remove('flipped');
        showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
        
        const currentItem = document.querySelector('.flashcard-item.active');
        if (currentItem.previousElementSibling) {
            currentItem.classList.remove('active');
            currentItem.previousElementSibling.classList.add('active');
            cardContent.textContent = "What does HTML stand for?";
        }
    }
    
    nextBtn.addEventListener('click', goToNextCard);
    prevBtn.addEventListener('click', goToPrevCard);
    
    // Card management
    function openCardForm() {
        cardForm.style.display = 'block';
        questionInput.value = "What does HTML stand for?";
        answerInput.value = "HyperText Markup Language";
    }
    
    function closeCardForm() {
        cardForm.style.display = 'none';
    }
    
    function saveCard() {
        cardContent.textContent = questionInput.value;
        closeCardForm();
        alert('Flashcard updated successfully!');
    }
    
    function addNewCard() {
        openCardForm();
        questionInput.value = "";
        answerInput.value = "";
        document.querySelector('.section-title').innerHTML = '<i class="fas fa-plus"></i> Add New Flashcard';
    }
    
    function markAsMastered() {
        const currentItem = document.querySelector('.flashcard-item.active');
        currentItem.style.background = 'rgba(6, 214, 160, 0.1)';
        currentItem.style.borderColor = 'var(--success)';
        markMasteredBtn.innerHTML = '<i class="fas fa-check"></i> Mastered!';
        markMasteredBtn.disabled = true;
    }
    
    // Event listeners
    editCardBtn.addEventListener('click', openCardForm);
    cancelEditBtn.addEventListener('click', closeCardForm);
    addCardBtn.addEventListener('click', addNewCard);
    saveCardBtn.addEventListener('click', saveCard);
    markMasteredBtn.addEventListener('click', markAsMastered);
    
    // Flashcard list selection
    cardItems.forEach(item => {
        item.addEventListener('click', function() {
            cardItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            card.classList.remove('flipped');
            showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
            cardContent.textContent = this.querySelector('p').textContent;
        });
    });
});