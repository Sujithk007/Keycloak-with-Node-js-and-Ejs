# Keycloak-with-Node-js-and-Ejs
Keycloak with Node js and Ejs.

# Docker installation command 
docker run -e DB_VENDOR=H2 -e KEYCLOAK_USER=admin -e \
KEYCLOAK_PASSWORD=password -p 8080:8080 --name keycloak-test -dit \
jboss/keycloak-openshift