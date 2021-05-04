import Link from 'next/link'

export const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      )
    })

  return (
    <nav>
      <Link href={'/'}>
        <a>GitTix</a>
      </Link>
      <div>
        <ul>{links}</ul>
      </div>
    </nav>
  )
}
