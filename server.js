const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const EBAY_TOKEN = "v^1.1#i^1#I^3#p^1#r^0#f^0#t^H4sIAAAAAAAA/+VYa2wUVRTe7ctUXoaCGKi4DtUGm53X7sx2x+7q0ke60PfWUmqw3Jm5046dV2ZmKdso1EVQDERECI9oJGoCAUnwlagIEkwkEhJERSExNqH8QBSNUWP0h3hnWsq2EkC6xCbun80999xzz/fd87hzyf6CwgfW1q79fYr3tpyd/WR/jtdLTSILC/LLpubmzM73kBkK3p39Jf156dzzFRZQFYNrgZahaxb0rVAVzeJcYQRLmhqnA0u2OA2o0OJsgUvE6us4Gic5w9RtXdAVzBevimBBJiQxDM1IIYEu54NIqF022apHMJZmRUYM81JIFPgAZNG8ZSVhXLNsoNkRjCZpxk/RfjrQSjIcw3IkiVNMqAPztUHTknUNqeAkFnW95dy1Zoar1/YUWBY0bWQEi8ZjNYnGWLyquqG1gsiwFR2mIWEDO2mNHlXqIvS1ASUJr72N5WpziaQgQMvCiOjQDqONcrHLztyE+y7TYQCpgBSUAlIIlAcYJitU1uimCuxr++FIZNEvuaoc1GzZTl2PUcQG/zgU7OFRAzIRr/I5f81JoMiSDM0IVr0gtiTW1IRFW4HSDepl099k6mJSsGP+ppYqPwNJHgRDAPqlYHmIpZnA8EZD1oZpHrNTpa6JskOa5WvQ7QUQeQ3HchPM4AYpNWqNZkyyHY8y9UIjHNIdzqEOnWLS7tacc4UqIsLnDq9/AiOrbduU+aQNRyyMnXApimDAMGQRGzvpxuJw+KywIli3bRscQfT29uK9AVw3uwiaJCmivb4uIXRDFWCOrpPrrr58/QV+2YUiQLTSkjk7ZSBfVqBYRQ5oXViUYUgqFBrmfbRb0bHSfwgyMBOjMyJbGQJZnuXFMAuZcl4IhsLZyJDocJASjh+QBym/CsweaBsKEKBfQHGWVKEpi1yAkehAuQT9IhuW/MGwJPl5RmT9lAQhCSHPC+Hy/1Oi3GioJ6BgQjs7sZ6tOOeJ5r5aurs2VqVKZeHucGsL0RA0mRVtar1BLTRrm1v0DqKjeXkcdEVuNBuuCr5SkREzrWj/rBDg5HrWSKjVLRuK44KXEHQDNumKLKQm1gEHTLEJmHYqARUFCcYFMmYY8SzV6mzB+5dl4uZwZ7FH/Tf96aqoLCdkJxYqZ72FDABDxp0OhAu6SuhOrgN0/XDEna7XvqsrjlYikAw1LAHiqC+JPBB6cBMCUdeU1Lh4k9HNd0KxhnAOkSCLQ1dW3GUCt5YLCLGlJxEHFt7o3OBa9R6ooX5om7qiQLONGnc9UNWkDXgFTrTCkIUEkcEEa9ZUiGWDbDjAkuPCJbituHOilTS3lOelvctudTlvgUBRJxZ2YwguuqPegk8OYvT7R9Tj/qi09wiZ9h7K8XrJCvI+ah55b0HuI3m5k2dbsg1xGUi4JXdp6LvehHgPTBlANnOKPMdOnWmYe2Dh7nXnZvWvKSE2eaZmPL/sXEreNfIAU5hLTcp4jSGLr8zkU9NmTaEZiqYDJMOwJNlBzrsym0fdmTdjz/rmQeL9jaW/rE/3LjhwrnbwyztOklNGlLzefA+KFU/ZslXizK2f//n8qi2bPW9N/mJfrDS4uOS1gcjghlf2v/mM5732grJdRZtOcx/f+9v+pyMVDXtfWvpYx4GtJ3ad7DuStqdP63zi15I4f/Cz4sMgdEg9uvojecNTL56u+nBjzerDsyu//eDotmCd8seJ7eJ2+psXEg9eKE0eH1ycPkuu3HL3ko2fvN79V9HBi0+ufOfHbT/MfO5nDtt7uG5x3yWlPnd+X/vKU8eq59ScnxvbPrD3p+IzRbd7X50xMHfGd4XrPr0//fbUd4tZQVuzqn36hVNvlAa/nzVtbfqeRdHIpdSz1Q99ffIs21d0fM7p8o75nTmN8wYCx7r2JC4Cpb3v4X1fvfzo5kU7enbUeVK7h87ybyIiUWcYEwAA";



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
