const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const EBAY_TOKEN = "v^1.1#i^1#I^3#r^0#p^1#f^0#t^H4sIAAAAAAAA/+VYe2wURRi/6wNSsQgBLSDKsUBMhNvbx+1db8NdclCkV+jzSoUzPOZ2Z3tr95WdPdqDKKUCCRaDAf4gUWilREEBE/9AFCVKFE0hBk2QRzAxVoMKERNQjKI4e1fKtRJAesQm3j+X+eabb77fb77H7FCtw4oeX1e+7kqxc3heZyvVmud00iOoomGF00fm500odFBZCs7O1qmtBW35389EQFUMvg4iQ9cQdLWoiob4tDBIJE2N1wGSEa8BFSLeEvhouHI+z5AUb5i6pQu6QrgiZUEi4OO4OCVKAZGF0Ct5sVS7brNeDxI+P/QBUeAgAwS/L87heYSSMKIhC2hWkGAohnPTjJth62kvz7I8w5B+jo0RrgZoIlnXsApJEaG0u3x6rZnl661dBQhB08JGiFAk/ES0Ohwpm1NVP9OTZSvUy0PUAlYS9R/N1kXoagBKEt56G5TW5qNJQYAIEZ5QZof+RvnwdWfuwv001V5RFKRSPwxIAhTEUn9OqHxCN1Vg3doPWyKLbimtykPNkq3U7RjFbMSfhoLVO6rCJiJlLvuvNgkUWZKhGSTmzAovCtfUEKF6oCRApWy6a0xdTApW2F1TV+bmIBUHXj+Abslb6vcxHNu7UcZaL80Ddpqta6Jsk4ZcVbo1C2Kv4UBumCxusFK1Vm2GJcv2KFvPd51Db2nMPtTMKSathGafK1QxEa708PYn0Lfaskw5nrRgn4WBE2mKggQwDFkkBk6mY7E3fFpQkEhYlsF7PM3NzWQzS+pmo4ehKNqzsHJ+VEhAFRBY1871jL58+wVuOQ1FgHglknkrZWBfWnCsYge0RiLEcRTt9/fy3t+t0EDpPwRZmD39MyJXGeITAl6JowJAZDkfw0i5yJBQb5B6bD9gHKTcKjCboGUoQIBuAcdZUoWmLPIsJzFsqQTdoi8gub0BSXLHOdHnpiUIKQjjcSFQ+n9KlDsN9SgUTGjlJNZzFudxT+2KciZRHi5TpemBRKC+zlPlNbmWBrXSoCvM8to6PeaJ1S6PgMbgnWbDTcHPVmTMTD3ePxcE2LmeOxLKdWRBcVDwooJuwBpdkYXU0Dpg1hRrgGmlolBRsGBQIMOGEclNrc4ZvH9ZJu4Od+561H/Un26KCtkhO7RQ2esRNgAMmbQ7ECnoqsfOdR3g64ctXpr22nVTxQFKHizDDUuAJO5LYhwITaQJgahrSmpQvMn45jukWMM4MyTIYubKSqaZINFyASNGehJzgMhq+wZXrzdBDfdDy9QVBZoN9KDrgaomLRBX4FArDDlIEBkMsWZN+30+jqK8FDMoXEK6FS8daiXNLuUFbU5wz8t5HQSKOrSwGxm4+I56Dz45PP0fQEKO9I9ucx6m2pyH8pxOaiY1jZ5CTR6Wv6Ag//4JSLYgKQOJRHKjhr/rTUg2wZQBZDNvjKP7xOmqRw9W7Fr/bUnr2qmeTY6RWe8vnYupcX0vMEX59Iis5xhq4o2ZQvqBkmKGoxmGpb0syzAxasqN2QL6oYKxXc8tu6wOa1t5btqOpU2jVureHcfOUsV9Sk5noQMHi8Px6ZqezR/OWHL5nNRxbMwl158lG7/cPfXBUe8sXPLrlOIu5ZWOZ/9Yct9iZtWpAynyl+69R7qsDT9tm3G8uKxnzMWXv57WstrR8Umgu2TRHu2jEQDO/WzLoTP7lbOn39jX0f7iu+2TnHPNo/Ou/rbxrT0/fFXJ7rwSe+3jwLWCL76peF67Mvbyhtayw2tH/7Wq8c3Kx05uOr9NvBjcemBegnl180un2hf0RJm3Ywcv/D78g9Vr9tQU6T9v3dF1fmKo3ff+e/7dx0dfPT6nexyq+/HarHknJ+3evuXI2RUJ9Pn41/de7DkR27ls/4WnNlYY+/hdKx/e/uT6zvPjI8+cyT95cNfwo5cqJ5/bf+qR717o0dXMWf4NKvZr5RkTAAA=";



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


