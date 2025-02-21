const fs = require('fs');
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

function checkArticleName(articleName) {
    if (typeof articleName !== 'string') {
        throw new Error('Article name must be a string');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article not found');
    }
}

function checkQuantity(quantity) {
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0) {
        throw new Error('Quantity must be a positive integer');
    }
}

function writeHistory(action) {
    try {
        const date = new Date();
        fs.appendFileSync('history.log', `${date.toISOString()} - ${action}\n`);
        return 0;
    } catch (error) {
        return 1;
    }
}

function consultQuantity(articleName)
{
    checkArticleName(articleName);

    return stock[articleName].quantity;
}

function consultLowQuantityFlagTrigger(articleName)
{
    checkArticleName(articleName);

    return stock[articleName].lowQuantityFlagTrigger;
}

function consultLowQuantityFlag(articleName)
{
    checkArticleName(articleName);

    return stock[articleName].lowQuantityFlag;
}

function consultOutOfStockFlag(articleName)
{
    checkArticleName(articleName);

    return stock[articleName].outOfStockFlag;
}

function consultJson()
{
    return JSON.stringify(stock);
}

function setLowQuantityFlagTrigger(articleName, lowQuantityFlagTrigger)
{
    checkArticleName(articleName);

    if (typeof lowQuantityFlagTrigger !== 'number' || !Number.isInteger(lowQuantityFlagTrigger) || lowQuantityFlagTrigger < 0) {
        throw new Error('Low quantity flag trigger must be an integer');
    }

    if (lowQuantityFlagTrigger < 0) {
        throw new Error('Low quantity flag trigger must be positive');
    }

    stock[articleName].lowQuantityFlagTrigger = lowQuantityFlagTrigger;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= lowQuantityFlagTrigger;

    return `Low quantity flag trigger for article ${articleName} set to ${lowQuantityFlagTrigger}`;
}

function addQuantity(articleName, quantity)
{
    checkArticleName(articleName);
    checkQuantity(quantity);

    stock[articleName].quantity += quantity;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    message = `Added ${quantity} to article ${articleName}`;

    if (stock[articleName].lowQuantityFlag) {
        message += '\n[WARNING] Low quantity flag triggered';
    }

    if (writeHistory(`Added ${quantity} to article ${articleName}`) === 1) {
        message += '\n[WARNING] Could not write to history.log';
    }

    return message;
}

function removeQuantity(articleName, quantity)
{
    checkArticleName(articleName);
    checkQuantity(quantity);

    if (stock[articleName].quantity < quantity) {
        throw new Error('Not enough quantity');
    }

    stock[articleName].quantity -= quantity;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    message = `Removed ${quantity} from article ${articleName}`;

    if (stock[articleName].lowQuantityFlag) {
        message += '\n[WARNING] Low quantity flag triggered';
    }

    if (writeHistory(`Removed ${quantity} from article ${articleName}`) === 1) {
        message += '\n[WARNING] Could not write to history.log';
    }

    return message;
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
