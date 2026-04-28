export function errorHandler(err, req, res, next) {
  const status = err?.name === "ZodError" ? 400 : 500;
  res.status(status).json({
    error: status === 400 ? "Validation error" : "Server error",
    details: err?.errors || err?.message || String(err),
  });
}