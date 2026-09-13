/**
 * CyberRakshak Privacy Guard
 * Military-grade PII scrubber for Indian citizens.
 * Redacts Aadhaar, PAN, Bank Account Numbers, Debit/Credit Cards, CVV,
 * IFSC, Passwords/PINs, OTPs, Phone Numbers, Email Addresses, and UPI handles
 * BEFORE sending any data to LLMs or server storage.
 */

export function scrubSensitiveInfo(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let res = text;

  // 1. Debit & Credit Card Numbers (13 to 19 digits, with spaces, hyphens or continuous)
  // Must run before Aadhaar to prevent 4x4 card blocks from being consumed as Aadhaar
  res = res.replace(/\b(?:\d{4}[\s-]?){3}\d{4,7}\b/g, '[CARD NUMBER REDACTED]');

  // 2. Indian Aadhaar Number (12 digits, grouped in 4-4-4 or 12 continuous digits starting with 2-9)
  res = res.replace(/\b[2-9]\d{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b/g, '[AADHAAR REDACTED]');

  // 3. Indian PAN Card Number (Format: 5 letters, 4 digits, 1 letter - e.g., ABCDE1234F)
  res = res.replace(/\b[A-Z]{5}[0-9]{4}[A-Z]\b/gi, '[PAN REDACTED]');

  // 4. Indian Bank IFSC Code (Format: 4 letters, 0, 6 alphanumeric - e.g., SBIN0001234, HDFC0000123)
  res = res.replace(/\b[A-Z]{4}0[A-Z0-9]{6}\b/gi, '[IFSC REDACTED]');

  // 5. Passwords, PINs, and MPINs
  res = res.replace(/(?:password|passwd|pwd|mpin|atm\s*pin|secret\s*pin|login\s*pin|upi\s*pin)[\s:=]+([^\s,;]+)/gi, '[CREDENTIAL REDACTED]');

  // 6. CVV / CVC numbers (3 or 4 digits preceded by CVV/CVC keywords)
  res = res.replace(/\b(?:cvv|cvc|security\s*code)[\s:=]*\d{3,4}\b/gi, '[CVV REDACTED]');

  // 7. Indian Bank Account Numbers (9 to 18 digits explicitly preceded by account indicators, or 11-18 standalone digits)
  res = res.replace(/\b(?:a\/c|ac|acc|account(?:\s*no|\s*number)?)[\s:=]*\d{9,18}\b/gi, '[BANK ACCOUNT REDACTED]');
  res = res.replace(/\b(?<!\+91[\s-]?)(\d{12,18})\b/g, '[ACCOUNT/CARD REDACTED]');

  // 8. One-Time Passwords (OTPs)
  // Protect genuine 6-digit Indian Postal PIN codes (e.g. "PIN 560001", "Pincode: 110001")
  const pinCodeReplacements: { placeholder: string; original: string }[] = [];
  res = res.replace(/\b(?:pin|pincode|postal\s*code|area\s*code)[\s:=]*([1-9][0-9]{5})\b/gi, (match, pincode) => {
    const ph = `__PINCODE_${pinCodeReplacements.length}__`;
    pinCodeReplacements.push({ placeholder: ph, original: `PIN ${pincode}` });
    return ph;
  });

  // Match OTPs: 4 to 8 digits with OTP/code/verification context, or spaced digits like "1 2 3 4 5 6"
  res = res.replace(/\b(?:otp|one[- ]time[- ]password|verification\s*code|auth\s*code)[\s:=]*([0-9\s]{4,8})\b/gi, '[OTP REDACTED]');
  res = res.replace(/(?<!\d)\d{6}(?!\d)/g, '[OTP REDACTED]');
  res = res.replace(/(?<!\d)\d{4}(?!\d)\s+(?=(?:is\s+your\s+otp|is\s+the\s+otp|otp))/gi, '[OTP REDACTED] ');

  // Restore preserved postal PIN codes
  for (const item of pinCodeReplacements) {
    res = res.replace(item.placeholder, item.original);
  }

  // 9. Indian Mobile / Phone Numbers (+91 optional, starting with 6-9, or 10-digit number)
  res = res.replace(/(?:\+91[\s-]?)?0?[6-9]\d{4}[\s-]?\d{5}\b/g, '[PHONE REDACTED]');
  res = res.replace(/(?<!\d)[6-9]\d{9}(?!\d)/g, '[PHONE REDACTED]');

  // 10. Email Addresses
  res = res.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '[EMAIL REDACTED]');

  // 11. UPI Handles (Handles ending with bank IDs or standard UPI identifiers)
  res = res.replace(/\b[a-zA-Z0-9.\-_]{2,}@(okaxis|okhdfcbank|okicici|oksbi|paytm|ybl|ibl|axl|upi|apl|postbank|fbl|barodampay|mahb|kotak|allbank|cnrb|idfcbank)\b/gi, '[UPI ID REDACTED]');

  // 12. Date of Birth (DOB) preceded by markers
  res = res.replace(/\b(?:dob|date\s*of\s*birth|born\s*on)[\s:=]*(\d{1,2}[-/. ]\d{1,2}[-/. ]\d{2,4})\b/gi, '[DOB REDACTED]');

  return res;
}
