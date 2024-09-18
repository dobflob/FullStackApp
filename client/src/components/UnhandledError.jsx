/**
 * UnhandledError is a resuable component displayed when the server returns a 500 error
 * @returns html for the unexpected error message
 */
const UnhandledError = () => {
  return (
    <main>
      <div className='wrap'>
        <h2>Error</h2>
        <p>Oops, an unexpected error has occured.</p>
      </div>
    </main>
  )
};

export default UnhandledError;