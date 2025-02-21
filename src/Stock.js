const Article = require('./Article');

const stock = {
    "Clavier": {
        "quantity": 0,
        "lowQuantityFlagTrigger": 10,
        "lowQuantityFlag": true,
        "outOfStockFlag": true
    },
    "Souris": {
        "quantity": 0,
        "lowQuantityFlagTrigger": 10,
        "lowQuantityFlag": true,
        "outOfStockFlag": true
    },
    "Ecran": {
        "quantity": 0,
        "lowQuantityFlagTrigger": 10,
        "lowQuantityFlag": true,
        "outOfStockFlag": true
    },
    "Clé USB": {
        "quantity": 0,
        "lowQuantityFlagTrigger": 10,
        "lowQuantityFlag": true,
        "outOfStockFlag": true
    },
}

function consultQuantity(articleName)
{
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }

    return stock[articleName].quantity;
}

function consultLowQuantityFlagTrigger(articleName)
{
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }

    return stock[articleName].lowQuantityFlagTrigger;
}

function consultLowQuantityFlag(articleName)
{
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }

    return stock[articleName].lowQuantityFlag;
}

function consultOutOfStockFlag(articleName)
{
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }

    return stock[articleName].outOfStockFlag;
}

function consultJson()
{
    return JSON.stringify(stock);
}

function setLowQuantityFlagTrigger(articleName, lowQuantityFlagTrigger)
{
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }

    if (typeof lowQuantityFlagTrigger !== 'number' || !Number.isInteger(lowQuantityFlagTrigger) || lowQuantityFlagTrigger < 0) {
        throw new Error('Low quantity flag trigger must be an integer');
    }

    if (lowQuantityFlagTrigger < 0) {
        throw new Error('Low quantity flag trigger must be positive');
    }

    stock[articleName].lowQuantityFlagTrigger = lowQuantityFlagTrigger;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= lowQuantityFlagTrigger;

    return stock[articleName].lowQuantityFlagTrigger;
}

function addQuantity(articleName, quantity)
{
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0) {
        throw new Error('Quantity must be a positive integer');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }

    stock[articleName].quantity += quantity;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    return stock[articleName].quantity;
}

function removeQuantity(articleName, quantity)
{
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0) {
        throw new Error('Quantity must be a positive integer');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }

    if (stock[articleName].quantity < quantity) {
        throw new Error('Not enough quantity');
    }

    stock[articleName].quantity -= quantity;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    return stock[articleName].quantity;
}

module.exports = {
    consultQuantity,
    consultLowQuantityFlagTrigger,
    consultLowQuantityFlag,
    consultOutOfStockFlag,
    consultJson,
    setLowQuantityFlagTrigger,
    addQuantity,
    removeQuantity
};
