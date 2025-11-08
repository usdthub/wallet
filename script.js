// script.js - Trust Wallet Clone

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
const gasOptions = document.querySelectorAll('.gas-option');
const recipientAddress = document.getElementById('recipient-address');
const sendAmount = document.getElementById('send-amount');
const sendMemo = document.getElementById('send-memo');
const coinName = document.getElementById('coin-name');
const coinSymbol = document.getElementById('coin-symbol');
const coinLogoUrl = document.getElementById('coin-logo-url');
const coinAmount = document.getElementById('coin-amount');
const feeAmount = document.querySelector('.fee-amount');

// Wallet state
let walletBalance = 10806370737.65;
let usdtBalance = 81763673;
let bnbBalance = 467;
let trxBalance = 839878828;
let trumpBalance = 986672;
let customCoins = [];
let selectedCoinForSwap = null;
let swapDirection = 'from'; // 'from' or 'to'
let currentBlockchain = 'bsc';
let currentGasOption = 'standard';
let transactions = [];
let priceUpdateInterval;

// Available coins for swapping with real data
const availableCoins = [
    { 
        symbol: 'USDT', 
        name: 'Tether', 
        logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png', 
        price: 1.00, 
        balance: 81763673, 
        pnl: 1245.67, 
        sl: 0.998,
        change: 0.1,
        color: '#26a17a'
    },
    { 
        symbol: 'BNB', 
        name: 'Binance Coin', 
        logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png', 
        price: 350.25, 
        balance: 467, 
        pnl: 3456.78, 
        sl: 320.50,
        change: 2.4,
        color: '#f3ba2f'
    },
    { 
        symbol: 'BTC', 
        name: 'Bitcoin', 
        logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', 
        price: 42000.50, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: 1.2,
        color: '#f7931a'
    },
    { 
        symbol: 'ETH', 
        name: 'Ethereum', 
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 
        price: 2200.75, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: -0.8,
        color: '#627eea'
    },
    { 
        symbol: 'TRX', 
        name: 'TRON', 
        logo: 'https://cryptologos.cc/logos/tron-trx-logo.png', 
        price: 0.12, 
        balance: 839878828, 
        pnl: 2134.56, 
        sl: 0.115,
        change: 1.8,
        color: '#ff060a'
    },
    { 
        symbol: 'TRUMP', 
        name: 'Trump Coin', 
        logo: 'https://cryptologos.cc/logos/maga-trump-maga-logo.png', 
        price: 0.85, 
        balance: 986672, 
        pnl: 1567.89, 
        sl: 0.78,
        change: 5.2,
        color: '#c41e3a'
    },
    { 
        symbol: 'ADA', 
        name: 'Cardano', 
        logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png', 
        price: 0.45, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: 0.5,
        color: '#0033ad'
    },
    { 
        symbol: 'DOT', 
        name: 'Polkadot', 
        logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png', 
        price: 6.80, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: -1.2,
        color: '#e6007a'
    },
    { 
        symbol: 'XRP', 
        name: 'Ripple', 
        logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png', 
        price: 0.60, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: 0.3,
        color: '#23292f'
    },
    { 
        symbol: 'DOGE', 
        name: 'Dogecoin', 
        logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png', 
        price: 0.15, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: 8.7,
        color: '#c2a633'
    },
    { 
        symbol: 'SOL', 
        name: 'Solana', 
        logo: 'https://cryptologos.cc/logos/solana-sol-logo.png', 
        price: 100.25, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: 3.4,
        color: '#00ffbd'
    },
    { 
        symbol: 'MATIC', 
        name: 'Polygon', 
        logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png', 
        price: 0.85, 
        balance: 0, 
        pnl: 0, 
        sl: 0,
        change: -0.5,
        color: '#8247e5'
    }
];

// Blockchain networks data
const blockchainNetworks = {
    bsc: {
        name: 'Binance Smart Chain',
        symbol: 'BSC',
        logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
        baseFee: 1.23,
        gasLimit: 21000
    },
    ethereum: {
        name: 'Ethereum',
        symbol: 'ETH',
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        baseFee: 5.67,
        gasLimit: 21000
    },
    polygon: {
        name: 'Polygon',
        symbol: 'MATIC',
        logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
        baseFee: 0.12,
        gasLimit: 21000
    },
    tron: {
        name: 'TRON',
        symbol: 'TRX',
        logo: 'https://cryptologos.cc/logos/tron-trx-logo.png',
        baseFee: 0.05,
        gasLimit: 21000
    }
};

