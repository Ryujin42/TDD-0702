class Article
{
    constructor(name, quantity, lowQuantity = 10)
    {
        this.name = name;
        this.quantity = quantity;
        this.lowQuantity = lowQuantity;
        this.lowQuantityFlag = quantity <= lowQuantity;
        this.outOfStockFlag = quantity === 0;
    }
}

module.exports = Article;
