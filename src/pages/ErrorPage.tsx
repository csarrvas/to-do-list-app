import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
  if (error instanceof Error) return error.message
  return 'Unknown error'
}

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p>{getErrorMessage(error)}</p>
      <Link to="/" className="underline">
        Go back home
      </Link>
    </div>
  )
}

export default ErrorPage
