const developerJokes = [
  "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.",
  "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'",
  "¡He terminado mi código a tiempo! – Nadie, nunca.",
  "Si no funciona, añade más `console.log()`.",
  "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.",
  "No me asusto fácilmente... excepto cuando veo código sin `;` al final.",
  "Los desarrolladores no envejecen, solo se depuran.",
  "El único lugar donde puedes escapar de una excepción es en Java.",
  "Frontend sin diseño es como un backend sin lógica.",
  "¿Por qué los programadores prefieren el té? Porque en Java no hay café.",
  "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.",
  "Siempre prueba tu código... excepto cuando funciona.",
  "Tu código no está roto, solo es 'funcionalidad no documentada'.",
  "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.",
  "Mi código funciona... hasta que lo toco de nuevo.",
  "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.",
  "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.",
  "Git es como un horóscopo: nunca entiendes los conflictos.",
  "Un desarrollador sin bugs es como un unicornio, no existe.",
  "En mi máquina funciona... pero no en producción.",
];

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (method === "GET") {
      if (path.startsWith("/jokes")) {
          const index: number | null = Number(path.split("/").at(2));
          if (!index) {
              developerJokes.sort(function () {
                  return Math.random() - 0.5;
              });
              return new Response(JSON.stringify(developerJokes.at(0)));
          } else {
              return new Response(developerJokes[index], {
                  status: 200,
              });
          }
      } else if (path.startsWith("/calcular")) {

        let operacion = url.searchParams.get("operacion")
        let num1 = Number(url.searchParams.get("num1"))
        let num2 = Number(url.searchParams.get("num2"))

        if(operacion==="suma"){
          return new Response(JSON.stringify(num1+num2));
        } else if(operacion==="resta"){
          return new Response(JSON.stringify(num1-num2));
        }else if(operacion==="multiplicacion"){
          return new Response(JSON.stringify(num1*num2));
        } else if(operacion==="division"){
          if(num2===0){
            return new Response("Error: No se puede dividir por 0");
          }
          return new Response(JSON.stringify(num1/num2));
        }
     }else if (path.startsWith("/reverso")) {
      const frase = path.split("/").at(2) || "";
      const detalles = url.searchParams.get("detalles") === "true";
      const reverso = frase.split("").reverse().join("");


      if (detalles) {
          return new Response(
              JSON.stringify({ reverso, longitud: frase.length }),
              { status: 200 },
          );
      } else {
          return new Response(reverso, { status: 200 });
      }
    }
  }
  return new Response("endpoint not found", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);