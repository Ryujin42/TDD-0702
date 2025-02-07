const { addQuantity,
    consultQuantity,
    removeQuantity, consultJson,
    consultLowQuantityFlag,
    consultOutOfStockFlag
} = require("../src/Stock");

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
        expect(() => addQuantity("Clavier", -5)).toThrow("Quantity must be positive");
    });

    test("Ajout d'une quantité float : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", 3.5)).toThrow("Quantity must be positive");
    });

    test("Ajout d'une quantité non valide (texte) : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", "dix")).toThrow("Quantity must be positive");
    });

    test("Ajout d'une quantité null ou undefined : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", null)).toThrow("Quantity must be positive");
        expect(() => addQuantity("Clavier", undefined)).toThrow("Quantity must be positive");
    });
});

describe("Consultation de la quantité d'un article", () => {
    test("Article existant : doit retourner la quantité correcte", () => {
        addQuantity("Écran", 7);
        expect(consultQuantity("Écran")).toBe(7);
        expect(consultLowQuantityFlag("Écran").toBe(true));
        expect(consultOutOfStockFlag("Écran").toBe(false));
    });

    test("Article inexistant : doit générer une erreur", () => {
        expect(() => consultQuantity("Tablette")).toThrow("Article not found");
    });
});

describe("Retrait de quantité d'un article", () => {
    test("Retrait valide : la quantité doit être mise à jour", () => {
        //Je dois ajouter de la quantité pour éviter d'être bloqué par la fonctione si je retire du stock dans le négatif
        addQuantity("Casque", 12);
        const previousStock = consultQuantity("Clavier");
        removeQuantity("Casque", 5);
        expect(consultQuantity("Casque")).toBe(previousStock-5);
    });

    test("Retrait d'un article inexistant : doit générer une erreur", () => {
        expect(() => removeQuantity("Imprimante", 3)).toThrow("Article not found");
    });

    test("Retrait d'une quantité supérieure au stock disponible : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", 100)).toThrow("Not enough quantity");
    });

    test("Retrait d'une quantité négative : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", -2)).toThrow("Quantity must be positive");
    });

    test("Retrait d'une quantité non entière (nombre à virgule) : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", 2.5)).toThrow("Quantity must be positive");
    });

    test("Retrait d'une quantité non valide (texte) : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", "cinq")).toThrow("Quantity must be positive");
    });

    test("Retrait d'une quantité null ou undefined : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", null)).toThrow("Quantity must be positive");
        expect(() => removeQuantity("Clé USB", undefined)).toThrow("Quantity must be positive");
    });
});

describe("Consultation du rapport de tous les articles", () => {
    test("Affichage de tous les stocks", () => {
        addQuantity("Écran", 7);
        addQuantity("Clé USB", 10);
        addQuantity("Souris", 11);
        expect(consultJson().toBe({"Clavier":{"quantity":0,"lowQuantityFlagTrigger":10,"lowQuantityFlag":true,"outOfStockFlag":true},"Souris":{"quantity":11,"lowQuantityFlagTrigger":10,"lowQuantityFlag":false,"outOfStockFlag":false},"Ecran":{"quantity":7,"lowQuantityFlagTrigger":10,"lowQuantityFlag":true,"outOfStockFlag":false},"Clé USB":{"quantity":10,"lowQuantityFlagTrigger":10,"lowQuantityFlag":true,"outOfStockFlag":false}}))
        // expect(consultQuantity("Écran")).toBe(7);
        // expect(consultQuantity("Clé USB")).toBe(10);
        // expect(consultQuantity("Souris")).toBe(11);
        // expect(consultQuantity("Clavier")).toBe(0);
        // expect(consultFlagLowQuantity("Écran").toBe(true));
        // expect(consultFlagOutOfStock("Écran").toBe(false));
        // expect(consultFlagLowQuantity("Clé USB").toBe(true));
        // expect(consultFlagOutOfStock("Clé USB").toBe(false));
        // expect(consultFlagLowQuantity("Souris").toBe(false));
        // expect(consultFlagOutOfStock("Souris").toBe(false));
        // expect(consultFlagLowQuantity("Clavier").toBe(true));
        // expect(consultFlagOutOfStock("Clavier").toBe(true));
    });
});
});