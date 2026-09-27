import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">404 - Page not found</h1>
      <Link to="/" className="underline">
        Go back home
      </Link>
    </div>
  )
}

export default NotFoundPage
