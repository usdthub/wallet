// script.js

// DOM Elements
const sendBtn = document.getElementById('send-btn');
const fundBtn = document.getElementById('fund-btn');
const swapBtn = document.getElementById('swap-btn');
const sendModal = document.getElementById('send-modal');
const fundModal = document.getElementById('fund-modal');
const swapModal = document.getElementById('swap-modal');
const coinSelectModal = document.getElementById('coin-select-modal');
const successModal = document.getElementById('success-modal');
const swapProgressModal = document.getElementById('swap-progress-modal');
const closeSendModal = document.getElementById('close-send-modal');
const closeFundModal = document.getElementById('close-fund-modal');
const closeSwapModal = document.getElementById('close-swap-modal');
const closeCoinSelectModal = document.getElementById('close-coin-select-modal');
const confirmSend = document.getElementById('confirm-send');
const addFund = document.getElementById('add-fund');
const confirmSwap = document.getElementById('confirm-swap');
const closeSuccessModal = document.getElementById('close-success-modal');
const coinLogoText = document.getElementById('coin-logo-text');
const logoPreview = document.getElementById('logo-preview');
const balanceElement = document.getElementById('balance');
const pump1000Btn = document.getElementById('pump-1000');
const dump3000Btn = document.getElementById('dump-3000');
const swapFromCoin = document.getElementById('swap-from-coin');
const swapToCoin = document.getElementById('swap-to-coin');
const swapFromAmount = document.getElementById('swap-from-amount');
const swapToAmount = document.getElementById('swap-to-amount');
const coinList = document.getElementById('coin-list');
const coinSearch = document.getElementById('coin-search');
const swapProgress = document.getElementById('swap-progress');
const swapStatus = document.getElementById('swap-status');
const tabs = document.querySelectorAll('.tab');
const cryptoTab = document.getElementById('crypto-tab');
const nftsTab = document.getElementById('nfts-tab');
const blockchainOptions = document.querySelectorAll('.blockchain-option');
const moverTags = document.querySelectorAll('.mover-tag');
const navItems = document.querySelectorAll('.nav-item');

// Wallet state
let walletBalance = 10806370737.65;
let usdtBalance = 81763673;
let bnbBalance = 467;
let trxBalance = 839878828;
let trumpBalance = 986672;
let customCoins = [];
let selectedCoinForSwap = null;
let swapDirection = 'from'; // 'from' or 'to'

