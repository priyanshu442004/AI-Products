/** Floating-label input used by the sign-in and sign-up forms. */
export function Field({ label, name, type = "text", textarea, ...rest }) {
  const C = textarea ? "textarea" : "input";
  return (
    <label className="group relative block">
      <C
        name={name}
        type={textarea ? undefined : type}
        placeholder=" "
        rows={textarea ? 4 : undefined}
        className="peer block w-full resize-none border-0 border-b border-ink/15 bg-transparent px-0 pb-2.5 pt-6 text-[17px] outline-none transition-colors placeholder:text-transparent focus:border-ink/15"
        {...rest}
      />
      <span className="pointer-events-none absolute left-0 top-6 origin-left text-[17px] text-muted transition-all duration-300 ease-[var(--ease-out-expo)] peer-focus:top-0 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.78]">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] peer-focus:scale-x-100" />
    </label>
  );
}
