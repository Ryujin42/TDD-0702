const Article = require("../src/Article");
const { addQuantity } = require("../src/Article");
const { consultQuantity} = require("../src/Article")
const { removeQuantity} = require("../src/Article")

describe("Ajout de quantité à un article", () => {
    test("Ajout valide : la quantité doit être mise à jour", () => {
        const previousStock = consultQuantity("Clavier");
        addQuantity("Clavier", 10);
        expect(consultQuantity("Clavier")).toBe(previousStock + 10);
    });

    test("Ajout à un article inexistant : doit générer une erreur", () => {
        expect(() => addQuantity("Souris", 5)).toThrow("L'article Souris n'existe pas !");
    });

    test("Ajout d'une quantité négative : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", -5)).toThrow("La quantité doit être un entier positif !");
    });

    test("Ajout d'une quantité non entière (nombre à virgule) : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", 3.5)).toThrow("La quantité doit être un entier positif !");
    });

    test("Ajout d'une quantité non valide (texte) : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", "dix")).toThrow("La quantité doit être un entier positif !");
    });

    test("Ajout d'une quantité null ou undefined : doit générer une erreur", () => {
        expect(() => addQuantity("Clavier", null)).toThrow("La quantité doit être un entier positif !");
        expect(() => addQuantity("Clavier", undefined)).toThrow("La quantité doit être un entier positif !");
    });
});

describe("Consultation de la quantité d'un article", () => {
    test("Article existant : doit retourner la quantité correcte", () => {
        addQuantity("Écran", 7);
        expect(consultQuantity("Écran")).toBe(7);
    });

    test("Article inexistant : doit générer une erreur", () => {
        expect(() => consultQuantity("Tablette")).toThrow("L'article Tablette n'existe pas !");
    });
});

describe("Retrait de quantité d'un article", () => {
    test("Retrait valide : la quantité doit être mise à jour", () => {
        addQuantity("Casque", 12);
        removeQuantity("Casque", 5);
        expect(consultQuantity("Casque")).toBe(7);
    });

    test("Retrait d'un article inexistant : doit générer une erreur", () => {
        expect(() => removeQuantity("Imprimante", 3)).toThrow("L'article Imprimante n'existe pas !");
    });

    test("Retrait d'une quantité supérieure au stock disponible : doit générer une erreur", () => {
        addQuantity("Clé USB", 4);
        expect(() => removeQuantity("Clé USB", 10)).toThrow("Stock insuffisant pour l'article Clé USB !");
    });

    test("Retrait d'une quantité négative : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", -2)).toThrow("La quantité doit être un entier positif !");
    });

    test("Retrait d'une quantité non entière (nombre à virgule) : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", 2.5)).toThrow("La quantité doit être un entier positif !");
    });

    test("Retrait d'une quantité non valide (texte) : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", "cinq")).toThrow("La quantité doit être un entier positif !");
    });

    test("Retrait d'une quantité null ou undefined : doit générer une erreur", () => {
        expect(() => removeQuantity("Clé USB", null)).toThrow("La quantité doit être un entier positif !");
        expect(() => removeQuantity("Clé USB", undefined)).toThrow("La quantité doit être un entier positif !");
    });
});
});