const Article = require('./Article');

const warehouse = {
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
    if (warehouse[articleName] === undefined)
    {
        throw new Error('Article not found');
    }

    return warehouse[articleName].quantity;
}

function consultLowQuantityFlagTrigger(articleName)
{
    return warehouse[articleName].lowQuantityFlagTrigger;
}

function consultLowQuantityFlag(articleName)
{
    return warehouse[articleName].lowQuantityFlag;
}

function consultOutOfStockFlag(articleName)
{
    return warehouse[articleName].outOfStockFlag;
}

function consultJson()
{
    return JSON.stringify(warehouse);
}

function setLowQuantityFlagTrigger(articleName, lowQuantityFlagTrigger)
{
    warehouse[articleName].lowQuantityFlagTrigger = lowQuantityFlagTrigger;
    warehouse[articleName].lowQuantityFlag = warehouse[articleName].quantity <= lowQuantityFlagTrigger;

    return warehouse[articleName].lowQuantityFlagTrigger;
}

function addQuantity(articleName, quantity)
{
    if (quantity < 0)
    {
        throw new Error('Quantity must be positive');
    }

    warehouse[articleName].quantity += quantity;
    warehouse[articleName].lowQuantityFlag = quantity <= warehouse[articleName].lowQuantityFlagTrigger;
    warehouse[articleName].outOfStockFlag = warehouse[articleName].quantity === 0;

    return warehouse[articleName].quantity;
}

function removeQuantity(articleName, quantity)
{
    if (quantity < 0)
    {
        throw new Error('Quantity must be positive');
    }

    if (warehouse[articleName].quantity < quantity)
    {
        throw new Error('Not enough quantity');
    }

    warehouse[articleName].quantity -= quantity;
    warehouse[articleName].lowQuantityFlag = quantity <= warehouse[articleName].lowQuantityFlagTrigger;
    warehouse[articleName].outOfStockFlag = warehouse[articleName].quantity === 0;

    return warehouse[articleName].quantity;
}

module.exports = Warehouse;
