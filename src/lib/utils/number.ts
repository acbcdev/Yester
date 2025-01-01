/**
 * Validates if a string contains only valid number characters
 */
const isValidNumberString = (value: string): boolean => {
  return /^-?\d*\.?\d*$/.test(value);
};

/**
 * Formats a number with thousand separators and decimal places
 * @param value - The number or string to format
 * @param decimals - Maximum number of decimal places (default: 2)
 * @returns Formatted string or null if invalid input
 */
export function formatNumber(value: string | number, decimals: number = 2): string | null {
  // Convert to string and clean whitespace
  const stringValue = value.toString().trim();
  
  // Validate input
  if (!isValidNumberString(stringValue)) {
    return null;
  }

  try {
    // Parse to number and check if valid
    const number = parseFloat(stringValue);
    if (isNaN(number)) {
      return null;
    }

    // Format with Intl.NumberFormat
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
      useGrouping: true,
    }).format(number);
  } catch {
    return null;
  }
}