// Available coins for swapping
const availableCoins = [
    { symbol: 'USDT', name: 'Tether', logoColor: '#26a17a', price: 1.00, balance: 81763673 },
    { symbol: 'BNB', name: 'Binance Coin', logoColor: '#f3ba2f', price: 350.25, balance: 467 },
    { symbol: 'BTC', name: 'Bitcoin', logoColor: '#f7931a', price: 42000.50, balance: 0 },
    { symbol: 'ETH', name: 'Ethereum', logoColor: '#627eea', price: 2200.75, balance: 0 },
    { symbol: 'TRX', name: 'TRON', logoColor: '#ff060a', price: 0.12, balance: 839878828 },
    { symbol: 'TRUMP', name: 'Trump Coin', logoColor: '#c41e3a', price: 0.85, balance: 986672 },
    { symbol: 'ADA', name: 'Cardano', logoColor: '#0033ad', price: 0.45, balance: 0 },
    { symbol: 'DOT', name: 'Polkadot', logoColor: '#e6007a', price: 6.80, balance: 0 },
    { symbol: 'XRP', name: 'Ripple', logoColor: '#23292f', price: 0.60, balance: 0 },
    { symbol: 'DOGE', name: 'Dogecoin', logoColor: '#c2a633', price: 0.15, balance: 0 },
    { symbol: 'SOL', name: 'Solana', logoColor: '#00ffbd', price: 100.25, balance: 0 },
    { symbol: 'MATIC', name: 'Polygon', logoColor: '#8247e5', price: 0.85, balance: 0 },
    { symbol: 'LTC', name: 'Litecoin', logoColor: '#345d9d', price: 75.30, balance: 0 },
    { symbol: 'LINK', name: 'Chainlink', logoColor: '#2a5ada', price: 15.75, balance: 0 },
    { symbol: 'XLM', name: 'Stellar', logoColor: '#14b6e7', price: 0.12, balance: 0 },
    { symbol: 'BCH', name: 'Bitcoin Cash', logoColor: '#8dc351', price: 250.80, balance: 0 },
    { symbol: 'ETC', name: 'Ethereum Classic', logoColor: '#3c8031', price: 25.40, balance: 0 },
    { symbol: 'FIL', name: 'Filecoin', logoColor: '#0090ff', price: 5.65, balance: 0 },
    { symbol: 'EOS', name: 'EOS', logoColor: '#000000', price: 0.85, balance: 0 },
    { symbol: 'XTZ', name: 'Tezos', logoColor: '#2c7df7', price: 1.05, balance: 0 },
    { symbol: 'AAVE', name: 'Aave', logoColor: '#b6509e', price: 120.75, balance: 0 },
    { symbol: 'UNI', name: 'Uniswap', logoColor: '#ff007a', price: 7.50, balance: 0 },
    { symbol: 'COMP', name: 'Compound', logoColor: '#00d395', price: 55.30, balance: 0 },
    { symbol: 'MKR', name: 'Maker', logoColor: '#1aab9b', price: 1500.25, balance: 0 },
    { symbol: 'SNX', name: 'Synthetix', logoColor: '#00d1ff', price: 3.25, balance: 0 },
    { symbol: 'YFI', name: 'Yearn Finance', logoColor: '#006ae3', price: 8500.75, balance: 0 },
    { symbol: 'SUSHI', name: 'SushiSwap', logoColor: '#fa52a0', price: 1.25, balance: 0 },
    { symbol: 'CRV', name: 'Curve DAO', logoColor: '#40649f', price: 0.65, balance: 0 },
    { symbol: 'BAT', name: 'Basic Attention', logoColor: '#ff5000', price: 0.25, balance: 0 },
    { symbol: 'ZRX', name: '0x', logoColor: '#302c2c', price: 0.35, balance: 0 },
    { symbol: 'REP', name: 'Augur', logoColor: '#5e2ca5', price: 12.50, balance: 0 },
    { symbol: 'KNC', name: 'Kyber Network', logoColor: '#31cb9e', price: 0.75, balance: 0 },
    { symbol: 'BAL', name: 'Balancer', logoColor: '#1e1e1e', price: 4.25, balance: 0 },
    { symbol: 'REN', name: 'Ren', logoColor: '#001c3a', price: 0.10, balance: 0 },
    { symbol: 'UMA', name: 'UMA', logoColor: '#ff4a4a', price: 2.15, balance: 0 },
    { symbol: 'BAND', name: 'Band Protocol', logoColor: '#516aff', price: 1.75, balance: 0 },
    { symbol: 'NMR', name: 'Numeraire', logoColor: '#0500ff', price: 25.80, balance: 0 },
    { symbol: 'OCEAN', name: 'Ocean Protocol', logoColor: '#141414', price: 0.45, balance: 0 },
    { symbol: 'CVC', name: 'Civic', logoColor: '#3ab03e', price: 0.15, balance: 0 },
    { symbol: 'GNT', name: 'Golem', logoColor: '#001d57', price: 0.05, balance: 0 }
];

// Initialize the application
function init() {
    updateBalanceDisplay();
    updateCoinDisplays();
    setupEventListeners();
    loadCustomCoins();
    populateCoinList();
    updatePriceChanges();
}

