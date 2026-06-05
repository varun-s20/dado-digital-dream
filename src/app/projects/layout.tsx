/**
 * Projects routes adopt formedgardens.com.au's exact typography
 * (Inter Tight display + Inter body) via the `.font-formed` scope. The rest
 * of the site keeps its Hanken Grotesk.
 */
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <div className="font-formed">{children}</div>;
}
