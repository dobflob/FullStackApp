/**
 * Forbidden is a resuable component used when a user doesn't have permission to view a route
 * @returns html for the forbidden message
 */
const Forbidden = () => {
  return (
    <main>
      <div className='wrap'>
        <h2>Forbidden</h2>
        <p>You do not have permission to access the requested page.</p>
      </div>
    </main>
  )
};

export default Forbidden;