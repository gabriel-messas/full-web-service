# full-web-service

Repository containing code and infrastructure for a generic full Web service (backend API).
It aims at serving as an example, i.e. a complete skeleton for an easy-to-build API.

In order for the server to run properly locally, create a folder named `cert` under `api` and place your SSL certificate and key files there. They can be self-signed, generated with the following command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```
