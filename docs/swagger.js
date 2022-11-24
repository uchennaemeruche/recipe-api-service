
module.exports ={
    definition:{
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
        servers:[
            {
                url: "http://localhost:4000/",
                description: "Local Server"
            }
        ]
    },
    apis: ['./routes/api.js', './index.js', './docs/definitions.yaml', './docs/components.yaml'],
}




