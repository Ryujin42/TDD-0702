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
        throw new Error('Le nom de l\'article doit être une chaîne de caractères');
    }

    if (stock[articleName] === undefined) {
        throw new Error('Article introuvable');
    }
}

function checkQuantity(quantity) {
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0) {
        throw new Error('La quantité doit être un entier positif');
    }
}

function writeHistory(action) {
    try {
        const date = new Date();
        const formattedDate = date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        fs.appendFileSync('history.log', `${formattedDate} - ${action}\n`);
        return 0;
    } catch (error) {
        return 1;
    }
}

function consultQuantity(articleName) {
    checkArticleName(articleName);
    return stock[articleName].quantity;
}

function consultLowQuantityFlagTrigger(articleName) {
    checkArticleName(articleName);
    return stock[articleName].lowQuantityFlagTrigger;
}

function consultLowQuantityFlag(articleName) {
    checkArticleName(articleName);
    return stock[articleName].lowQuantityFlag;
}

function consultOutOfStockFlag(articleName) {
    checkArticleName(articleName);
    return stock[articleName].outOfStockFlag;
}

function consultJson() {
    return JSON.stringify(stock);
}

function setLowQuantityFlagTrigger(articleName, lowQuantityFlagTrigger) {
    checkArticleName(articleName);

    if (typeof lowQuantityFlagTrigger !== 'number' || !Number.isInteger(lowQuantityFlagTrigger) || lowQuantityFlagTrigger < 0) {
        throw new Error('Le déclencheur de drapeau de faible quantité doit être un entier');
    }

    if (lowQuantityFlagTrigger < 0) {
        throw new Error('Le déclencheur de drapeau de faible quantité doit être positif');
    }

    stock[articleName].lowQuantityFlagTrigger = lowQuantityFlagTrigger;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= lowQuantityFlagTrigger;

    return `Déclencheur de drapeau de faible quantité pour l'article ${articleName} défini à ${lowQuantityFlagTrigger}`;
}

function addQuantity(articleName, quantity) {
    checkArticleName(articleName);
    checkQuantity(quantity);

    stock[articleName].quantity += quantity;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    let message = `Ajout de ${quantity} à l'article ${articleName}`;

    if (stock[articleName].lowQuantityFlag) {
        message += '\n[AVERTISSEMENT] Article en faible quantité !';
    }

    if (writeHistory(`Ajout de ${quantity} à l'article ${articleName}`) === 1) {
        message += '\n[AVERTISSEMENT] Impossible d\'écrire dans history.log';
    }

    return message;
}

function removeQuantity(articleName, quantity) {
    checkArticleName(articleName);
    checkQuantity(quantity);

    if (stock[articleName].quantity < quantity) {
        throw new Error('Quantité insuffisante');
    }

    stock[articleName].quantity -= quantity;
    stock[articleName].lowQuantityFlag = stock[articleName].quantity <= stock[articleName].lowQuantityFlagTrigger;
    stock[articleName].outOfStockFlag = stock[articleName].quantity === 0;

    let message = `Retrait de ${quantity} de l'article ${articleName}`;

    if (stock[articleName].lowQuantityFlag) {
        message += '\n[AVERTISSEMENT] Article en faible quantité !';
    }

    if (writeHistory(`Retrait de ${quantity} de l'article ${articleName}`) === 1) {
        message += '\n[AVERTISSEMENT] Impossible d\'écrire dans history.log';
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
    removeQuantity,
    writeHistory
};

