// Avatar Customizer JavaScript
class AvatarCustomizer {
    constructor() {
        this.currentAvatar = {
            toc: 'toc1.svg',
            trangphuc: 'tp1.svg',
            phukien: 'pk1.svg',
            bieucam: 'bc1.svg'
        };
        
        // Available character avatars
        this.characterAvatars = [
            'character-21.png', 'character-22.png', 'character-23.png', 'character-24.png', 'character-25.png',
            'character-26.png', 'character-27.png', 'character-28.png', 'character-29.png', 'character-30.png',
            'character-31.png', 'character-32.png', 'character-33.png', 'character-34.png', 'character-35.png',
            'character-36.png', 'character-37.png', 'character-38.png', 'character-39.png', 'character-40.png',
            'character-41.png', 'character-42.png', 'character-43.png', 'character-44.png', 'character-45.png'
        ];
        
        this.currentCharacterAvatar = 'character-21.png';
        
        this.init();
    }
    
    init() {
        this.setupTabSwitching();
        this.setupItemSelection();
        this.selectDefaultItems();
        this.initializeCharacterAvatar();
    }
    
    initializeCharacterAvatar() {
        // Hide all layer images and show single character avatar
        const layerImages = document.querySelectorAll('.avatar-layer');
        layerImages.forEach(img => img.style.display = 'none');
        
        // Create or update character avatar image
        let characterImg = document.getElementById('character-avatar');
        if (!characterImg) {
            characterImg = document.createElement('img');
            characterImg.id = 'character-avatar';
            characterImg.className = 'character-avatar';
            characterImg.style.position = 'absolute';
            characterImg.style.width = '350px';
            characterImg.style.height = '350px';
            characterImg.style.objectFit = 'contain';
            characterImg.style.top = '50%';
            characterImg.style.left = '50%';
            characterImg.style.transform = 'translate(-50%, -50%)';
            characterImg.style.zIndex = '10';
            
            const avatarContainer = document.querySelector('.avatar-container');
            avatarContainer.appendChild(characterImg);
        }
        
        characterImg.src = `images/character/${this.currentCharacterAvatar}`;
    }
    
    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const itemsGrids = document.querySelectorAll('.items-grid');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                tabButtons.forEach(tab => tab.classList.remove('active'));
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Hide all grids
                itemsGrids.forEach(grid => grid.classList.add('hidden'));
                // Show the selected grid
                const category = button.getAttribute('data-category');
                const targetGrid = document.getElementById(`${category}-grid`);
                if (targetGrid) {
                    targetGrid.classList.remove('hidden');
                }
            });
        });
    }
    
    setupItemSelection() {
        const itemOptions = document.querySelectorAll('.item-option');
        
        itemOptions.forEach(option => {
            option.addEventListener('click', () => {
                const category = option.closest('.items-grid').getAttribute('data-category');
                const itemName = option.getAttribute('data-item');
                
                // Remove selected class from all items in this category
                const categoryGrid = option.closest('.items-grid');
                categoryGrid.querySelectorAll('.item-option').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // Add selected class to clicked item
                option.classList.add('selected');
                
                // Update avatar
                this.updateAvatar(category, itemName);
            });
        });
    }
    
    selectDefaultItems() {
        // Select first item in each category by default
        const categories = ['toc', 'trangphuc', 'phukien', 'bieucam'];
        
        categories.forEach(category => {
            const grid = document.getElementById(`${category}-grid`);
            if (grid) {
                const firstItem = grid.querySelector('.item-option');
                if (firstItem) {
                    firstItem.classList.add('selected');
                }
            }
        });
    }
    
    updateAvatar(category, itemName) {
        // Update the current avatar state
        this.currentAvatar[category] = itemName;
        
        // Random a new character avatar when any component changes
        this.randomizeCharacterAvatar();
        
        // Optional: Save to localStorage for persistence
        this.saveAvatarState();
    }
    
    randomizeCharacterAvatar() {
        // Pick a random character avatar
        const randomIndex = Math.floor(Math.random() * this.characterAvatars.length);
        this.currentCharacterAvatar = this.characterAvatars[randomIndex];
        
        // Update the character avatar display
        const characterImg = document.getElementById('character-avatar');
        if (characterImg) {
            characterImg.src = `images/character/${this.currentCharacterAvatar}`;
        }
    }
    
    saveAvatarState() {
        const state = {
            ...this.currentAvatar,
            currentCharacterAvatar: this.currentCharacterAvatar
        };
        localStorage.setItem('avatarCustomizer', JSON.stringify(state));
    }
    
    loadAvatarState() {
        const saved = localStorage.getItem('avatarCustomizer');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.currentAvatar = {
                    toc: state.toc || 'toc1.svg',
                    trangphuc: state.trangphuc || 'tp1.svg',
                    phukien: state.phukien || 'pk1.svg',
                    bieucam: state.bieucam || 'bc1.svg'
                };
                this.currentCharacterAvatar = state.currentCharacterAvatar || 'character-21.png';
                this.applyAvatarState();
            } catch (e) {
                console.log('Error loading saved avatar state:', e);
            }
        }
    }
    
    applyAvatarState() {
        // Apply the loaded state to the avatar
        Object.keys(this.currentAvatar).forEach(category => {
            const itemName = this.currentAvatar[category];
            
            // Update the selected item in the grid
            const grid = document.getElementById(`${category}-grid`);
            if (grid) {
                // Remove all selected states
                grid.querySelectorAll('.item-option').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // Find and select the correct item
                const targetItem = grid.querySelector(`[data-item="${itemName}"]`);
                if (targetItem) {
                    targetItem.classList.add('selected');
                }
            }
        });
        
        // Update character avatar display
        const characterImg = document.getElementById('character-avatar');
        if (characterImg) {
            characterImg.src = `images/character/${this.currentCharacterAvatar}`;
        }
    }
    
    // Method to export avatar as a combined image (for future use)
    exportAvatar() {
        // Return current state including character avatar
        return {
            ...this.currentAvatar,
            characterAvatar: this.currentCharacterAvatar,
            name: document.getElementById('avatar-name').value || 'Avatar'
        };
    }
    
    // Method to randomize avatar
    randomizeAvatar() {
        const categories = {
            toc: ['toc1.svg', 'toc2.svg', 'toc3.svg', 'toc4.svg', 'toc5.svg'],
            trangphuc: ['tp1.svg', 'tp2.svg', 'tp3.svg', 'tp4.svg', 'tp5.svg', 'tp6.svg'],
            phukien: ['pk1.svg', 'pk2.svg', 'pk3.svg', 'pk4.svg', 'pk5.svg'],
            bieucam: ['bc1.svg', 'bc2.svg', 'bc3.svg', 'bc4.svg']
        };
        
        Object.keys(categories).forEach(category => {
            const items = categories[category];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            this.updateAvatar(category, randomItem);
            
            // Update the UI selection
            const grid = document.getElementById(`${category}-grid`);
            if (grid) {
                grid.querySelectorAll('.item-option').forEach(item => {
                    item.classList.remove('selected');
                });
                
                const targetItem = grid.querySelector(`[data-item="${randomItem}"]`);
                if (targetItem) {
                    targetItem.classList.add('selected');
                }
            }
        });
        
        // Also randomize the character avatar
        this.randomizeCharacterAvatar();
    }
    
    // Method to show result screen
    showResultScreen() {
        const name = document.getElementById('avatar-name').value.trim();
        if (!name) {
            alert('Vui lòng nhập tên của bạn!');
            return;
        }
        
        // Hide customization section
        const customizationSection = document.getElementById('customization-section');
        const resultSection = document.getElementById('result-section');
        
        customizationSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        // Update greeting with name
        const greeting = document.getElementById('greeting');
        greeting.innerHTML = `Xin chào, <br> [${name}]`;
        
        // Copy avatar to result section
        this.displayFinalAvatar();
    }
    
    // Method to show customization screen
    showCustomizationScreen() {
        const customizationSection = document.getElementById('customization-section');
        const resultSection = document.getElementById('result-section');
        
        resultSection.classList.add('hidden');
        customizationSection.classList.remove('hidden');
    }
    
    // Method to display final avatar in result section
    displayFinalAvatar() {
        const finalAvatarContainer = document.querySelector('.final-avatar-container');
        
        // Clear existing content
        finalAvatarContainer.innerHTML = '';
        
        // Create final avatar image
        const finalAvatar = document.createElement('img');
        finalAvatar.src = `images/character/${this.currentCharacterAvatar}`;
        finalAvatar.alt = 'Final Avatar';
        finalAvatar.style.width = '100%';
        finalAvatar.style.height = '100%';
        finalAvatar.style.objectFit = 'contain';
        
        finalAvatarContainer.appendChild(finalAvatar);
    }
}

