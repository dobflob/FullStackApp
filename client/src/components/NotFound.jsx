/**
 * NotFound is a resuable component used when a requested course doesn't exist or the user has navigated to a route that doesn't exist
 * @returns html for the not found message
 */
const NotFound = () => {
  return (
    <main>
      <div className='wrap'>
        <h2>Not Found</h2>
        <p>Sorry, the page you requested could not be found.</p>
      </div>
    </main>
  )
};

export default NotFound;