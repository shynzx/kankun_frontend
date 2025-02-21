import { useState, useEffect } from "react"
import { FcGoogle } from "react-icons/fc"
import { motion, AnimatePresence } from "framer-motion"

function Registro() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [inputError, setInputError] = useState({
    nombre_usuario: false,
    correo_usuario: false,
    telefono_usuario: false,
    rol_usuario: false,
    region_usuario: false,
    password_usuario: false,
    confirm_password: false,
  })
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    validatePassword(password)
  }, [password])

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Las contraseñas deben coincidir")
    } else {
      validatePassword(password)
    }
  }, [password, confirmPassword])

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres")
      return false
    } else if (pass.length > 30) {
      setPasswordError("La contraseña no debe superar los 30 caracteres")
      return false
    } else if (!/[A-Z]/.test(pass)) {
      setPasswordError("La contraseña debe contener al menos una mayúscula")
      return false
    } else if (!/[0-9]/.test(pass)) {
      setPasswordError("La contraseña debe contener al menos un número")
      return false
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      setPasswordError("La contraseña debe contener al menos un carácter especial")
      return false
    } else {
      setPasswordError("")
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      nombre_usuario: e.target.nombre_usuario.value.trim(),
      correo_usuario: e.target.correo_usuario.value.trim(),
      telefono_usuario: e.target.telefono_usuario.value.trim(),
      rol_usuario: e.target.rol_usuario.value.trim(),
      region_usuario: e.target.region_usuario.value.trim(),
      password_usuario: password,
    }
  
    const newInputError = Object.keys(formData).reduce((acc, key) => {
      acc[key] = !formData[key]
      return acc
    }, {})
  
    newInputError.confirm_password = !confirmPassword
  
    setInputError(newInputError)
  
    // Validate password
    if (!validatePassword(password)) {
      setError("Por favor, corrige los errores en la contraseña")
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (Object.values(newInputError).some((val) => val)) {
      setError("Por favor, llena todos los campos correctamente")
      return
    }

    setError("")

    try {
      const response = await fetch("http://localhost:8000/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error en el registro")
      }

      setSuccess(true)
      setTimeout(() => {
        // Redirect to login page
        window.location.href = "/"
      }, 2000) // Redirect after 2 seconds
    } catch (error) {
      setError("El correo ya esta registrado")
    }
  }

  const inputFields = [
    { name: "nombre_usuario", placeholder: "Nombre Completo", type: "text" },
    { name: "correo_usuario", placeholder: "Correo electrónico", type: "email" },
    { name: "telefono_usuario", placeholder: "Teléfono", type: "tel" },
    { name: "rol_usuario", placeholder: "Rol", type: "text" },
    { name: "region_usuario", placeholder: "Región", type: "text" },
    { name: "password_usuario", placeholder: "Contraseña", type: "password" },
    { name: "confirm_password", placeholder: "Confirmar Contraseña", type: "password" },
  ]


  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#4F46E5" },
    error: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.3 } },
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      <div className="bg-violet-950/95 border border-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-10">
        <h1 className="text-center text-4xl font-extrabold text-white mb-4">Kankun</h1>
        <h2 className="text-center text-2xl font-semibold text-gray-200 mb-6">Registro</h2>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center"
            >
              Registro exitoso! Redirigiendo...
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {inputFields.map((field, index) => (
            <motion.div
              key={index}
                  variants={inputVariants}
              animate={inputError[field.name] ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.3 }}

            >
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className={`w-full p-3 border ${inputError[field.name] ? "border-red-500" : "border-gray-600"} rounded-lg bg-gray-700/50 text-gray-200`}
                onChange={(e) => {
                  if (field.name === "password_usuario") {
                    setPassword(e.target.value)
                  } else if (field.name === "confirm_password") {
                    setConfirmPassword(e.target.value)
                  }
                }}
                value={field.name === "password_usuario" ? password : field.name === "confirm_password" ? confirmPassword : undefined}
              />
            </motion.div>
          ))}
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <p className="text-gray-400 text-sm">
            La contraseña debe contener al menos 8 caracteres, una mayúscula, un número, un carácter especial y no superar los 30 caracteres.
          </p>
          <motion.button
            className="w-full p-3 bg-zinc-100 text-black font-semibold rounded-lg hover:bg-zinc-900 transition duration-300 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Registrarse
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-white font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>

        <div className="mt-4">
          <motion.button
            className="w-full p-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-100 transition duration-300 flex items-center justify-center gap-2 hover:text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FcGoogle className="w-5 h-5" />
            Registrarse con Google
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Registro