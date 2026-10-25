export const FOUNDING_YEAR = 2002;

// Rounded down to a multiple of 5 so the "N+" claim is always true and never stale.
export const getExperienceYears = (now: Date = new Date()): number => {
  const years = now.getFullYear() - FOUNDING_YEAR;
  return Math.floor(years / 5) * 5;
};