// Gas options
const gasOptionsData = {
    standard: {
        name: 'Standard',
        time: '~ 5 seconds',
        multiplier: 1
    },
    fast: {
        name: 'Fast',
        time: '~ 3 seconds',
        multiplier: 2
    },
    instant: {
        name: 'Instant',
        time: '~ 1 second',
        multiplier: 4
    }
};

// Initialize the application
function init() {
    updateBalanceDisplay();
    updateCoinDisplays();
    setupEventListeners();
    loadCustomCoins();
    populateCoinList();
    updateGasPrices();
    startPriceUpdates();
    loadTransactionHistory();
    updateNetworkStatus();
    
    // Add sample transactions if none exist
    if (transactions.length === 0) {
        addSampleTransactions();
    }
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
    
    // Gas option selection
    gasOptions.forEach(option => {
        option.addEventListener('click', selectGasOption);
    });
    
    // Form validation
    recipientAddress.addEventListener('input', validateAddress);
    sendAmount.addEventListener('input', validateSendAmount);
    coinName.addEventListener('input', validateFundForm);
    coinSymbol.addEventListener('input', validateFundForm);
    coinAmount.addEventListener('input', validateFundForm);
    
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
    
    // Online/offline detection
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
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
    
    // Update PnL displays
    updatePnLDisplays();
}

// Update PnL displays for all coins
function updatePnLDisplays() {
    const cryptoCards = document.querySelectorAll('.crypto-card');
    
    cryptoCards.forEach(card => {
        const coinSymbol = card.dataset.coin;
        const coin = availableCoins.find(c => c.symbol === coinSymbol);
        
        if (coin) {
            const pnlValue = card.querySelector('.pnl-value');
            const changeElement = card.querySelector('.change');
            
            if (pnlValue) {
                const isPositive = coin.pnl >= 0;
                pnlValue.textContent = `${isPositive ? '+' : ''}$${Math.abs(coin.pnl).toFixed(2)}`;
                pnlValue.className = `pnl-value ${isPositive ? 'positive' : 'negative'}`;
            }
            
            if (changeElement) {
                const isPositive = coin.change >= 0;
                changeElement.textContent = `${isPositive ? '+' : ''}${coin.change.toFixed(2)}%`;
                changeElement.className = `change ${isPositive ? 'positive' : 'negative'}`;
            }
        }
    });
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
    // Validate amount
    if (amount < 0 && Math.abs(amount) > usdtBalance) {
        showError('Insufficient USDT balance for this operation');
        return;
    }
    
    usdtBalance += amount;
    walletBalance += amount;
    
    updateBalanceDisplay();
    updateCoinDisplays();
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: amount > 0 ? 'deposit' : 'withdrawal',
        coin: 'USDT',
        amount: Math.abs(amount),
        value: Math.abs(amount),
        status: 'completed',
        timestamp: new Date(),
        description: amount > 0 ? 'USDT Pump' : 'USDT Dump'
    };
    
    addTransaction(transaction);
    
    // Show notification
    const action = amount > 0 ? 'added to' : 'removed from';
    showSuccess(`$${Math.abs(amount)} USDT ${action} your wallet`, `USDT ${amount > 0 ? 'Pumped' : 'Dumped'}`);
}

// Open send modal
function openSendModal() {
    sendModal.style.display = 'flex';
    updateGasPrices();
    resetSendForm();
}

// Open fund modal
function openFundModal() {
    fundModal.style.display = 'flex';
    resetFundForm();
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
    const recipient = recipientAddress.value.trim();
    const amount = parseFloat(sendAmount.value);
    const memo = sendMemo.value.trim();
    
    if (!recipient || !amount) {
        showError('Please fill in all required fields');
        return;
    }
    
    if (amount <= 0) {
        showError('Amount must be greater than 0');
        return;
    }
    
    if (amount > usdtBalance) {
        showError('Insufficient USDT balance');
        return;
    }
    
    // Validate recipient address
    if (!isValidAddress(recipient)) {
        showError('Please enter a valid wallet address');
        return;
    }
    
    // Get transaction fee
    const fee = calculateTransactionFee();
    
    // Update balances
    usdtBalance -= amount;
    walletBalance -= amount;
    
    updateBalanceDisplay();
    updateCoinDisplays();
    
    // Create transaction record
    const transaction = {
        id: Date.now(),
        type: 'send',
        coin: 'USDT',
        amount: -amount,
        value: amount,
        status: 'completed',
        timestamp: new Date(),
        toAddress: recipient,
        memo: memo,
        blockchain: currentBlockchain,
        fee: fee,
        description: `Sent to ${recipient.substring(0, 6)}...${recipient.substring(recipient.length - 4)}`
    };
    
    addTransaction(transaction);
    
    sendModal.style.display = 'none';
    showSuccess(`Successfully sent ${formatCurrency(amount)} USDT to ${recipient.substring(0, 6)}...${recipient.substring(recipient.length - 4)}`, 'Transaction Sent');
    
    // Reset form
    resetSendForm();
}

