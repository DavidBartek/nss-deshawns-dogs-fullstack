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