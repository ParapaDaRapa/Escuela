
document.getElementById("cargar").addEventListener("click", function() {
    fetch("http://localhost:3000/contactos")
    .then(response=>response.json())
    .then(contactos=>{
        let datos='';
        let cuerpo = document.getElementById("cuerpo");
      contactos.forEach(pub=>{
          datos+='<tr>'
            +'<th scope="row">'+ pub.id +'</th>'
            +'<td>'+ pub.Nombre+'</td>'
            +'<td>'+ pub.Telefono+ '</td>'
            +'<td>'+ pub.Correo +'</td>'
            +'<td><button type="button" class="btn btn-info" rowid="'+ pub.id +'" onclick="modificar">Modificar</button></td>'
            +'<td><button type="button" class="btn btn-danger" rowid='+ pub.id +'" onclick="borrar">Borrar</button></td>'
            +'</tr>'
          
      });
      cuerpo.innerHTML=datos;
 })

});

document.getElementById("subir").addEventListener("click", function() {
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let nuevoContacto = {
        "nombre": nombre,
        "telefono": telefono,
        "correo": correo
    };

    fetch('http://localhost:3000/contactos',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(nuevoContacto)
    })
    alert("Contacto guardado correctamente");
});

document.getElementById("mod").addEventListener("click", function() {
    let id= parseInt(prompt("El id del objeto que se quiera modificar"))
    let nuevoNombre = prompt("Ingrese un nombre nuevo")
    let nuevoTelefono = prompt("Ingrese un telefono nuevo")
    let nuevoCorreo = prompt("Ingrese un correo nuevo")
    let nuevoContacto = {
            "nombre": nuevoNombre,
            "telefono":nuevoTelefono,
            "correo":nuevoCorreo
        };

        fetch('http://localhost:3000/contactos/' + id,{
            method:'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(nuevoContacto)
        })
        alert("Contacto actualizado correctamente");

});

document.getElementById("delete").addEventListener("click", function() {
    let id=parseInt(prompt("Que id de elemento quieres borrar?"))
    
    fetch('http://localhost:3000/contactos/' + id,{
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
    })
    alert("Contacto borrado correctamente");
});


function borrar(){  
    fetch('http://localhost:3000/contactos/' + rowid,{
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
    })
    alert("Contacto borrado correctamente");
};