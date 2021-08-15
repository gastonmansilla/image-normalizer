import nanoid from 'nanoid/async';
import nanoidSync from 'nanoid';
const bitsPerChar = 6;

export async function quickId(bits = 256): Promise<string> {
  return await nanoid(Math.ceil(bits / bitsPerChar));
}

export function quickIdSync(bits = 256): string {
  return nanoidSync(Math.ceil(bits / bitsPerChar));
}
