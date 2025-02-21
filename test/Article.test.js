const { addQuantity,
    consultQuantity,
    removeQuantity, consultJson,
    consultLowQuantityFlag,
    consultOutOfStockFlag,
    writeHistory
} = require("../src/Stock");
const fs = require('fs');


describe("Gestion des stocks", () => {
    
    beforeEach(() => {
        // Réinitialisation du stock avant chaque test pour être plus à l'aise dans mes tests et manipulations de quantités
        stock = {
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
    });

describe("Ajout de quantité à un article", () => {
    test("Ajout valide : la quantité doit être mise à jour", () => {
        const previousStock = consultQuantity("Clavier");
        addQuantity("Clavier", 10);
        expect(consultQuantity("Clavier")).toBe(previousStock + 10);
    });


    test("Ajout à un article inexistant : doit générer une erreur", () => {
        expect(() => addQuantity("Casque", 5)).toThrow("Article not found");
    });

    test("Ajout d'une quantité négative : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", -5)).toThrow("Quantity must be a positive integer");
    });

    test("Ajout d'une quantité float : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", 3.5)).toThrow("Quantity must be a positive integer");
    });

    test("Ajout d'une quantité non valide (texte) : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", "dix")).toThrow("Quantity must be a positive integer");
    });

    test("Ajout d'une quantité null ou undefined : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", null)).toThrow("Quantity must be a positive integer");
        expect(() => addQuantity("Clavier", undefined)).toThrow("Quantity must be a positive integer");
    });
});

describe("Consultation de la quantité d'un article", () => {
    test("Article existant : doit retourner la quantité correcte", () => {
        addQuantity("Ecran", 7);
        expect(consultQuantity("Ecran")).toBe(7);
        expect(consultLowQuantityFlag("Ecran")).toBe(true);
        expect(consultOutOfStockFlag("Ecran")).toBe(false);
    });

    test("Article inexistant : doit générer une erreur", () => {
        expect(() => consultQuantity("Tablette")).toThrow("Article not found");
    });
});

describe("Retrait de quantité d'un article", () => {
    test("Retrait valide : la quantité doit être mise à jour", () => {
        //Je dois ajouter de la quantité pour éviter d'être bloqué par la fonctione si je retire du stock dans le négatif
        addQuantity("Clavier", 12);
        const previousStock = consultQuantity("Clavier");
        removeQuantity("Clavier", 5);
        expect(consultQuantity("Clavier")).toBe(previousStock-5);
    });

    test("Retrait d'un article inexistant : doit générer une erreur", () => {
        expect(() => removeQuantity("Imprimante", 3)).toThrow("Article not found");
    });

    test("Retrait d'une quantité supérieure au stock disponible : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", 100)).toThrow("Not enough quantity");
    });

    test("Retrait d'une quantité négative : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", -2)).toThrow("Quantity must be a positive integer");
    });

    test("Retrait d'une quantité non entière (nombre à virgule) : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", 2.5)).toThrow("Quantity must be a positive integer");
    });

    test("Retrait d'une quantité non valide (texte) : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", "cinq")).toThrow("Quantity must be a positive integer");
    });

    test("Retrait d'une quantité null ou undefined : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", null)).toThrow("Quantity must be a positive integer");
        expect(() => removeQuantity("Clé USB", undefined)).toThrow("Quantity must be a positive integer");
    });
});

describe("Consultation du rapport de tous les articles", () => {
    test("Affichage de tous les stocks", () => {
        removeQuantity("Clavier", 27);
        addQuantity("Clé USB", 10);
        addQuantity("Souris", 11);
        expect(consultJson()).toBe(`{"Clavier":{"quantity":0,"lowQuantityFlagTrigger":10,"lowQuantityFlag":true,"outOfStockFlag":true},"Souris":{"quantity":11,"lowQuantityFlagTrigger":10,"lowQuantityFlag":false,"outOfStockFlag":false},"Ecran":{"quantity":7,"lowQuantityFlagTrigger":10,"lowQuantityFlag":true,"outOfStockFlag":false},"Clé USB":{"quantity":10,"lowQuantityFlagTrigger":10,"lowQuantityFlag":true,"outOfStockFlag":false}}`)
    });
});
describe("Écriture de l'historique", () => {
    test("Écriture réussie : doit retourner 0", () => {
        const result = writeHistory("Test action");
        expect(result).toBe(0);
    });

    test("Écriture échouée : doit retourner 1", () => {
        const originalAppendFileSync = fs.appendFileSync;
        fs.appendFileSync = jest.fn(() => { throw new Error("Write error"); });

        const result = writeHistory("Test action");
        expect(result).toBe(1);

        fs.appendFileSync = originalAppendFileSync;
    });
});
describe("Messages de la fonction addQuantity", () => {
    test("Message de confirmation d'ajout", () => {
        const message = addQuantity("Clavier", 10);
        expect(message).toContain("Added 10 to article Clavier");
    });

    test("Message d'avertissement de faible quantité", () => {
        removeQuantity("Clavier", 10);
        addQuantity("Clavier", 5);
        const message = addQuantity("Clavier", 5);
        expect(message).toContain("[WARNING] Low quantity flag triggered");
    });

    test("Message d'erreur d'écriture dans l'historique", () => {
        const originalAppendFileSync = fs.appendFileSync;
        fs.appendFileSync = jest.fn(() => { throw new Error("Write error"); });

        const message = addQuantity("Clavier", 10);
        expect(message).toContain("[WARNING] Could not write to history.log");

        fs.appendFileSync = originalAppendFileSync;
    });
});
describe("Messages de la fonction removeQuantity", () => {
    test("Message de confirmation de retrait", () => {
        addQuantity("Souris", 15);
        const message = removeQuantity("Souris", 5);
        expect(message).toContain("Removed 5 from article Souris");
    });

    test("Message d'avertissement de faible quantité", () => {
        removeQuantity("Souris", 10);
        const message = removeQuantity("Souris", 4);
        expect(message).toContain("[WARNING] Low quantity flag triggered");
    });

    test("Message d'erreur d'écriture dans l'historique", () => {
        const originalAppendFileSync = fs.appendFileSync;
        fs.appendFileSync = jest.fn(() => { throw new Error("Write error"); });

        addQuantity("Souris", 15);
        const message = removeQuantity("Souris", 5);
        expect(message).toContain("[WARNING] Could not write to history.log");

        fs.appendFileSync = originalAppendFileSync;
    });
});

});