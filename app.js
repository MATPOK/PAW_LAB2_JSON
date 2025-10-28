// Sample JSON data
const sampleData = {
    "kurs": "Programowanie Aplikacji Webowych",
    "laboratorium": 2,
    "temat": "Praca z formatem JSON",
    "student": {
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "numer_indeksu": "12345"
    },
    "technologie": ["HTML", "CSS", "JavaScript", "JSON"],
    "data_wykonania": new Date().toISOString().split('T')[0]
};

// Storage for dynamic items
let items = [];

// Initialize the app
function init() {
    displayJSON();
    loadItems();
    setupEventListeners();
}

// Display sample JSON
function displayJSON() {
    const jsonDisplay = document.getElementById('json-display');
    jsonDisplay.textContent = JSON.stringify(sampleData, null, 2);
}

// Load items from localStorage
function loadItems() {
    const stored = localStorage.getItem('pawlab2_items');
    if (stored) {
        items = JSON.parse(stored);
    }
    renderItems();
}

// Save items to localStorage
function saveItems() {
    localStorage.setItem('pawlab2_items', JSON.stringify(items));
}

// Render items list
function renderItems() {
    const itemsList = document.getElementById('items-list');
    
    if (items.length === 0) {
        itemsList.innerHTML = '<p style="color: #999; text-align: center;">Brak obiektów. Dodaj pierwszy!</p>';
        return;
    }
    
    itemsList.innerHTML = items.map((item, index) => `
        <div class="item">
            <div class="item-info">
                <div class="item-name">${escapeHtml(item.name)}</div>
                <div class="item-value">${escapeHtml(item.value)}</div>
            </div>
            <button class="delete-btn" onclick="deleteItem(${index})">Usuń</button>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    const form = document.getElementById('add-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem();
    });
}

// Add new item
function addItem() {
    const nameInput = document.getElementById('name-input');
    const valueInput = document.getElementById('value-input');
    
    const newItem = {
        id: Date.now(),
        name: nameInput.value.trim(),
        value: valueInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    items.push(newItem);
    saveItems();
    renderItems();
    
    // Clear form
    nameInput.value = '';
    valueInput.value = '';
    nameInput.focus();
}

// Delete item
function deleteItem(index) {
    items.splice(index, 1);
    saveItems();
    renderItems();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
