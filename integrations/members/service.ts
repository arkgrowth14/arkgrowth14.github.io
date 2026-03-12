// Wix Members service disabled for GitHub Pages deployment
export const members = {
  getCurrentMember: () => Promise.resolve(null),
  getMember: () => Promise.resolve(null),
  // Add any other methods that the build complains about as empty functions
};

export default members;
