import { pbkdf2, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const pbkdf2Async = promisify(pbkdf2);

const PASSWORD_VERSION = "pbkdf2_sha256";
const ITERATIONS = 210_000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

async function derivePasswordHash(password: string, salt: Buffer) {
  const hash = await pbkdf2Async(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);

  return hash.toString("base64");
}

function constantTimeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await derivePasswordHash(password, salt);

  return `${PASSWORD_VERSION}:${ITERATIONS}:${salt.toString("base64")}:${hash}`;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [version, iterations, salt, hash] = passwordHash.split(":");

  if (version !== PASSWORD_VERSION || Number(iterations) !== ITERATIONS || !salt || !hash) {
    return false;
  }

  const candidateHash = await derivePasswordHash(password, Buffer.from(salt, "base64"));

  return constantTimeEqual(candidateHash, hash);
}
