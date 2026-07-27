/**
 * Simulates a form submission delay and resolves with success or throws an error.
 * @param {Object} formData 
 * @returns {Promise<{success: boolean}>}
 */
export async function mockSubmit(formData) {
  // Simulate network delay (1.2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1200));
  
  console.log("Form submission received (mock):", formData);
  
  // Occasional failure simulation (5% chance) for realistic testing
  if (Math.random() < 0.05) {
    throw new Error("Mock submission failed. Please try again.");
  }
  
  return { success: true };
}
