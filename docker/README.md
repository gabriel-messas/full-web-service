If kompose fails to convert a service that has a "build" key, it might be necessary to:

- build the docker image normally, by runnning `docker build -t `tag_name` -f ./Dockerfile.development .`
- tag it, by running `docker tag `image_name` `repository`/`tag_name``
- push the image to a registry, by running `docker push `repository`/`tag_name``
- replace the "build" key in the docker-compose.yaml with an "image" key, referencing the image just pushed

For Kubernetes to be able to retrieve this private image from the registry, it is necessary to:

- create a secret, by running `kubectl create secret docker-registry myregistrykey --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL`
- edit the serviceaccounts settings, by running `kubectl edit serviceaccounts default` and inserting

> imagePullSecrets:
> \- name: myregistrykey

after "secrets"