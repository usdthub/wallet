// script.js

// DOM Elements
const sendBtn = document.getElementById('send-btn');
const fundBtn = document.getElementById('fund-btn');
const sendModal = document.getElementById('send-modal');
const fundModal = document.getElementById('fund-modal');
const successModal = document.getElementById('success-modal');
const closeSendModal = document.getElementById('close-send-modal');
const closeFundModal = document.getElementById('close-fund-modal');
const confirmSend = document.getElementById('confirm-send');
const addFund = document.getElementById('add-fund');
const closeSuccessModal = document.getElementById('close-success-modal');
const coinLogoText = document.getElementById('coin-logo-text');
const logoPreview = document.getElementById('logo-preview');
const balanceElement = document.getElementById('balance');
const blockchainOptions = document.querySelectorAll('.blockchain-option');
const tabs = document.querySelectorAll('.tab');
const moverTags = document.querySelectorAll('.mover-tag');
const navItems = document.querySelectorAll('.nav-item');

// Wallet state
let walletBalance = 10806370737.65;
let customCoins = [];

// Initialize the application
function init() {
    updateBalanceDisplay();
    setupEventListeners();
    loadCustomCoins();
}

// Set up all event listeners
function setupEventListeners() {
    // Modal buttons
    sendBtn.addEventListener('click', openSendModal);
    fundBtn.addEventListener('click', openFundModal);
    closeSendModal.addEventListener('click', closeSendModalHandler);
    closeFundModal.addEventListener('click', closeFundModalHandler);
    confirmSend.addEventListener('click', confirmSendHandler);
    addFund.addEventListener('click', addFundHandler);
    closeSuccessModal.addEventListener('click', closeSuccessModalHandler);
    
    // Logo preview update
    coinLogoText.addEventListener('input', updateLogoPreview);
    
    // Blockchain selection
    blockchainOptions.forEach(option => {
        option.addEventListener('click', selectBlockchain);
    });
    
    // Tab selection
    tabs.forEach(tab => {
        tab.addEventListener('click', selectTab);
    });
    
    // Mover tags selection
    moverTags.forEach(tag => {
        tag.addEventListener('click', selectMoverTag);
    });
    
    // Nav items selection
    navItems.forEach(item => {
        item.addEventListener('click', selectNavItem);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === sendModal) {
            closeSendModalHandler();
        }
        if (event.target === fundModal) {
            closeFundModalHandler();
        }
        if (event.target === successModal) {
            closeSuccessModalHandler();
        }
    });
}

// Update the balance display with proper formatting
function updateBalanceDisplay() {
    balanceElement.textContent = formatBalance(walletBalance);
}