// Initialize the avatar customizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const customizer = new AvatarCustomizer();
    
    // Load saved state if available
    customizer.loadAvatarState();
    
    // Button event listeners
    const btnComplete = document.getElementById('btn-complete');
    const btnBack = document.getElementById('btn-back');
    const btnEditCharacter = document.getElementById('btn-edit-character');
    const btnStartLesson = document.getElementById('btn-start-lesson');
    
    if (btnComplete) {
        btnComplete.addEventListener('click', () => {
            customizer.showResultScreen();
        });
    }
    
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            // Handle back action (you can navigate to previous page)
            window.history.back();
        });
    }
    
    if (btnEditCharacter) {
        btnEditCharacter.addEventListener('click', () => {
            customizer.showCustomizationScreen();
        });
    }
    
    if (btnStartLesson) {
        btnStartLesson.addEventListener('click', () => {
            // Handle start lesson action (navigate to lesson page)
            alert('Bắt đầu bài học!');
            // You can add navigation to lesson page here
            // window.location.href = 'lesson.html';
        });
    }
    
    // Add randomize functionality (you can add a button for this)
    window.randomizeAvatar = () => customizer.randomizeAvatar();
    
    // Add export functionality (you can add a button for this)
    window.exportAvatar = () => {
        const avatarData = customizer.exportAvatar();
        console.log('Avatar Data:', avatarData);
        alert(`Avatar exported!\nCharacter: ${avatarData.characterAvatar}\nName: ${avatarData.name}`);
        return avatarData;
    };
    
    // Handle name input changes
    const nameInput = document.getElementById('avatar-name');
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            // You can implement real-time name display or validation here
            console.log('Avatar name changed:', nameInput.value);
        });
    }
    
    // Add a button to manually randomize character avatar (for testing)
    window.randomizeCharacterOnly = () => customizer.randomizeCharacterAvatar();
});
