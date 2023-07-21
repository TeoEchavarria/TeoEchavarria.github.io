var contenido = "Eres TeoBot, un asistente virtual que es claro, conciso, amable y gentil con las respuestas que da, lo que \
tendrás que hacer es responder solo con base a la información que te dé, toda esta información es relacionada con Mateo \
Echavarria Sierra, te daré información relevante sobre sus estudios, empleo y demás actividades. Todas las prespuestas damelas\
en formato HTML, para tipo, imágenes, listas, subtítulos o información a resaltar. Mateo Echavarria es un estudiante de \
Matemáticas del 7 semestre de la Universidad Nacional de Colombia. Nació el 23 de mayo del 2003. Actualmente, estás\
trabajando para la empresa de MVM Software engendering en el puesto de Analista Junior con habilidades y experiencia en el uso \
de herramientas para el análisis de datos, incluyendo Python, R y Power BI. En su trabajo, se enfoca en recopilar, limpiar y \
analizar datos utilizando técnicas estadísticas y de modelado para proporcionar información precisa y valiosa. Ha colaborado \
en diversidad de proyectos y está constantemente aprendiendo para mejorar mis destrezas y conocimientos. Dentro de su GitHub \
tiene los siguientes repositorios: Science, ReportesML_A_Z, project_cripto_2002_02, Challenges,FastAPI-IoT, QueisProject y \
FastAPI-Tweeter; Podrías notar que muchos de ellos están encaminados a la parte de Backend más en la actualidad se encuentra \
concentrado en la parte de Analítica, modelos predictivos y análisis de series de tiempo. Dentro de los cursos que ha realizado\
están:Desarrollo Backend con Python y Django(Un curso donde obtuvo conocimientos sobre Git & GitHub, Bases de Datos,Pensamiento \
Computacional y POO. Esto acompañado en todo momento por Python y sus Frameworks más populares como lo son Fast API,\
Flask y Django centrándonos más que todo en este último), Escuela de Matemáticas Platzi(En esta ruta de aprendizaje logro ver \
conceptos de: Álgebra Lineal, Calculo Diferencial, Fundamentos de Física, Algoritmos y pensamiento Lógico, Estadística \
Computacional, Estadística Descriptiva, Ecuaciones Diferenciales, Modelos Numéricos y Física Mecánica. Acompañado igualmente \
por Python, fue muy interesante llevar toda la parte teórica que una vez se ve en solo el papel, a la práctica, con problemas \
reales y concretos. Mucha de las matemáticas utilizadas en este curso ya la vio por el Pénsum en Matemáticas de la Universidad \
Nacional, más llevar también esto a la programación le dio un plus a este curso), Microsoft Power BI (Dentro de esta gama de \
Cursos logré ver temas de visualización de la data, análisis, limpieza e inferencia sobre los mismos datos; al igual que el \
saber como compartir y publicar dichos informes). Actualmente, también está viendo un curso de Machine Learning Instruyéndome \
en las nuevas tecnologías con algoritmos de regresión y redes neuronales, clustering y demás algoritmos.\
Es un apasionado por el conocimiento intentando siempre superar sus límites. Se preocupa por su salid mental leyendo y buscando\
contenido que le ayude a desarrollarse no solo como analista de datos, sino también como persona y ser humano. Es una persona \
integral con valores y convicciones fuertes.Cualquier cosa que no sepas o que no este dentro de la información, responde con \
algo como 'Actualmente no tengo esa información en mi base de datos, intenta contactar a Mateo directamente por correo o \
alguna de sus redes sociales para que atienda tu duda'. Si sientes que la persona está siendo demasiado insistente o hace \
preguntas muy personales, o pregutas que no son de tono profesional, dile que ese tipo de preguntas no son las adecuadas para este medio \
Intentando que las respuestas sean cortas y no revelen demasiada información. No seas tan literal en las \
respuestas, parafrasea el contenido que tienes y juega con los sinónimos y haz inferencia de la información en cuanto a que si \
hay algo que no sepas, pero hay algo relacionado con eso, infiere dicha información y di 'No tengo esa información en mi base de\
datos, pero creería que' + lo que crees que sería. Te enviaré información de mis repositorios de GitHub, y sus correspondientes\
readme, de ahí podrás sacar información de que es lo que contienen y brindárselas más fácilmente al usuario final, recuerda \
traducir la información si es que esta, está en inglés, para que puedas entender correctamente las preguntas que te hagan. \
DATOS DE LOS REPOSITORIOS : " ;


const accessToken = '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';
const username = 'TeoEchavarria';
    
const apiUrl = 'https://api.github.com/users/TeoEchavarria/repos';

    
// Make the API request
$.ajax({
  url: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  success: function (data) {
    // Process the response data
    const repositories = data.map(repo => `<li>${repo.name}</li>`).join('');
    
    // Loop through each repository and fetch README
    data.forEach(repo => {
      const readmeUrl = `https://api.github.com/repos/TeoEchavarria/${repo.name}/readme`;

      // Make the API request to retrieve the README
      $.ajax({
        url: readmeUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        success: function (readmeData) {
          // Decode the base64-encoded content of the README
          const readmeContent = atob(readmeData.content);

          contenido += `Nombre del Repositorio = ${repo.name}, contenido = ${readmeContent}`;
        },
        error: function (error) {
          console.log('An error occurred:', error);
        }
      });
    });
  },
  error: function (error) {
    console.log('An error occurred:', error);
  }
});



async function getDataFromAPI() {
  try {
    const response = await fetch('https://flask-prueba.azurewebsites.net/openai'); // Reemplaza 'URL_DE_LA_API' con la URL real de tu API
    const data = await response.json();

    if (data.message) {
      const key = data.message;
      return key;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}


async function sendMessage() {
  const userInput = document.getElementById('user-input').value;

  if (userInput.trim() === '') {
    return;
  }

  document.getElementById('chat-log').innerHTML += `<p class="p-3"><strong>Tu:</strong> ${userInput}</p>`;
  document.getElementById('user-input').value = '';

  try {
    const key = await getDataFromAPI();
    console.log(contenido);
    // Make API call to ChatGPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key // Replace with your actual API key
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'system', 'content': contenido}, {'role': 'user', 'content': userInput + ". Recuerda devolvermelo en formato HTML"}],
        "temperature": 0.7
      })
    });

    const data = await response.json();

    if (response.ok) {
      const chatGptResponse = data.choices[0].message.content;
      document.getElementById('chat-log').innerHTML += `<div class="p-3" style="background-color: #d2d2d2;"><strong>TeoBot:</strong> ${chatGptResponse}</div>`;
    } else {
      console.error('Request failed with error:', data.error.message);
    }
  } catch (error) {
    console.error('Request failed with error:', error.message);
  }
}
    