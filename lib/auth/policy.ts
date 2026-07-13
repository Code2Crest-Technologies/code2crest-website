export function validatePasswordPolicy(password: string) {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("one number");
  }

  return {
    ok: errors.length === 0,
    message: errors.length
      ? `Password must include ${errors.join(", ")}.`
      : "",
  };
}

