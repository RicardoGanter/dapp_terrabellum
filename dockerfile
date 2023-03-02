# IMAGEN BASE
FROM node:16.15.0
# DIRECTORIO DONDE SE CONTENERAN LOS DATOS
WORKDIR /Users/ricar/work/dapps
# DE DONDE SE COPIARAN LOS DATOS
COPY . .

# INSTALACION DE LOS MODULOS

RUN npm i package.json

# OCUPAR UN PUERTO PARA EL CONTENEDOR
EXPOSE 3000


ENTRYPOINT [ "sh" ]
# BASH EXEC.SH PARA QUE EJECUTE TODO LO DEL ARCHIVO EXEC.SH