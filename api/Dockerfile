FROM       node:16-slim as BUILDER
LABEL      maintainer="Gabriel Messas - gabriel.messas@atos.net - 2023" \
           org.label-schema.description="Full Web Service - Node.js image" \
           org.label-schema.name="full-web-service" \
           org.label-schema.vcs_url="https://github.com/gabriel-messas/full-web-service"

EXPOSE     3000

RUN        apt-get update \
            && apt-get install -y libssl-dev \
            && apt-get clean

ENV        APP_ROOT=/api
WORKDIR    ${APP_ROOT}
ARG        NODE_ENV=production

COPY       ./package*.json ${APP_ROOT}/
COPY       ./prisma ${APP_ROOT}/
RUN        npm install
COPY       ./ ${APP_ROOT}/

RUN        npm run build

LABEL      org.label-schema.vcs-ref=$CI_COMMIT_SHA \
           org.label-schema.build-date=$BUILD_DATE

CMD        npm run start:prod
