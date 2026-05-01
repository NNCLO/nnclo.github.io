import type { CSSProperties, ReactNode } from "react"
import { ArrowIcon } from "./arrow-icon"

type GitLinkProps = {
  href: string
  accent: string
  name: string
  desc: string
  icon: ReactNode
  ariaLabel: string
}

function GitLink({ href, accent, name, desc, icon, ariaLabel }: GitLinkProps) {
  return (
    <a
      href={href}
      className="git-link"
      aria-label={ariaLabel}
      style={{ ["--accent" as string]: accent } as CSSProperties}
    >
      <span className="git-ico" aria-hidden="true">
        {icon}
      </span>
      <span className="git-tx">
        <span className="git-tx-name">{name}</span>
        <span className="git-tx-desc">{desc}</span>
      </span>
      <span className="git-arr" aria-hidden="true">
        <ArrowIcon />
      </span>
    </a>
  )
}

const GithubIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const InstagramIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
  </svg>
)

const ThreadsIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
)

export function Microblog() {
  return (
    <section className="sblock" data-s="micro" aria-labelledby="micro-title">
      <h2 className="sec-lbl" id="micro-title">
        // microblog
      </h2>
      <div className="card git-shell">
        <div className="git-bar" aria-hidden="true">
          <div className="git-dots">
            <span className="gd r" />
            <span className="gd y" />
            <span className="gd g" />
          </div>
          <span className="git-lbl">nnx.root — git terminal</span>
        </div>
        <div className="git-body">
          <p className="git-commit">
            <span className="git-prompt" aria-hidden="true">
              $
            </span>
            <span>
              git commit -m <span className="git-str">{'"GIT — Github, Instagram, & Threads"'}</span>
            </span>
          </p>
          <nav className="git-links" aria-label="Microblog channels">
            <GitLink
              href="#"
              accent="var(--amber)"
              name="[G] GITHUB"
              desc="Source code & open projects"
              icon={GithubIcon}
              ariaLabel="GitHub — Source code & open projects"
            />
            <GitLink
              href="#"
              accent="var(--red)"
              name="[I] INSTAGRAM"
              desc="Visual process & behind-the-scene"
              icon={InstagramIcon}
              ariaLabel="Instagram — Visual process & behind-the-scene"
            />
            <GitLink
              href="#"
              accent="var(--violet)"
              name="[T] THREADS"
              desc="Daily notes & web tips"
              icon={ThreadsIcon}
              ariaLabel="Threads — Daily notes & web tips"
            />
          </nav>
        </div>
      </div>
    </section>
  )
}
