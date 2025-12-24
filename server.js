const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const EBAY_TOKEN = "v^1.1#i^1#r^0#I^3#p^1#f^0#t^H4sIAAAAAAAA/+VYe2wURRi/64OmVCARYitROJcW0eb2dbe3d2t75UohPaTPO2ttRDK7O9cu3dtddufaHlJy1ohvQhA0BhPKP1AaNcE0hIASo7EqiDEmJGqQYBBDgBAkQWKM0dm7Uq6VANIjNvH+ucw333zz/X7zPWaHTs0ofnRT/aars5xFeYMpOpXndDIldPGMwsrZ+XnzCx10loJzMFWeKhjIP1tlgbhqCK3QMnTNgq6+uKpZQlpYTSRMTdCBpViCBuLQEpAkREINqwSWpAXD1JEu6SrhCtdVExwHeI/MBHw0443xXh+WatdsRnU8TwOPH7Ie3s9wgPbLeN6yEjCsWQhoqJpgaZZzM6yb9UZpXvB4BZYnOU+gg3C1QdNSdA2rkDQRTLsrpNeaWb7e3FVgWdBE2AgRDIdWRJpC4brljdEqKstWcIyHCAIoYU0cLdNl6GoDagLefBsrrS1EEpIELYuggpkdJhoVQtecuQP301SLPtYTYBm/SAO/T5bpnFC5QjfjAN3cD1uiyO5YWlWAGlJQ8laMYjbEtVBCY6NGbCJc57L/WhJAVWIKNKuJ5bWhp0LNzUQwCtQu0KCY7mZTlxMSCrmbW+vcHKRF4OUBdMe8ft7Hcp6xjTLWxmietNMyXZMVmzTL1aijWoi9hpO5YbO4wUpNWpMZiiHbo2y9wDiH3g77UDOnmEBdmn2uMI6JcKWHtz6B8dUImYqYQHDcwuSJNEXVBDAMRSYmT6ZjcSx8+qxqogshQ6Co3t5estdD6mYnxdI0Q7U3rIpIXTAOCKxr53pGX7n1AreShiJBvNJSBJQ0sC99OFaxA1onEeQ4muH5Md4nuhWcLP2HIAszNTEjcpYhspcBokQzkA/4fDyXiwwJjgUpZfsBRZB0x4HZDZGhAgm6JRxniTg0FVnwcDHW449Bt+wLxNzeQCzmFjnZ52ZiENIQiqIU8P+fEuV2Qz0CJROinMR6zuJcpFrW17Nd9aG6eKwy0BWItlKNXpPra4s3GMxKs76lVe+gOlp6wqCz+naz4Ybgl6kKZiaK988FAXau546Eet1CUJ4SvIikG7BZVxUpOb0O2GPKzcBEyQhUVSyYEsiQYYRzU6tzBu9flok7w527HvUf9acborLskJ1eqOz1FjYADIW0OxAp6XHKznUd4OuHLV6T9tp1Q8VJShSW4YYlQRL3JVkEUjdpQiDrmpqcEm8KvvlOK9YwzgwJipy5spJpJkirR8KILT2BObDIJvsGF9W7oYb7ITJ1VYVmGzPlehCPJxAQVTjdCkMOEkQB06xZM7zPx/kYfOGbEi4p3YrXTLeSZpfyggEnuOvlvBUCNT69sBsZuPiOehc+OaiJDyBBR/rHDDg/oQech/OcTrqKrmAW0Q/NyH+iIP+e+ZaCIKmAGGkpnRr+rjch2Q2TBlDMvLmOI8e/b1xwaOXQyz+Xpl4op7Y6Zme9vwyupsvGX2CK85mSrOcY+oHrM4XMnNJZLMewrJfmPV6W76AXXZ8tYO4rmPf1SM3IyqHPB5oLN3134XJP09Mj61fTs8aVnM5CBw4WR9Fbp98brdnft/bghmVXm54ZmCtuvnB0uP+ryjda25e8e37m0s7Gk6U7ueEXvy3rh63KAhGMvu+oOPijsPv1S7vvX7fv1c3tlTXSs5cD6poTJ9sfqyL6do3Sb/LG87+07WVrH/+r84Jc07H9yNGlryx5Kbi6f2Htnt9D6M9dHn1ddND1cGrLmavySKRCr9w2OG+481jB8bNzLhbvKFv0TcUXG0+daTh/hd3569Dikg/LT5wLv1Z17tBGx4Hnivbsi24I9aCi8u0Lt/3Wf/GzYyWLd1xiF/+w98TmL5Mu6vSnlUrZT8NL3zlV/OTo81cevHfowMythz84+nEqfGx+WZGFPvpjzqhaumX/I3TX25mz/BsVkXhOGRMAAA==";



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



