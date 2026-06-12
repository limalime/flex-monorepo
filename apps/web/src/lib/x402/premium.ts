export async function fetchPremiumResearch() {
  const response =
    await fetch(
      "/api/research/premium",
      {
        method: "POST",
      },
    );

  if (!response.ok) {
    throw new Error(
      "Premium request failed",
    );
  }

  return response.json();
}