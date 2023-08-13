//Se asume que el nombre de la Bd es 'pizzeria'
db = connect("mongodb://localhost/pizzeria")
//Creacion de la coleccion clientes (personas)
db.createCollection("clientes",{
    validator:{
        $jsonSchema: {
            bsonType:"object",
            required: ["nombre","ci","tlf"],
            properties:{
                nombre: {
                    bsonType: "string"
                },
                ci: {
                    bsonType: "int",
                    minimum:1,
                    description:"numero de cedula o DNI del cliente"
                },
                tlf: {
                    bsonType: "string"
                }
            }
        }
    }
})

//creacion de la coleccion ordenes
db.createCollection("ordenes",{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required: ["_idCliente","precio","direccion"],
            properties:{
                _idCliente:{//FK(clientes)
                    bsonType:"int",
                    "description": "referencia al id del cliente que hizo la orden"
                },
                precio:{
                    bsonType:"int",
                    minimum:1
                },
                direccion: {
                    bsonType: "string"
                },
                puntosDeReferencia: {
                    bsonType: "array",
                    "description":"Arreglos de referencias padas por el cliente",
                    items: [
                      {
                        bsonType: "object",
                        properties: {
                          ref: {
                            bsonType: "string"
                          }
                        },
                        required: [
                          "ref"
                        ]
                      }
                    ]
                }
            }

        }
    }
})

//Creacion de la coleccion platillos:
db.createCollection("platillos",
{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required: ["_id","_idOrden","nombre","precio"],
            properties:{
                _idOrden:{// FK(ordenes)
                    bsonType:"int",
                    "description": "identidicador de la orden a la que pertenece el platillo"
                },
                nombre: {
                    bsonType: "string"
                },
                descripcion: {
                    bsonType: "string"
                },
                precio: {
                    bsonType: "int",
                    minimum:1
                },
                items: {
                    bsonType: "array",
                    "description": "Un arreglos donde cada casilla representa el ingrediente añadido",
                    items: [
                      {
                        bsonType: "object",
                        properties: {
                          nombre: {
                            bsonType: "string"
                          },
                          cantidad: {
                            bsonType: "int"
                          }
                        },
                        required: [
                          "nombre",
                          "cantidad"
                        ]
                      }
                    ]
                }
            }
        }
    }
})