// Basic address validation
function isValidAddress(address) {
    // Basic validation - in real app, use proper blockchain-specific validation
    return address.length >= 20 && address.length <= 60 && /^[a-zA-Z0-9]+$/.test(address);
}

// Calculate transaction fee based on blockchain and gas option
function calculateTransactionFee() {
    const baseFee = blockchainNetworks[currentBlockchain].baseFee;
    const multiplier = gasOptionsData[currentGasOption].multiplier;
    return baseFee * multiplier;
}

// Handle adding funds (creating custom coin)
function addFundHandler() {
    const name = coinName.value.trim();
    const symbol = coinSymbol.value.trim().toUpperCase();
    const logoUrl = coinLogoUrl.value.trim();
    const amount = parseFloat(coinAmount.value);
    
    if (!name || !symbol || !amount) {
        showError('Please fill in all required fields');
        return;
    }
    
    if (amount <= 0) {
        showError('Amount must be greater than 0');
        return;
    }
    
    // Check if symbol already exists
    if (availableCoins.some(coin => coin.symbol === symbol)) {
        showError('A coin with this symbol already exists');
        return;
    }
    
    // Create new coin object
    const newCoin = {
        symbol: symbol,
        name: name,
        logo: logoUrl || 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        price: 1.00,
        balance: amount,
        pnl: 0,
        sl: 0.95,
        change: 0,
        color: getRandomColor()
    };
    
    // Add to available coins
    availableCoins.push(newCoin);
    
    // Update wallet balance
    walletBalance += amount;
    updateBalanceDisplay();
    
    // Create transaction record
    const transaction = {
        id: Date.now(),
        type: 'deposit',
        coin: symbol,
        amount: amount,
        value: amount,
        status: 'completed',
        timestamp: new Date(),
        description: `Added ${symbol} funds`
    };
    
    addTransaction(transaction);
    
    // Show success
    fundModal.style.display = 'none';
    showSuccess(`Successfully added ${formatCurrency(amount)} ${symbol}`, 'Funds Added');
    
    // Reset form
    resetFundForm();
    
    // Update UI
    populateCoinList();
}

