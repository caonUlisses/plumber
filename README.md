# Plumber - fixing broken pipes

🔧 Plumber helps us to redirect incoming HTTPS requests and point then to HTTP.

![Docker Image CI](https://github.com/caonUlisses/plumber/workflows/Docker%20Image%20CI/badge.svg)

> ❗Hey! Do not use it in production! Seriously! Really!

## Why plumber?

We had to integrate with an external API and they only allow a single redirect URL, so we came up with this solution.

## Dependencies

Plumber needs some certs to run properly, so [mkcert](https://github.com/FiloSottile/mkcert) is suggested;

## Getting started

First of all, clone this repository and navigate to its root folder.
Then, install its packages with `npm install`;

Then, generate some certificates (requires mkcert). If your domain is 'banana.com', do:

```sh
cd certs
mkcert --key-file cert.pem  --cert-file key.pem banana.com
```

I really hope your using it dev only, so add your domain to your hosts file (linux has it at `/etc/hosts`):

```sh
127.0.0.1  banana.com
```

Now open your browser and hit: https://banana.com.br/localhost:8000

You sould be redirected to localhost at port 8000

Plumber will preserve your query params stay intact! Try: https://banana.com.br/localhost:8000?code=hollymollywhatacode

And 💣 BOOM! 💣, you'll be redirected with your query params

## Usage with docker

Read it [here](https://hub.docker.com/repository/docker/caonulisses/plumber)

## Escaping characters

The provider we are integrating does not support url escape characters, like `%2F` for '/', so we came up with the followind nasty solution:

* Use '..' instead of '/';
* Use '--' instead of '#';

Example: 

https://banana.com.br/localhost:8000..resource..peal--yellow will redirect to localhost:8000/resource/peal#yellow

## Magnets, how do they work?

Plumber should run on port 443 and your hosts file should contain your intended address. 
So every request that hits your domain on your machine on port 443 will trigger a redirect;
