export const getGreeting = async () => {
  const res = await fetch("/api/hello"); // domain is omitted; results in an HTTP request to localhost:3000 due to proxy setting
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch(`/dogs`);
  const data = res.json();
  return data;
}

export const getCities = async () => {
  const res = await fetch(`/cities`);
  const data = res.json();
  return data;
}

export const getWalkers = async () => {
  const res = await fetch(`/walkers`);
  const data = res.json();
  return data;
}

export const getOneWalker = async (walkerId) => {
  const res = await fetch(`/walkers/${walkerId}`);
  const data = res.json();
  return data;
}

export const getFilteredWalkers = async (cityId) => {
  const res = await fetch(`/filteredWalkers/${cityId}`);
  const data = res.json();
  return data;
}

export const getFilteredDogs = async (walkerId) => {
  const res = await fetch(`/filteredDogs/${walkerId}`);
  const data = res.json();
  return data;
}

export const postDog = async (newDog) => {
  await fetch(`/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newDog)
  });
}

export const postAssignWalker = async (dogId, walkerId) => {
  await fetch(`/dogs/${dogId}/assignWalker${walkerId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dogId, walkerId)
  })
}

export const putEditWalker = async (walkerId, editedWalker) => {
  await fetch(`/walkers/${walkerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedWalker)
  })
}

export const deleteDog = async (dogId) => {
  await fetch(`/dogs/${dogId}`, {
    method: "DELETE"
  })
}

export const deleteWalker = async (walkerId) => {
  await fetch(`/walkers/${walkerId}`, {
    method: "DELETE"
  })
}