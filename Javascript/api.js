const API_KEY = "live_65IEecbByRBcrifCK6lPqoZXMmgzW8ydk7jn64EcIpK8JOiz1wp0z3FXacejb11x";

const BASE_URL = "https://api.thedogapi.com/v1";

const headers = {
  "x-api-key": API_KEY
};

// Load random dogs

export async function getDogs(limit = 6) {
  const response = await fetch(
    `${BASE_URL}/images/search?limit=${limit}&has_breeds=1`,
    {
      headers
    }
  );

  if (!response.ok) {
    throw new Error("Could not load dog data.");
  }

  const data = await response.json();

  return data;
}

// Search dog breeds

export async function searchBreeds(searchText) {
  const response = await fetch(
    `${BASE_URL}/breeds/search?q=${searchText}`,
    {
      headers
    }
  );

  if (!response.ok) {
    throw new Error("Could not search dog breeds.");
  }

  const breeds = await response.json();

  const dogsWithImages = await Promise.all(
    breeds.map(async (breed) => {
      const imageResponse = await fetch(
        `${BASE_URL}/images/search?breed_ids=${breed.id}`,
        {
          headers
        }
      );

      const imageData = await imageResponse.json();

      return {
        id: breed.id,
        url: imageData[0]?.url || "",
        breeds: [breed]
      };
    })
  );

  return dogsWithImages;
}