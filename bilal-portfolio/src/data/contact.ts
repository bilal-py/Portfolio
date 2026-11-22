export type Lang = "en" | "de";

/** Details that are the same in every language. */
export const contact = {
  name: "Bilal Imran",
  firstName: "Bilal",
  lastName: "Imran",
  currentCompany: "Thoughtworks",
  email: "bilalrizvi2110@gmail.com",
  /** Path inside /public, e.g. "profile.jpg". Leave empty to hide the photo. */
  photoFile: "",
  /** Formspree endpoint, e.g. "https://formspree.io/f/abcdwxyz". Leave empty to fall back to email. */
  formspreeEndpoint: "https://formspree.io/f/meaawwbo",
};