// Get random color for new coins
function getRandomColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Handle swap confirmation
function confirmSwapHandler() {
    const fromCoinElement = document.querySelector('#swap-from-coin .coin-name').textContent;
    const toCoinElement = document.querySelector('#swap-to-coin .coin-name').textContent;
    const fromAmount = parseFloat(swapFromAmount.value);
    
    if (!fromAmount || fromAmount <= 0) {
        showError('Please enter a valid amount');
        return;
    }
    
    // Check if user has enough balance
    const fromCoin = availableCoins.find(coin => coin.symbol === fromCoinElement);
    if (fromAmount > fromCoin.balance) {
        showError(`Insufficient ${fromCoin.symbol} balance`);
        return;
    }
    
    // Check if swapping to same coin
    if (fromCoinElement === toCoinElement) {
        showError('Cannot swap to the same coin');
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
    
    // Create transaction record
    const transaction = {
        id: Date.now(),
        type: 'swap',
        coin: toSymbol,
        amount: toAmount,
        value: toAmount * toCoin.price,
        status: 'completed',
        timestamp: new Date(),
        description: `Swapped ${fromAmount} ${fromSymbol} to ${toAmount.toFixed(6)} ${toSymbol}`
    };
    
    addTransaction(transaction);
    
    // Close modals and show success
    swapProgressModal.style.display = 'none';
    swapModal.style.display = 'none';
    showSuccess(`Successfully swapped ${fromAmount} ${fromSymbol} for ${toAmount.toFixed(6)} ${toSymbol}`, 'Swap Completed');
}

// Add transaction to history
function addTransaction(transaction) {
    transactions.unshift(transaction);
    saveTransactionHistory();
    updateTransactionHistory();
}

// Update transaction history display
function updateTransactionHistory() {
    const transactionHistory = document.querySelector('.transaction-history');
    transactionHistory.innerHTML = '';
    
    // Show only last 5 transactions
    const recentTransactions = transactions.slice(0, 5);
    
    recentTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const isPositive = transaction.amount > 0;
        const iconColor = isPositive ? '#4caf50' : '#f44336';
        const iconClass = isPositive ? 'fa-arrow-down' : 'fa-arrow-up';
        const typeText = isPositive ? 'Received' : 'Sent';
        
        transactionItem.innerHTML = `
            <div class="transaction-details">
                <div class="transaction-icon" style="background-color: ${iconColor};">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="transaction-info">
                    <h4>${typeText} ${transaction.coin}</h4>
                    <p>${transaction.description}</p>
                </div>
            </div>
            <div class="transaction-amount">
                <div class="value" style="color: ${isPositive ? '#4caf50' : '#f44336'}">
                    ${isPositive ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()} ${transaction.coin}
                </div>
                <div class="status">Completed</div>
            </div>
        `;
        
        transactionHistory.appendChild(transactionItem);
    });
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
            <div class="coin-logo">
                <img src="${coin.logo}" alt="${coin.symbol}" onerror="this.src='https://cryptologos.cc/logos/tether-usdt-logo.png'">
            </div>
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
            <div class="coin-logo">
                <img src="${coin.logo}" alt="${coin.symbol}" onerror="this.src='https://cryptologos.cc/logos/tether-usdt-logo.png'">
            </div>
            <div class="coin-name">${coin.symbol}</div>
            <i class="fas fa-chevron-down"></i>
        `;
    } else {
        swapToCoin.innerHTML = `
            <div class="coin-logo">
                <img src="${coin.logo}" alt="${coin.symbol}" onerror="this.src='https://cryptologos.cc/logos/tether-usdt-logo.png'">
            </div>
            <div class="coin-name">${coin.symbol}</div>
            <i class="fas fa-chevron-down"></i>
        `;
    }
    
    coinSelectModal.style.display = 'none';
    calculateSwapToAmount();
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
    currentBlockchain = selected.dataset.chain;
    
    // Remove active class from all options
    selected.parentElement.querySelectorAll('.blockchain-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    selected.classList.add('active');
    
    // Update gas prices based on blockchain
    updateGasPrices();
}

// Select gas option
function selectGasOption(event) {
    const selected = event.currentTarget;
    const gasType = selected.querySelector('.gas-type').textContent.toLowerCase();
    currentGasOption = Object.keys(gasOptionsData).find(key => gasOptionsData[key].name.toLowerCase() === gasType);
    
    // Remove active class from all options
    selected.parentElement.querySelectorAll('.gas-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    selected.classList.add('active');
    
    // Update network fee display
    updateGasPrices();
}

// Update gas prices based on blockchain and selected option
function updateGasPrices() {
    const baseFee = blockchainNetworks[currentBlockchain].baseFee;
    const multiplier = gasOptionsData[currentGasOption].multiplier;
    const fee = baseFee * multiplier;
    
    feeAmount.textContent = `$${fee.toFixed(2)}`;
}

// Reset send form
function resetSendForm() {
    recipientAddress.value = '';
    sendAmount.value = '';
    sendMemo.value = '';
    clearValidationErrors();
}

// Reset fund form
function resetFundForm() {
    coinName.value = '';
    coinSymbol.value = '';
    coinLogoUrl.value = '';
    coinAmount.value = '';
    clearValidationErrors();
}

// Show success message
function showSuccess(message, title) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = message;
    successModal.style.display = 'flex';
}

// Show error message
function showError(message) {
    // Simple error display - in real app, use a proper notification system
    alert(`Error: ${message}`);
}

// Form validation functions
function validateAddress() {
    const address = recipientAddress.value.trim();
    if (address && !isValidAddress(address)) {
        showFieldError(recipientAddress, 'Invalid wallet address format');
    } else {
        clearFieldError(recipientAddress);
    }
}

function validateSendAmount() {
    const amount = parseFloat(sendAmount.value);
    if (amount && amount > usdtBalance) {
        showFieldError(sendAmount, 'Insufficient USDT balance');
    } else {
        clearFieldError(sendAmount);
    }
}

function validateFundForm() {
    // Basic validation for fund form
    const symbol = coinSymbol.value.trim();
    if (symbol && availableCoins.some(coin => coin.symbol === symbol.toUpperCase())) {
        showFieldError(coinSymbol, 'Coin symbol already exists');
    } else {
        clearFieldError(coinSymbol);
    }
}

function showFieldError(field, message) {
    field.classList.add('input-error');
    // In real app, show error message near the field
}

function clearFieldError(field) {
    field.classList.remove('input-error');
}

function clearValidationErrors() {
    const errorFields = document.querySelectorAll('.input-error');
    errorFields.forEach(field => field.classList.remove('input-error'));
}

// Save custom coins to localStorage
function saveCustomCoins() {
    localStorage.setItem('customCoins', JSON.stringify(customCoins));
}

// Load custom coins from localStorage
function loadCustomCoins() {
    const storedCoins = localStorage.getItem('customCoins');
    if (storedCoins) {
        const coins = JSON.parse(storedCoins);
        coins.forEach(coin => {
            if (!availableCoins.some(c => c.symbol === coin.symbol)) {
                availableCoins.push(coin);
            }
        });
    }
}

// Save transaction history to localStorage
function saveTransactionHistory() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Load transaction history from localStorage
function loadTransactionHistory() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
        updateTransactionHistory();
    }
}

// Add sample transactions for demo
function addSampleTransactions() {
    const sampleTransactions = [
        {
            id: Date.now() - 1000000,
            type: 'send',
            coin: 'USDT',
            amount: -1000,
            value: 1000,
            status: 'completed',
            timestamp: new Date(Date.now() - 86400000),
            description: 'Sent to 0x1a2b...3c4d · BSC'
        },
        {
            id: Date.now() - 2000000,
            type: 'swap',
            coin: 'USDT',
            amount: 2450,
            value: 2450,
            status: 'completed',
            timestamp: new Date(Date.now() - 172800000),
            description: 'Swapped BNB to USDT · PancakeSwap'
        },
        {
            id: Date.now() - 3000000,
            type: 'deposit',
            coin: 'USDT',
            amount: 5000,
            value: 5000,
            status: 'completed',
            timestamp: new Date(Date.now() - 259200000),
            description: 'Received from 0x5e6f...7g8h · Ethereum'
        }
    ];
    
    sampleTransactions.forEach(transaction => {
        transactions.push(transaction);
    });
    
    saveTransactionHistory();
    updateTransactionHistory();
}

// Start price updates simulation
function startPriceUpdates() {
    priceUpdateInterval = setInterval(updatePrices, 10000); // Update every 10 seconds
}

// Update prices randomly (for demo purposes)
function updatePrices() {
    availableCoins.forEach(coin => {
        if (coin.symbol !== 'USDT') {
            // Generate random price change between -2% and +2%
            const change = (Math.random() - 0.5) * 4;
            const oldPrice = coin.price;
            coin.price *= (1 + change / 100);
            coin.change = change;
            
            // Update PnL based on price change
            if (coin.balance > 0) {
                const valueChange = (coin.price - oldPrice) * coin.balance;
                coin.pnl += valueChange;
            }
        }
    });
    
    // Update displayed changes and PnL
    updatePnLDisplays();
    
    // Update wallet balance
    walletBalance = usdtBalance + 
                   bnbBalance * availableCoins.find(c => c.symbol === 'BNB').price +
                   trxBalance * availableCoins.find(c => c.symbol === 'TRX').price +
                   trumpBalance * availableCoins.find(c => c.symbol === 'TRUMP').price;
    
    updateBalanceDisplay();
}

// Update network status indicator
function updateNetworkStatus() {
    const isOnline = navigator.onLine;
    // In real app, update UI to show online/offline status
    console.log(`Network status: ${isOnline ? 'Online' : 'Offline'}`);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, slow down updates
        clearInterval(priceUpdateInterval);
    } else {
        // Page is visible, resume updates
        startPriceUpdates();
    }
});

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        formatNumber,
        calculatePriceImpact,
        isValidAddress,
        calculateTransactionFee
    };
}
