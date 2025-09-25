export function clsx(...args: (string | undefined)[]) {
  return args.filter(Boolean).join("");
}