// Format balance with commas and dollar sign
function formatBalance(balance) {
    return '$' + parseFloat(balance).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Open send modal
function openSendModal() {
    sendModal.style.display = 'flex';
}

// Open fund modal
function openFundModal() {
    fundModal.style.display = 'flex';
}

// Close send modal
function closeSendModalHandler() {
    sendModal.style.display = 'none';
    resetSendForm();
}

// Close fund modal
function closeFundModalHandler() {
    fundModal.style.display = 'none';
    resetFundForm();
}

// Close success modal
function closeSuccessModalHandler() {
    successModal.style.display = 'none';
}

// Handle send confirmation
function confirmSendHandler() {
    const recipient = document.querySelector('#send-modal .input-field[placeholder="Enter wallet address"]').value;
    const amount = document.querySelector('#send-modal .input-field[placeholder="0.00"]').value;
    const blockchain = document.querySelector('#send-modal .blockchain-option.active').textContent;
    
    if (!recipient || !amount) {
        alert('Please fill in all fields');
        return;
    }
    
    if (parseFloat(amount) <= 0) {
        alert('Amount must be greater than 0');
        return;
    }
    
    // In a real app, you would make an API call here
    // For demo, we'll just show success
    sendModal.style.display = 'none';
    successModal.style.display = 'flex';
    
    // Reset form
    resetSendForm();
}

// Handle adding funds (creating custom coin)
function addFundHandler() {
    const coinName = document.getElementById('coin-name').value;
    const coinLogo = document.getElementById('coin-logo-text').value || 'C';
    const amount = document.getElementById('coin-amount').value;
    
    if (!coinName || !amount) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (parseFloat(amount) <= 0) {
        alert('Amount must be greater than 0');
        return;
    }
    
    // Create new coin object
    const newCoin = {
        id: Date.now(),
        name: coinName,
        logo: coinLogo.substring(0, 2).toUpperCase(),
        amount: parseFloat(amount),
        value: parseFloat(amount) * 0.042, // Mock conversion rate
        change: '+3.53%'
    };
    
    // Add to custom coins array
    customCoins.push(newCoin);
    
    // Save to localStorage
    saveCustomCoins();
    
    // Show success
    fundModal.style.display = 'none';
    successModal.style.display = 'flex';
    
    // Reset form
    resetFundForm();
    
    // Update UI with new coin (in a real app)
    console.log('New coin added:', newCoin);
}

// Update logo preview
function updateLogoPreview() {
    const text = coinLogoText.value.substring(0, 2).toUpperCase();
    logoPreview.textContent = text || 'C';
}

// Select blockchain option
function selectBlockchain(event) {
    const selected = event.currentTarget;
    const parent = selected.parentElement;
    
    // Remove active class from all options
    parent.querySelectorAll('.blockchain-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    selected.classList.add('active');
}

// Select tab
function selectTab(event) {
    const selected = event.currentTarget;
    const parent = selected.parentElement;
    
    // Remove active class from all tabs
    parent.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to selected tab
    selected.classList.add('active');
    
    // In a real app, you would load different content based on the tab
    console.log('Tab selected:', selected.textContent);
}

// Select mover tag
function selectMoverTag(event) {
    const selected = event.currentTarget;
    const parent = selected.parentElement;
    
    // Remove active class from all tags
    parent.querySelectorAll('.mover-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    
    // Add active class to selected tag
    selected.classList.add('active');
    
    // In a real app, you would filter content based on the tag
    console.log('Mover tag selected:', selected.textContent);
}

// Select nav item
function selectNavItem(event) {
    const selected = event.currentTarget;
    const parent = selected.parentElement;
    
    // Remove active class from all items
    parent.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected item
    selected.classList.add('active');
    
    // In a real app, you would navigate to different sections
    console.log('Nav item selected:', selected.textContent);
}

// Reset send form
function resetSendForm() {
    document.querySelector('#send-modal .input-field[placeholder="Enter wallet address"]').value = '';
    document.querySelector('#send-modal .input-field[placeholder="0.00"]').value = '';
    
    // Reset blockchain selection to Ethereum
    const blockchainSelector = document.querySelector('#send-modal .blockchain-selector');
    blockchainSelector.querySelectorAll('.blockchain-option').forEach(option => {
        option.classList.remove('active');
    });
    blockchainSelector.querySelector('.blockchain-option').classList.add('active');
}

// Reset fund form
function resetFundForm() {
    document.getElementById('coin-name').value = '';
    document.getElementById('coin-logo-text').value = '';
    document.getElementById('coin-amount').value = '';
    logoPreview.textContent = 'C';
}

// Save custom coins to localStorage
function saveCustomCoins() {
    localStorage.setItem('customCoins', JSON.stringify(customCoins));
}

// Load custom coins from localStorage
function loadCustomCoins() {
    const storedCoins = localStorage.getItem('customCoins');
    if (storedCoins) {
        customCoins = JSON.parse(storedCoins);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Utility function to generate random price changes (for demo purposes)
function generateRandomChange() {
    const changes = ['+245.58%', '+24.2%', '+15.7%', '+8.3%', '-2.1%', '+32.5%'];
    return changes[Math.floor(Math.random() * changes.length)];
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(amount);
}

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatBalance,
        formatCurrency,
        generateRandomChange
    };
}
