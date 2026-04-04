import './Button.css'

function Button({ texto, color, size, efecto }) {
  return (
    <button className={`${color} ${size} ${efecto}`}>
      {texto}
    </button>
  )
}

export default Button