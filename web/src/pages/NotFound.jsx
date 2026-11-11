import { Button, Eyebrow } from "../components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col justify-center pt-32">
      <Eyebrow className="text-muted">Error 404</Eyebrow>
      <h1 className="mt-6 text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em]">
        This page isn't <span className="accent-serif text-teal-ink">in the data.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">The link may be old, or the page may have moved.</p>
      <div className="mt-10"><Button to="/">Back to home</Button></div>
    </section>
  );
}
