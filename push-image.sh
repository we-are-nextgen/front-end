podman build -t nextgen-front-end .
podman tag localhost/nextgen-front-end:latest quay.io/wael2000/nextgen-front-end
podman push quay.io/wael2000/nextgen-front-end
