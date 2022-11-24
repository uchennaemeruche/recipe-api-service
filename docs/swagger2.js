const swaggerAutogen = require("swagger-autogen")({openapi:"3.0.0"})


const doc = {
  
    openapi: "3.0.0",
    info:{
        title: "Recipe RESTful API",
        version: "1.0.0",
        description: "A recipe review api service documentation with swagger",
        license: {
            name: "MIT",
            url: "https://spdx.org.licenses/MIT.html"
        },
        contact:{
            name: "Uchenna Emeruche",
            url: "https://github.com/uchennaemeruche",

        }
    },
    host: 'localhost:4000',
    schemes:['http'],
    servers:[
        {
            url: "http://localhost:4000/",
            description: "Local Server"
        }
    ]
}

const outputFile = "./swagger-output.json"
const endpointFiles = ['../index.js']

swaggerAutogen(outputFile, endpointFiles, doc)