document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const card = document.getElementById('card');
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
            const cardQuestion = document.getElementById('cardQuestion');
            const cardAnswer = document.getElementById('cardAnswer');
            const flashcardList = document.getElementById('flashcardList');
            const emptyState = document.getElementById('emptyState');
            const cardContainer = document.getElementById('cardContainer');
            const flipHint = document.getElementById('flipHint');
            const progressContainer = document.getElementById('progressContainer');
            const navigation = document.getElementById('navigation');
            const actionButtons = document.getElementById('actionButtons');
            const cardCounter = document.getElementById('cardCounter');
            const progressText = document.getElementById('progressText');
            const progressFill = document.getElementById('progressFill');
            const totalCardsEl = document.getElementById('total-cards');
            const masteredCardsEl = document.getElementById('mastered-cards');
            const progressPercentEl = document.getElementById('progress-percent');
            const formTitle = document.getElementById('formTitle');
            
            // Set current year in footer
            document.getElementById('current-year').textContent = new Date().getFullYear();
            
            // Initial flashcards data
            let flashcards = [
                {
                    id: 1,
                    question: 'What does HTML stand for?',
                    answer: 'HyperText Markup Language',
                    mastered: false
                },
                {
                    id: 2,
                    question: 'What are the components of the CSS box model?',
                    answer: 'Content, Padding, Border, Margin',
                    mastered: false
                },
                {
                    id: 3,
                    question: 'What is the difference between let, const, and var?',
                    answer: 'let and const are block-scoped, var is function-scoped. const cannot be reassigned.',
                    mastered: false
                },
                {
                    id: 4,
                    question: 'What are media queries in CSS?',
                    answer: 'Rules that apply different styles based on device characteristics like screen size.',
                    mastered: false
                }
            ];
            
            let currentCardIndex = 0;
            let isEditing = false;
            let editCardId = null;
            
            // Initialize the app
            function init() {
                renderFlashcardList();
                updateStats();
                
                if (flashcards.length > 0) {
                    showCardView();
                    showCard(currentCardIndex);
                } else {
                    showEmptyState();
                }
            }
            
            // Render the flashcard list in sidebar
            function renderFlashcardList() {
                flashcardList.innerHTML = '';
                
                if (flashcards.length === 0) {
                    flashcardList.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-layer-group"></i>
                            <h3>No Flashcards</h3>
                            <p>Add your first flashcard to get started!</p>
                        </div>
                    `;
                    return;
                }
                
                flashcards.forEach((flashcard, index) => {
                    const flashcardItem = document.createElement('div');
                    flashcardItem.className = `flashcard-item ${index === currentCardIndex ? 'active' : ''} ${flashcard.mastered ? 'mastered' : ''}`;
                    flashcardItem.dataset.id = flashcard.id;
                    
                    flashcardItem.innerHTML = `
                        <div class="card-controls">
                            <button title="Edit card"><i class="fas fa-edit"></i></button>
                            <button title="Delete card"><i class="fas fa-trash"></i></button>
                        </div>
                        <h4>${flashcard.question}</h4>
                        <p>${flashcard.answer}</p>
                    `;
                    
                    flashcardList.appendChild(flashcardItem);
                    
                    // Add event listeners for the controls
                    const editBtn = flashcardItem.querySelector('.card-controls button:first-child');
                    const deleteBtn = flashcardItem.querySelector('.card-controls button:last-child');
                    
                    editBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        editFlashcard(flashcard.id);
                    });
                    
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteFlashcard(flashcard.id);
                    });
                    
                    flashcardItem.addEventListener('click', () => {
                        selectFlashcard(index);
                    });
                });
            }
            
            // Show a specific card
            function showCard(index) {
                if (flashcards.length === 0) {
                    showEmptyState();
                    return;
                }
                
                currentCardIndex = index;
                const flashcard = flashcards[index];
                
                cardQuestion.textContent = flashcard.question;
                cardAnswer.textContent = flashcard.answer;
                
                // Reset card to front
                card.classList.remove('flipped');
                showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
                
                // Update active state in list
                document.querySelectorAll('.flashcard-item').forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });
                
                // Update mastered button state
                markMasteredBtn.innerHTML = flashcard.mastered 
                    ? '<i class="fas fa-check"></i> Mastered!' 
                    : '<i class="fas fa-check-circle"></i> Mark as Mastered';
                markMasteredBtn.disabled = flashcard.mastered;
                
                // Update card counter
                cardCounter.textContent = `Card ${index + 1} of ${flashcards.length}`;
                
                showCardView();
            }
            
            // Show the card view (hides empty state)
            function showCardView() {
                emptyState.style.display = 'none';
                cardContainer.style.display = 'block';
                flipHint.style.display = 'block';
                progressContainer.style.display = 'block';
                navigation.style.display = 'flex';
                actionButtons.style.display = 'flex';
            }
            
            // Show empty state (hides card view)
            function showEmptyState() {
                emptyState.style.display = 'block';
                cardContainer.style.display = 'none';
                flipHint.style.display = 'none';
                progressContainer.style.display = 'none';
                navigation.style.display = 'none';
                actionButtons.style.display = 'none';
            }
            
            // Select a flashcard from the list
            function selectFlashcard(index) {
                currentCardIndex = index;
                showCard(index);
            }
            
            // Go to next card
            function goToNextCard() {
                if (flashcards.length === 0) return;
                
                card.classList.remove('flipped');
                showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
                
                if (currentCardIndex < flashcards.length - 1) {
                    currentCardIndex++;
                } else {
                    currentCardIndex = 0;
                }
                
                showCard(currentCardIndex);
            }
            
            // Go to previous card
            function goToPrevCard() {
                if (flashcards.length === 0) return;
                
                card.classList.remove('flipped');
                showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
                
                if (currentCardIndex > 0) {
                    currentCardIndex--;
                } else {
                    currentCardIndex = flashcards.length - 1;
                }
                
                showCard(currentCardIndex);
            }
            
            // Flip the card
            function flipCard() {
                card.classList.toggle('flipped');
                if (card.classList.contains('flipped')) {
                    showAnswerBtn.innerHTML = 'Show Question <i class="fas fa-eye"></i>';
                } else {
                    showAnswerBtn.innerHTML = 'Show Answer <i class="fas fa-eye"></i>';
                }
            }
            
            // Add a new flashcard
            function addNewCard() {
                isEditing = false;
                editCardId = null;
                formTitle.innerHTML = '<i class="fas fa-plus"></i> Add New Flashcard';
                questionInput.value = '';
                answerInput.value = '';
                cardForm.style.display = 'block';
            }
            
            // Edit an existing flashcard
            function editFlashcard(id) {
                isEditing = true;
                editCardId = id;
                const flashcard = flashcards.find(card => card.id === id);
                
                if (flashcard) {
                    formTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Flashcard';
                    questionInput.value = flashcard.question;
                    answerInput.value = flashcard.answer;
                    cardForm.style.display = 'block';
                }
            }
            
            // Save flashcard (add or edit)
            function saveFlashcard() {
                const question = questionInput.value.trim();
                const answer = answerInput.value.trim();
                
                if (!question || !answer) {
                    alert('Please enter both question and answer');
                    return;
                }
                
                if (isEditing) {
                    // Update existing card
                    const index = flashcards.findIndex(card => card.id === editCardId);
                    if (index !== -1) {
                        flashcards[index].question = question;
                        flashcards[index].answer = answer;
                    }
                } else {
                    // Add new card
                    const newId = flashcards.length > 0 ? Math.max(...flashcards.map(card => card.id)) + 1 : 1;
                    flashcards.push({
                        id: newId,
                        question,
                        answer,
                        mastered: false
                    });
                    
                    // If this was the first card, show the card view
                    if (flashcards.length === 1) {
                        currentCardIndex = 0;
                        showCard(currentCardIndex);
                    }
                }
                
                // Update UI
                renderFlashcardList();
                updateStats();
                cardForm.style.display = 'none';
                
                // Show the current card (which might be the new one)
                showCard(currentCardIndex);
            }
            
            // Delete a flashcard
            function deleteFlashcard(id) {
                if (!confirm('Are you sure you want to delete this flashcard?')) {
                    return;
                }
                
                const index = flashcards.findIndex(card => card.id === id);
                if (index !== -1) {
                    flashcards.splice(index, 1);
                    
                    // Adjust current card index if needed
                    if (currentCardIndex >= flashcards.length) {
                        currentCardIndex = Math.max(0, flashcards.length - 1);
                    }
                    
                    // Update UI
                    renderFlashcardList();
                    updateStats();
                    
                    if (flashcards.length > 0) {
                        showCard(currentCardIndex);
                    } else {
                        showEmptyState();
                    }
                }
            }
            
            // Mark current card as mastered
            function markAsMastered() {
                if (flashcards.length === 0) return;
                
                const flashcard = flashcards[currentCardIndex];
                flashcard.mastered = !flashcard.mastered;
                
                // Update UI
                renderFlashcardList();
                updateStats();
                
                // Update button state
                markMasteredBtn.innerHTML = flashcard.mastered 
                    ? '<i class="fas fa-check"></i> Mastered!' 
                    : '<i class="fas fa-check-circle"></i> Mark as Mastered';
                markMasteredBtn.disabled = flashcard.mastered;
            }
            
            // Update statistics
            function updateStats() {
                const total = flashcards.length;
                const mastered = flashcards.filter(card => card.mastered).length;
                const progress = total > 0 ? Math.round((mastered / total) * 100) : 0;
                
                totalCardsEl.textContent = total;
                masteredCardsEl.textContent = mastered;
                progressPercentEl.textContent = `${progress}%`;
                progressText.textContent = `${progress}% Mastered`;
                progressFill.style.width = `${progress}%`;
            }
            
            // Event listeners
            card.addEventListener('click', flipCard);
            showAnswerBtn.addEventListener('click', flipCard);
            prevBtn.addEventListener('click', goToPrevCard);
            nextBtn.addEventListener('click', goToNextCard);
            addCardBtn.addEventListener('click', addNewCard);
            editCardBtn.addEventListener('click', () => editFlashcard(flashcards[currentCardIndex].id));
            cancelEditBtn.addEventListener('click', () => cardForm.style.display = 'none');
            saveCardBtn.addEventListener('click', saveFlashcard);
            markMasteredBtn.addEventListener('click', markAsMastered);
            
            // Initialize the app
            init();
        });