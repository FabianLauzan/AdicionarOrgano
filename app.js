const AdicionarOrgano = () => {
  // Estados para los campos del formulario
  const [formData, setFormData] = React.useState({
    denominacion: '',
    especialidad: '',
    nivelJerarquico: '',
    abreviatura: '',
    orden: '',
    fechaInicio: '2025-01-01',
    fechaFin: '',
    descripcion: ''
  });
  
  const [errors, setErrors] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error cuando se escribe en el campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.denominacion) newErrors.denominacion = 'Este campo es obligatorio';
    if (!formData.especialidad) newErrors.especialidad = 'Este campo es obligatorio';
    if (!formData.nivelJerarquico) newErrors.nivelJerarquico = 'Este campo es obligatorio';
    if (!formData.abreviatura) newErrors.abreviatura = 'Este campo es obligatorio';
    if (!formData.orden) newErrors.orden = 'Este campo es obligatorio';
    if (!formData.fechaInicio) newErrors.fechaInicio = 'Este campo es obligatorio';
    
    // Validar que fechaFin sea mayor que fechaInicio si está presente
    if (formData.fechaFin && formData.fechaInicio && formData.fechaFin <= formData.fechaInicio) {
      newErrors.fechaFin = 'La fecha de fin debe ser posterior a la fecha de inicio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Datos enviados:', formData);
      setIsSubmitted(true);
    }
  };

  // Resetear el formulario
  const handleReset = () => {
    setFormData({
      denominacion: '',
      especialidad: '',
      nivelJerarquico: '',
      abreviatura: '',
      orden: '',
      fechaInicio: '2025-01-01',
      fechaFin: '',
      descripcion: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="form-container bg-white rounded-xl shadow-md overflow-hidden">
        {/* Cabecera con color azul original */}
        <div className="bg-blue-600 p-6">
          <h1 className="text-2xl font-bold text-white">Adicionar Órgano</h1>
        </div>
        
        <div className="p-6">
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">¡Formulario enviado con éxito!</p>
              <p>Los datos del órgano han sido registrados correctamente.</p>
              <button 
                onClick={handleReset}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Agregar otro órgano
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Denominación en su propia fila */}
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">
                  Denominación <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="denominacion"
                  value={formData.denominacion}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.denominacion ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ingrese la denominación"
                />
                {errors.denominacion && (
                  <p className="error-message">{errors.denominacion}</p>
                )}
              </div>

              {/* Resto de campos en grid de 2 columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Especialidad */}
                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Especialidad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.especialidad ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingrese la especialidad"
                  />
                  {errors.especialidad && (
                    <p className="error-message">{errors.especialidad}</p>
                  )}
                </div>
                
                {/* Nivel Jerárquico */}
                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Nivel Jerárquico <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="nivelJerarquico"
                    value={formData.nivelJerarquico}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nivelJerarquico ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccione un nivel</option>
                    <option value="Alto">Alto</option>
                    <option value="Medio">Medio</option>
                    <option value="Básico">Básico</option>
                  </select>
                  {errors.nivelJerarquico && (
                    <p className="error-message">{errors.nivelJerarquico}</p>
                  )}
                </div>
                
                {/* Abreviatura */}
                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Abreviatura <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="abreviatura"
                    value={formData.abreviatura}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.abreviatura ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: CAR"
                  />
                  {errors.abreviatura && (
                    <p className="error-message">{errors.abreviatura}</p>
                  )}
                </div>
                
                {/* Orden */}
                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Orden <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="orden"
                    value={formData.orden}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.orden ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Número de orden"
                    min="1"
                  />
                  {errors.orden && (
                    <p className="error-message">{errors.orden}</p>
                  )}
                </div>
                
                {/* Fecha Inicio */}
                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Fecha inicio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fechaInicio ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fechaInicio && (
                    <p className="error-message">{errors.fechaInicio}</p>
                  )}
                </div>
                
                {/* Fecha Fin */}
                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Fecha fin
                  </label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fechaFin ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fechaFin && (
                    <p className="error-message">{errors.fechaFin}</p>
                  )}
                </div>
              </div>
              
              {/* Descripción */}
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">
                  Descripción
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="editor-toolbar">
                    <button type="button" className="font-bold hover:text-blue-500">B</button>
                    <button type="button" className="italic hover:text-blue-500">I</button>
                    <button type="button" className="underline hover:text-blue-500">U</button>
                    <button type="button" className="hover:text-blue-500">T<sup>2</sup></button>
                    <button type="button" className="hover:text-blue-500">T<sub>2</sub></button>
                    <button type="button" className="hover:text-blue-500">L</button>
                    <button type="button" className="font-bold hover:text-blue-500">m</button>
                    <button type="button" className="font-bold hover:text-blue-500">n</button>
                    <button type="button" className="font-bold hover:text-blue-500">e</button>
                  </div>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="editor-textarea focus:ring-2 focus:ring-blue-500"
                    placeholder="Escriba una descripción del órgano..."
                  ></textarea>
                </div>
              </div>
              
              {/* Botones */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Guardar Órgano
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Notas al pie */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
          </p>
        </div>
      </div>
    </div>
  );
};

// Renderizar la aplicación
ReactDOM.render(<AdicionarOrgano />, document.getElementById('root'));