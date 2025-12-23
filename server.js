const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const EBAY_TOKEN = "v^1.1#i^1#r^0#f^0#p^1#I^3#t^H4sIAAAAAAAA/+VYa2wUVRTe7QsLtAoqb8syhRDFee/sY6BrlhZsK33uUqGA5O7MnXbo7Mw4c7fdEhPXVjGgguER9YemJMQHJBISEjQGQUBCjFEhgQhIrBTFmGgk0Uj0j3d2S9lWAkiX2MT9s7nnnHvuOd953blMqqj4kQ3VG/4ocY/L60sxqTy3m53AFBcVLijNz5tR6GKyBNx9qbmpgp78HxfZIK6ZYjO0TUO3oScZ13RbTBMriISliwawVVvUQRzaIpLESLhumchRjGhaBjIkQyM8NVUVBA94heMlyAYkzhuTBEzVr+mMGpgvAF4KMnzM7wuwQd6P+badgDW6jYCOKgiO4QSS5UiOj7JekfOKXpbivL5WwtMCLVs1dCxCMUQoba6Y3mtl2XpzU4FtQwthJUSoJrw00hCuqVpSH11EZ+kKDeIQQQAl7OGrSkOGnhagJeDNj7HT0mIkIUnQtgk6lDlhuFIxfM2YOzA/DTUnSYGYVwgoAu8DbDA3UC41rDhAN7fDoagyqaRFRagjFXXfClGMRmwdlNDgqh6rqKnyOH9NCaCpigqtCmLJ4vDKcGMjEYoCrR3UqRbZaBlyQkJhsrG5ihQgEwNeP4Ck4g34fZzADx6U0TYI84iTKg1dVh3QbE+9gRZDbDUciQ2bhQ0WatAbrLCCHIuy5XxDGDKtTlAzUUygdt2JK4xjIDzp5a0jMLQbIUuNJRAc0jCSkYaoggCmqcrESGY6FwfTJ2lXEO0ImSJNd3V1UV08ZVhtNMcwLL2ibllEaodxQGBZp9Yz8uqtN5Bq2hUJ4p22KqJuE9uSxLmKDdDbiJAgMKzfP4j7cLNCI6n/IGT5TA+viJxVCMCxUlgmACAnS34hFxUSGkxS2rEDxkA3GQdWB0SmBiRISjjPEnFoqbLIC7gRBhRIyr6gQnqDikLGBNlHsgqEDISxmBQM/J8K5XZTPQIlC6Kc5HrO8jxGN62v5tqrw1VxZUGwPRhtpuu9lpBsideZbK1V3dRstNKtTZ01oK3idqvhhs5XaipGJorPzwUATq3nDoRqw0ZQHpV7EckwYaOhqVL32Aowb8mNwELdEahpmDAqJ8OmWZObXp0z9/5lm7gzv3M3o/6j+XRDr2wnZceWV85+GysApko5E4iSjDjt1LoB8PXDIa9NW+25oeAIIRrT8MCSIIXnkhwDUgdlQSAbutY9KtxUfPMdU6hhPzMgqHLmykqlkaDsTgl7bBsJjIFNNTg3uKjRAXU8D5FlaBq0WthR94N4PIFATINjrTHkoEBUMMaGNev3+bzBYCAwurBJ6VG8dqy1NKeVF/S4wV1v580QaPGx5buZcRffUe/CJwc9/AEk5Er/2B73EabH/XGe280sYuax5cycovzlBfkTZ9gqgpQKFMpW23T8XW9BqgN2m0C18u53fXb6bH3ZR7Xvbrw0NfXCXHqrqzTr/aVvDTNt6AWmOJ+dkPUcw8y6zilk751awgksx/Gsl/N62Vam/Dq3gJ1S8ED0r9KLV6r2xjavOvb72okvF0146akSpmRIyO0udOFkcW18rHPf+BkPr5h8dcs9J77id5rHB+YdMrZfeN7a0HvmaKq3bOaun5J7px2rPgSfXL7nGfRKsGNZ//qTs3pO9BZMSjYXvpq8uPD1D74V6jsHdp4pCnz6/ZwdxbPPnj63el3vfdbM5zbXHi3Ne+2bA7u39729cP/WBQciX06ffun8O/suN08hx7WVlPa37J8xa+X5vf1L+1cf9B/+uWzO7JanO+afa9sG3uM/6b3w4aOXDsHKrwcmvl/4Xc+bb1Snfv1z35bPy/pde65OU9Z0vrix97dJ060nTnbWfpF/6pdVP5SeIuYfvjwwefxju/Tj5V2Pn7miuTY9tGZX5W5q2+odoaObjpSRnrfsB6lyefGzB2cnM7H8GxAYHlkZEwAA";



/* ===============================
   PRODUCT API (FAKE STORE)
================================ */

app.get("/api/product", async (req, res) => {
  const { itemId = 1 } = req.query; // default product id

  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${itemId}`
    );

    const product = response.data;

    // 🔥 Map Fake Store → Your UI format
    res.json({
      id: product.id,
      title: product.title,
      description: product.description,
      price: `${product.price} USD`,
      category: product.category,
      mainImage: product.image,
      images: [
        product.image,
        product.image,
        product.image
      ],
      itemGroupId: null, // Fake API has no variants
      variations: [],

      seller: {
        username: "Fake Store",
        feedbackScore: Math.floor(Math.random() * 5000),
        feedbackPercent: product.rating?.rate * 20 || 90
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});
/* ========== RELATED PRODUCTS API ========== */
app.get("/api/related-products", async (req, res) => {
  const { q = "shirt", limit = 8 } = req.query;

  try {
    const response = await axios.get(
      "https://api.ebay.com/buy/browse/v1/item_summary/search",
      {
        params: {
          q,
          limit
        },
        headers: {
          Authorization: `Bearer ${EBAY_TOKEN}`,
          "Content-Type": "application/json",
          "X-EBAY-C-MARKETPLACE-ID": "EBAY-US"
        }
      }
    );

    const items = response.data.itemSummaries || [];

    // 🔥 Format data exactly for your frontend UI
    const formattedProducts = items.map(item => ({
      id: item.itemId,
      image: item.image?.imageUrl || "",
      brand: item.brand || "eBay",
      price: item.price
        ? `${item.price.value} ${item.price.currency}`
        : "N/A",
      title: item.title,
      rating: item.seller?.feedbackPercentage
        ? (item.seller.feedbackPercentage / 20).toFixed(1)
        : "4.5",
      sold: item.itemLocation?.country
        ? `Ships from ${item.itemLocation.country}`
        : "Popular item"
    }));

    res.json(formattedProducts);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch related products" });
  }
});



/* ================= START SERVER ================= */
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});

