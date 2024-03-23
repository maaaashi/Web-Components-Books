export const HeaderTitle = () => {
  const move = () => {
    window.location.href = `/`  
  }
  return (
    <button className="btn text-xl" onClick={move}>
      Web Components Books
    </button>
  )
}
