class Warehouse
{
    constructor(articleSet, lowQuantity = 10)
    {
        this.articleSet = articleSet;
        this.lowQuantity = lowQuantity;
    }

    getQuantity(articleName)
    {
        return this.articleSet[articleName].quantity;
    }

    getLowQuantityFlag(articleName)
    {
        return this.articleSet[articleName].lowQuantityFlag;
    }

    getOutOfStockFlag(articleName)
    {
        return this.articleSet[articleName].outOfStockFlag;
    }

    getJson()
    {
        return JSON.stringify(this.articleSet);
    }

    addQuantity(articleName, quantity)
    {
        if (quantity < 0)
        {
            throw new Error('Quantity must be positive');
        }

        this.articleSet[articleName].quantity += quantity;
        this.articleSet[articleName].lowQuantityFlag = quantity <= this.lowQuantity;
        this.articleSet[articleName].outOfStockFlag = false;

        return this.articleSet[articleName].quantity;
    }

    removeQuantity(articleName, quantity)
    {
        if (quantity < 0)
        {
            throw new Error('Quantity must be positive');
        }

        if (this.articleSet[articleName].quantity < quantity)
        {
            throw new Error('Not enough quantity');
        }

        this.articleSet[articleName].quantity -= quantity;
        this.articleSet[articleName].lowQuantityFlag = quantity <= this.lowQuantity;
        this.articleSet[articleName].outOfStockFlag = this.articleSet[articleName].quantity === 0;

        return this.articleSet[articleName].quantity;
    }
}

warehouse = new Warehouse({
    'Clavier': {
        quantity: 0,
        lowQuantityFlag: true,
        outOfStockFlag: true
    },
    'Souris': {
        quantity: 0,
        lowQuantityFlag: true,
        outOfStockFlag: true
    },
    'Écran': {
        quantity: 0,
        lowQuantityFlag: true,
        outOfStockFlag: true
    },
    'Clé USB': {
        quantity: 0,
        lowQuantityFlag: true,
        outOfStockFlag: true
    }
});

module.exports = Warehouse;
