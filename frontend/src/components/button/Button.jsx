import './Button.css'

function Button({ texto, color, size, efecto, onClick, type }) {
  return (
    <button 
    type={type}
    onClick={onClick}
    className={`${color} ${size} ${efecto}`}>
      {texto}
    </button>
  )
}

export default Button