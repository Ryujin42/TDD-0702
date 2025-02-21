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
const history = [];

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

function consultQuantity(articleName)
{
    checkArticleName(articleName);
    history.push({
        "date": new Date().toISOString(),
        "operation": "consultQuantity",
        "articleName": articleName,
    });

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

    return stock[articleName].lowQuantityFlagTrigger;
}

function addQuantity(articleName, quantity)
{
    checkArticleName(articleName);
    checkQuantity(quantity);

    stock[articleName].quantity += quantity;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    history.push({
        "date": new Date().toISOString(),
        "operation": "addQuantity",
        "articleName": articleName,
        "quantity": quantity,
    });

    return stock[articleName].quantity;
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

    history.push({
        "date": new Date().toISOString(),
        "operation": "removeQuantity",
        "articleName": articleName,
        "quantity": quantity,
    });

    return stock[articleName].quantity;
}

function consultHistory()
{
    return history;
}

// test with some commands
addQuantity("Clavier", 10);
addQuantity("Souris", 5);
addQuantity("Ecran", 3);
addQuantity("Clé USB", 1);
removeQuantity("Clavier", 2);
addQuantity("Clavier", 3);
removeQuantity("Clavier", 1);
addQuantity("Clavier", 5);
addQuantity("Clavier", 1);
removeQuantity("Clavier", 2);
console.log(consultJson());
console.log(consultHistory());

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
