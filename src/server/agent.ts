/**
 * CyberRakshak Core Agent Orchestrator
 * Coordinates Privacy Guard, Multilingual Classification,
 * Grounded RAG Retrieval, Ethical Refinement, and LLM Response generation.
 */

import { scrubSensitiveInfo } from './privacy.ts';
import { classifyQuery, VALID_CATEGORIES, ScamCategory } from './classifier.ts';
import { retrieveContext, KNOWLEDGE_BASE, AdvisoryDoc } from './retriever.ts';
import { assessAndRespond } from './responder.ts';
import { softenOverconfidence, responseHasGrounding, ensureStatutoryGrounding } from './ethics.ts';
import { inspectLink, LinkInspectorOutput } from './linkInspector.ts';

export interface AgentResponse {
  category: string;
  sources: string[];
  response: string;
  input_scrubbed: string;
  backendUsed: string;
}

/**
 * Main Pipeline Orchestrator
 */
export async function runAgent(
  userInput: string,
  apiKey?: string,
  isDemoMode: boolean = false,
  language: string = 'en'
): Promise<AgentResponse> {
  // Step 1: Privacy Guard - Scrub PII (Aadhaar, PAN, Cards, Account Numbers, OTPs, Phone, etc.)
  const userInputClean = scrubSensitiveInfo(userInput || '');

  // Step 2: Intent & Scam Modus Operandi Classification (Multilingual)
  const category = classifyQuery(userInputClean);

  // Step 3: Sovereign Grounding Retrieval (RAG from statutory advisories & SOPs)
  const { context, sources } = retrieveContext(userInputClean, category);

  // Step 4: Assessment & Response Generation with Ethics Guard
  const { response, backendUsed } = await assessAndRespond(
    userInputClean,
    context,
    category,
    apiKey,
    isDemoMode,
    language
  );

  return {
    category,
    sources,
    response,
    input_scrubbed: userInputClean,
    backendUsed,
  };
}

// Re-export all sub-modules for clean integration and testing
export {
  scrubSensitiveInfo,
  classifyQuery,
  VALID_CATEGORIES,
  type ScamCategory,
  retrieveContext,
  KNOWLEDGE_BASE,
  type AdvisoryDoc,
  assessAndRespond,
  softenOverconfidence,
  responseHasGrounding,
  ensureStatutoryGrounding,
  inspectLink,
  type LinkInspectorOutput,
};
