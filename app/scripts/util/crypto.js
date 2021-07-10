const sha256 = async (str) => {
  const buffer = await crypto.subtle.digest("SHA-256", (new TextEncoder).encode(str));
  return [].map.call(new Uint8Array(buffer), c => c.toString(16).padStart(2, "0")).join("");
};

export {
  sha256,
}
