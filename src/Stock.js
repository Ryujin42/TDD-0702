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
    if (stock[articleName] === undefined)
    {
        throw new Error('Article not found');
    }

    return stock[articleName].quantity;
}

function consultLowQuantityFlagTrigger(articleName)
{
    return stock[articleName].lowQuantityFlagTrigger;
}

function consultLowQuantityFlag(articleName)
{
    return stock[articleName].lowQuantityFlag;
}

function consultOutOfStockFlag(articleName)
{
    return stock[articleName].outOfStockFlag;
}

function consultJson()
{
    return JSON.stringify(stock);
}

function setLowQuantityFlagTrigger(articleName, lowQuantityFlagTrigger)
{
    stock[articleName].lowQuantityFlagTrigger = lowQuantityFlagTrigger;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= lowQuantityFlagTrigger;

    return stock[articleName].lowQuantityFlagTrigger;
}

function addQuantity(articleName, quantity)
{
    if (quantity < 0)
    {
        throw new Error('Quantity must be positive');
    }

    stock[articleName].quantity += quantity;
    stock[articleName].lowQuantityFlag = quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    return stock[articleName].quantity;
}

function removeQuantity(articleName, quantity)
{
    if (quantity < 0)
    {
        throw new Error('Quantity must be positive');
    }

    if (stock[articleName].quantity < quantity)
    {
        throw new Error('Not enough quantity');
    }

    stock[articleName].quantity -= quantity;
    stock[articleName].lowQuantityFlag = quantity <= stock[articleName].lowQuantityFlagTrigger;
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
