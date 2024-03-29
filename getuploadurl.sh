#!/bin/bash

if [ $# -ne 2 ]
then
    echo "::error the parameters error, please check!!!"
    exit 1
fi

URL_PREFIX="https://api.github.com/repos/wangwei1237/monolith-to-microservices/releases"

version=$1
token=$2
#GITHUB_ENV_S="$3"

get_release_url="${URL_PREFIX}/tags/${version}"
upload_url=$(curl -H "Accept: application/vnd.github.v3+json" "${get_release_url}" | grep 'upload_url' | cut -d'"' -f4)

create_release_url="${URL_PREFIX}"
if [ "$upload_url" = "" ]
then
    upload_url=$(curl -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token ${token}" -d "{\"tag_name\":\"${version}\", \"name\":\"Build for ${version}\"}" "${create_release_url}" | grep 'upload_url' | cut -d'"' -f4)
fi

echo $upload_url

#echo "::set-output name=upload-url::$upload_url"
#echo "upload-url=$upload_url" >> ${GITHUB_ENV_S}