// Set up all event listeners
function setupEventListeners() {
    // Modal buttons
    sendBtn.addEventListener('click', openSendModal);
    fundBtn.addEventListener('click', openFundModal);
    swapBtn.addEventListener('click', openSwapModal);
    closeSendModal.addEventListener('click', closeSendModalHandler);
    closeFundModal.addEventListener('click', closeFundModalHandler);
    closeSwapModal.addEventListener('click', closeSwapModalHandler);
    closeCoinSelectModal.addEventListener('click', closeCoinSelectModalHandler);
    confirmSend.addEventListener('click', confirmSendHandler);
    addFund.addEventListener('click', addFundHandler);
    confirmSwap.addEventListener('click', confirmSwapHandler);
    closeSuccessModal.addEventListener('click', closeSuccessModalHandler);
    
    // Pump/Dump buttons
    pump1000Btn.addEventListener('click', () => pumpDumpUSDT(1000));
    dump3000Btn.addEventListener('click', () => pumpDumpUSDT(-3000));
    
    // Logo preview update
    coinLogoText.addEventListener('input', updateLogoPreview);
    
    // Swap coin selection
    swapFromCoin.addEventListener('click', () => openCoinSelectModal('from'));
    swapToCoin.addEventListener('click', () => openCoinSelectModal('to'));
    
    // Swap amount calculation
    swapFromAmount.addEventListener('input', calculateSwapToAmount);
    
    // Coin search
    coinSearch.addEventListener('input', filterCoinList);
    
    // Tab selection
    tabs.forEach(tab => {
        tab.addEventListener('click', () => selectTab(tab.dataset.tab));
    });
    
    // Blockchain selection
    blockchainOptions.forEach(option => {
        option.addEventListener('click', selectBlockchain);
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
        if (event.target === sendModal) closeSendModalHandler();
        if (event.target === fundModal) closeFundModalHandler();
        if (event.target === swapModal) closeSwapModalHandler();
        if (event.target === coinSelectModal) closeCoinSelectModalHandler();
        if (event.target === successModal) closeSuccessModalHandler();
        if (event.target === swapProgressModal) closeSwapProgressModalHandler();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    // Ctrl+1 for Send
    if (event.ctrlKey && event.key === '1') {
        event.preventDefault();
        openSendModal();
    }
    // Ctrl+2 for Fund
    else if (event.ctrlKey && event.key === '2') {
        event.preventDefault();
        openFundModal();
    }
    // Ctrl+3 for Swap
    else if (event.ctrlKey && event.key === '3') {
        event.preventDefault();
        openSwapModal();
    }
    // Escape to close modals
    else if (event.key === 'Escape') {
        closeAllModals();
    }
}

// Close all open modals
function closeAllModals() {
    sendModal.style.display = 'none';
    fundModal.style.display = 'none';
    swapModal.style.display = 'none';
    coinSelectModal.style.display = 'none';
    successModal.style.display = 'none';
    swapProgressModal.style.display = 'none';
}

// Update the balance display with proper formatting
function updateBalanceDisplay() {
    balanceElement.textContent = formatCurrency(walletBalance);
}

// Update coin amount displays
function updateCoinDisplays() {
    document.getElementById('usdt-amount').textContent = formatNumber(usdtBalance) + ' USDT';
    document.getElementById('bnb-amount').textContent = formatNumber(bnbBalance) + ' BNB';
    document.getElementById('trx-amount').textContent = formatNumber(trxBalance) + ' TRX';
    document.getElementById('trump-amount').textContent = formatNumber(trumpBalance) + ' TRUMP';
}

// Format balance with commas and dollar sign
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Format number with commas
function formatNumber(amount) {
    return parseFloat(amount).toLocaleString('en-US', {
        maximumFractionDigits: 2
    });
}

// Pump or dump USDT
function pumpDumpUSDT(amount) {
    usdtBalance += amount;
    walletBalance += amount;
    
    updateBalanceDisplay();
    updateCoinDisplays();
    
    // Show notification
    const action = amount > 0 ? 'added to' : 'removed from';
    showSuccess(`$${Math.abs(amount)} USDT ${action} your wallet`, `USDT ${amount > 0 ? 'Pumped' : 'Dumped'}`);
}

// Open send modal
function openSendModal() {
    sendModal.style.display = 'flex';
}

// Open fund modal
function openFundModal() {
    fundModal.style.display = 'flex';
}

// Open swap modal
function openSwapModal() {
    swapModal.style.display = 'flex';
    calculateSwapToAmount();
}

// Open coin selection modal
function openCoinSelectModal(direction) {
    swapDirection = direction;
    coinSelectModal.style.display = 'flex';
    coinSearch.value = '';
    filterCoinList(); // Reset filter
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

// Close swap modal
function closeSwapModalHandler() {
    swapModal.style.display = 'none';
}

// Close coin select modal
function closeCoinSelectModalHandler() {
    coinSelectModal.style.display = 'none';
}

// Close success modal
function closeSuccessModalHandler() {
    successModal.style.display = 'none';
}

// Close swap progress modal
function closeSwapProgressModalHandler() {
    // Don't allow closing during swap
}

// Handle send confirmation
function confirmSendHandler() {
    const recipient = document.querySelector('#send-modal .input-field[placeholder="Enter wallet address"]').value;
    const amount = parseFloat(document.getElementById('send-amount').value);
    
    if (!recipient || !amount) {
        alert('Please fill in all fields');
        return;
    }
    
    if (amount <= 0) {
        alert('Amount must be greater than 0');
        return;
    }
    
    if (amount > usdtBalance) {
        alert('Insufficient USDT balance');
        return;
    }
    
    // Validate recipient address (basic check)
    if (!isValidAddress(recipient)) {
        alert('Please enter a valid wallet address');
        return;
    }
    
    // Update balances
    usdtBalance -= amount;
    walletBalance -= amount;
    
    updateBalanceDisplay();
    updateCoinDisplays();
    
    sendModal.style.display = 'none';
    showSuccess(`Successfully sent ${formatCurrency(amount)} USDT`, 'Transaction Sent');
    
    // Add to transaction history
    addTransaction('Sent USDT', `To: ${recipient.substring(0, 6)}...${recipient.substring(recipient.length - 4)}`, -amount, 'USDT');
    
    // Reset form
    resetSendForm();
}

// Basic address validation
function isValidAddress(address) {
    return address.length >= 20 && address.length <= 60 && /^[a-zA-Z0-9]+$/.test(address);
}

// Handle adding funds (creating custom coin)
function addFundHandler() {
    const coinName = document.getElementById('coin-name').value;
    const coinLogo = document.getElementById('coin-logo-text').value || 'C';
    const amount = parseFloat(document.getElementById('coin-amount').value);
    
    if (!coinName || !amount) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (amount <= 0) {
        alert('Amount must be greater than 0');
        return;
    }
    
    // Create new coin object
    const newCoin = {
        id: Date.now(),
        name: coinName,
        symbol: coinLogo.substring(0, 3).toUpperCase(),
        logo: coinLogo.substring(0, 2).toUpperCase(),
        amount: amount,
        value: amount,
        change: '+0.0%'
    };
    
    // Add to custom coins array
    customCoins.push(newCoin);
    
    // Update wallet balance
    walletBalance += amount;
    updateBalanceDisplay();
    
    // Show success
    fundModal.style.display = 'none';
    showSuccess(`Successfully added ${formatCurrency(amount)} ${newCoin.symbol}`, 'Funds Added');
    
    // Add to transaction history
    addTransaction('Received Funds', `Added ${newCoin.symbol}`, amount, newCoin.symbol);
    
    // Reset form
    resetFundForm();
}

// Handle swap confirmation
function confirmSwapHandler() {
    const fromCoinElement = document.querySelector('#swap-from-coin .coin-name').textContent;
    const toCoinElement = document.querySelector('#swap-to-coin .coin-name').textContent;
    const fromAmount = parseFloat(swapFromAmount.value);
    
    if (!fromAmount || fromAmount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    // Check if user has enough balance
    const fromCoin = availableCoins.find(coin => coin.symbol === fromCoinElement);
    if (fromAmount > fromCoin.balance) {
        alert(`Insufficient ${fromCoin.symbol} balance`);
        return;
    }
    
    // Show swap progress
    swapProgressModal.style.display = 'flex';
    swapProgress.style.width = '0%';
    
    // Simulate swap process with progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        swapProgress.style.width = `${progress}%`;
        
        if (progress <= 25) {
            swapStatus.textContent = 'Confirming transaction...';
        } else if (progress <= 50) {
            swapStatus.textContent = 'Processing on blockchain...';
        } else if (progress <= 75) {
            swapStatus.textContent = 'Executing swap...';
        } else {
            swapStatus.textContent = 'Finalizing...';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            completeSwap(fromCoinElement, toCoinElement, fromAmount);
        }
    }, 100);
}

// Complete the swap transaction
function completeSwap(fromSymbol, toSymbol, fromAmount) {
    const fromCoin = availableCoins.find(coin => coin.symbol === fromSymbol);
    const toCoin = availableCoins.find(coin => coin.symbol === toSymbol);
    
    // Calculate received amount (simplified)
    const toAmount = fromAmount * fromCoin.price / toCoin.price * 0.995; // 0.5% fee
    
    // Update balances
    fromCoin.balance -= fromAmount;
    toCoin.balance += toAmount;
    
    // Update specific coin balances
    if (fromSymbol === 'USDT') {
        usdtBalance = fromCoin.balance;
    } else if (toSymbol === 'USDT') {
        usdtBalance = toCoin.balance;
    }
    
    if (fromSymbol === 'BNB') {
        bnbBalance = fromCoin.balance;
    } else if (toSymbol === 'BNB') {
        bnbBalance = toCoin.balance;
    }
    
    if (fromSymbol === 'TRX') {
        trxBalance = fromCoin.balance;
    } else if (toSymbol === 'TRX') {
        trxBalance = toCoin.balance;
    }
    
    if (fromSymbol === 'TRUMP') {
        trumpBalance = fromCoin.balance;
    } else if (toSymbol === 'TRUMP') {
        trumpBalance = toCoin.balance;
    }
    
    // Update wallet balance (simplified)
    walletBalance = usdtBalance + 
                   bnbBalance * availableCoins.find(c => c.symbol === 'BNB').price +
                   trxBalance * availableCoins.find(c => c.symbol === 'TRX').price +
                   trumpBalance * availableCoins.find(c => c.symbol === 'TRUMP').price;
    
    updateBalanceDisplay();
    updateCoinDisplays();
    
    // Add to transaction history
    addTransaction('Swapped', `${fromSymbol} to ${toSymbol}`, toAmount, toSymbol);
    
    // Close modals and show success
    swapProgressModal.style.display = 'none';
    swapModal.style.display = 'none';
    showSuccess(`Successfully swapped ${fromAmount} ${fromSymbol} for ${toAmount.toFixed(6)} ${toSymbol}`, 'Swap Completed');
}

// Add transaction to history
function addTransaction(title, description, amount, currency) {
    const transactionHistory = document.querySelector('.transaction-history');
    const transactionItem = document.createElement('div');
    transactionItem.className = 'transaction-item';
    
    const isPositive = amount > 0;
    const iconColor = isPositive ? '#4caf50' : '#f44336';
    const iconClass = isPositive ? 'fa-arrow-down' : 'fa-arrow-up';
    
    transactionItem.innerHTML = `
        <div class="transaction-details">
            <div class="transaction-icon" style="background-color: ${iconColor};">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="transaction-info">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        </div>
        <div class="transaction-amount">
            <div class="value" style="color: ${isPositive ? '#4caf50' : '#f44336'}">${isPositive ? '+' : ''}${amount} ${currency}</div>
            <div class="status">Completed</div>
        </div>
    `;
    
    // Add to the top of transaction history
    transactionHistory.insertBefore(transactionItem, transactionHistory.firstChild);
}

// Calculate swap amount
function calculateSwapToAmount() {
    const fromCoinElement = document.querySelector('#swap-from-coin .coin-name').textContent;
    const toCoinElement = document.querySelector('#swap-to-coin .coin-name').textContent;
    const fromAmount = parseFloat(swapFromAmount.value) || 0;
    
    const fromCoin = availableCoins.find(coin => coin.symbol === fromCoinElement);
    const toCoin = availableCoins.find(coin => coin.symbol === toCoinElement);
    
    if (fromCoin && toCoin) {
        const toAmount = fromAmount * fromCoin.price / toCoin.price * 0.995; // 0.5% fee
        swapToAmount.value = toAmount.toFixed(6);
        
        // Update minimum received
        document.getElementById('min-received').textContent = `${(toAmount * 0.99).toFixed(6)} ${toCoin.symbol}`;
        
        // Update price impact
        const priceImpact = calculatePriceImpact(fromCoin, toCoin, fromAmount);
        const priceImpactElement = document.querySelector('.pl-indicator .pl-positive');
        priceImpactElement.textContent = `${priceImpact}%`;
        priceImpactElement.className = priceImpact > 2 ? 'pl-negative' : 'pl-positive';
    }
}

// Calculate price impact for swap
function calculatePriceImpact(fromCoin, toCoin, amount) {
    // Simplified price impact calculation
    const baseImpact = 0.1;
    const volumeImpact = amount / (fromCoin.price * fromCoin.balance) * 100;
    return (baseImpact + volumeImpact).toFixed(2);
}

// Populate coin list for selection
function populateCoinList() {
    coinList.innerHTML = '';
    
    availableCoins.forEach(coin => {
        const coinOption = document.createElement('div');
        coinOption.className = 'coin-option';
        coinOption.innerHTML = `
            <div class="coin-logo" style="background-color: ${coin.logoColor};">${coin.symbol}</div>
            <div>
                <div style="font-weight: bold;">${coin.symbol}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${coin.name}</div>
            </div>
            <div class="coin-price">${formatCurrency(coin.price)}</div>
        `;
        
        coinOption.addEventListener('click', () => selectCoinForSwap(coin));
        coinList.appendChild(coinOption);
    });
}

// Filter coin list based on search
function filterCoinList() {
    const searchTerm = coinSearch.value.toLowerCase();
    const coinOptions = document.querySelectorAll('.coin-option');
    
    coinOptions.forEach(option => {
        const coinSymbol = option.querySelector('div:first-child div:first-child').textContent.toLowerCase();
        const coinName = option.querySelector('div:first-child div:last-child').textContent.toLowerCase();
        
        if (coinSymbol.includes(searchTerm) || coinName.includes(searchTerm)) {
            option.style.display = 'flex';
        } else {
            option.style.display = 'none';
        }
    });
}

// Select coin for swap
function selectCoinForSwap(coin) {
    if (swapDirection === 'from') {
        swapFromCoin.innerHTML = `
            <div class="coin-logo" style="background-color: ${coin.logoColor};">${coin.symbol}</div>
            <div class="coin-name">${coin.symbol}</div>
            <i class="fas fa-chevron-down"></i>
        `;
    } else {
        swapToCoin.innerHTML = `
            <div class="coin-logo" style="background-color: ${coin.logoColor};">${coin.symbol}</div>
            <div class="coin-name">${coin.symbol}</div>
            <i class="fas fa-chevron-down"></i>
        `;
    }
    
    coinSelectModal.style.display = 'none';
    calculateSwapToAmount();
}

// Update logo preview
function updateLogoPreview() {
    const text = coinLogoText.value.substring(0, 2).toUpperCase();
    logoPreview.textContent = text || 'C';
}

// Select tab
function selectTab(tabName) {
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    if (tabName === 'crypto') {
        cryptoTab.style.display = 'flex';
        nftsTab.style.display = 'none';
    } else {
        cryptoTab.style.display = 'none';
        nftsTab.style.display = 'flex';
    }
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
    document.getElementById('send-amount').value = '';
}

// Reset fund form
function resetFundForm() {
    document.getElementById('coin-name').value = '';
    document.getElementById('coin-logo-text').value = '';
    document.getElementById('coin-amount').value = '';
    logoPreview.textContent = 'C';
}

// Show success message
function showSuccess(message, title) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = message;
    successModal.style.display = 'flex';
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

// Update price changes randomly (for demo purposes)
function updatePriceChanges() {
    setInterval(() => {
        // Update available coin prices randomly
        availableCoins.forEach(coin => {
            if (coin.symbol !== 'USDT') {
                const change = (Math.random() - 0.5) * 0.1; // -5% to +5%
                coin.price *= (1 + change);
            }
        });
        
        // Update displayed changes
        const changes = document.querySelectorAll('.crypto-amount .change');
        changes.forEach(changeElement => {
            const change = (Math.random() - 0.4) * 10; // -4% to +6%
            const isPositive = change >= 0;
            changeElement.textContent = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;
            changeElement.className = `change ${isPositive ? '' : 'negative'}`;
        });
        
        // Update wallet balance based on new prices
        walletBalance = usdtBalance + 
                       bnbBalance * availableCoins.find(c => c.symbol === 'BNB').price +
                       trxBalance * availableCoins.find(c => c.symbol === 'TRX').price +
                       trumpBalance * availableCoins.find(c => c.symbol === 'TRUMP').price;
        
        updateBalanceDisplay();
        
    }, 10000); // Update every 10 seconds
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        formatNumber,
        calculatePriceImpact,
        isValidAddress
    };
}
