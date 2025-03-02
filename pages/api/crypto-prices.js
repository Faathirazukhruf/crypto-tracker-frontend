import axios from "axios";

export default async function handler(req, res) {
  try {
    // Tambahkan delay untuk menghindari rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd"
    );

    // Cache data untuk 5 menit
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    res.status(500).json({ error: "Failed to fetch crypto prices" });
  }
}