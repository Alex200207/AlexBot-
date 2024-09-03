
  
  const escribirTexto = (texto, setResponse, tiempo, setIsDisabledUserText) => {
    let index = 0;
  
    const escribirCaracter = () => {
      if (index < texto.length) {
        setResponse(prev => prev + texto[index]); // Actualiza la respuesta
        document.querySelector("#content-text-ollama").scrollTop =
          document.querySelector("#content-text-ollama").scrollHeight;
        index++;
        setTimeout(escribirCaracter, tiempo); // Llama a la función después del tiempo especificado
      } else {
        setIsDisabledUserText(false); // Rehabilita el input una vez que se ha completado el texto
      }
    };
  
    escribirCaracter(); // Inicia la escritura de texto
  };
  

const copyText = (texto) => {
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      // Muestra un mensaje en la interfaz de usuario
      alert("Texto copiado al portapapeles");
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
};



export { escribirTexto, copyText };
