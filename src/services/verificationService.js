import { verificationScenarios } from '../data/verificationScenarios';

/**
 * Verification Engine Service
 */
export const verificationService = {
  getScenarios: async () => {
    return Promise.resolve([...verificationScenarios]);
  },

  getScenarioById: async (id) => {
    const scenario = verificationScenarios.find((s) => s.id === id);
    return Promise.resolve(scenario || verificationScenarios[0]);
  },

  // Mock cross-verification engine execution
  runCrossVerification: async (surveyNumber) => {
    // Return matching scenario or default
    const found = verificationScenarios.find((s) => s.surveyNumber === surveyNumber);
    return Promise.resolve(found || verificationScenarios[0]);
  },
};
