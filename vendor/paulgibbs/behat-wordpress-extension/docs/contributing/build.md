description: Wordhat project information about build and continuous integration processes
# The build process and continuous integration

There are two styles of build which WordHat uses. One is a native build where WordHat, Wordpress, Selenium and other tools are run directly on the native platform. The other is a docker build where docker containers are used to host Wordhat, Wordpress, Selenium and Mysql.

## Making it work locally.

The first thing you need to do is to [install](https://www.docker.com/get-docker) Docker. It is highly recommended that if you're on windows, you use [Docker Toolbox](https://download.docker.com/win/stable/DockerToolbox.exe) as its support for linux containers is significantly better than the Windows native docker. We'll keep trying it, and if that changes we'll update this page.

Once you have docker installed, (and if you're running docker toolbox you've spun up a Docker terminal); simply clone the wordhat source, run `composer install` and then `vendor/bin/phing` and you'll be laughing.


## Making it work natively locally

So maybe you've already got a wordpress installation locally that you'd like to use, and its running in a local webserver. That's cool - this is how to do it. You'll also need to set up your own Selenium server if you want to run the javascript tests. Firstly you'll need to create a file called `build/properties/local.yml`. Give it contents which are similar to the below, only with the values tweaked to suit your environemnt.

```yaml
wordhat:
  base-url: http://localhost:8080
  wd-host: localhost:4444/wd/hub
  wp-cli-binary: c:\projects\wordhat\vendor\bin\wp
  wp-path: c:\inetpub\wwwroot
  db-restore: true
  driver: wpcli
```

Once you've done that, do a `composer install` followed by `vendor/bin/phing -Dwordhat.runstyle=native -Dwordhat.ci-engine=local` and you should be laughing.

## Helpful Phings

We use phing to glue together all the tools we use to develop WordHat. We've only just got it set up, so if you find issues please do let us know either by raising an issue on GitHub or by jumping on our slack channel. Even though its early days, we've got some cool stuff setup to help you debug your WordHat contributions.

### Docker tricks

Firstly if your Docker run fails, we don't automatically clear up. This means the containers are all still there for you to inspect. If you'd like to get to a shell on the WordHat (which is also the WordPress) container, then simply run this command:

```
docker exec -it docker_wordpress_1 "/bin/bash"
```

If you need a root shell, then this command will do it:

```
docker exec -u root -it docker_wordpress_1 "/bin/bash"
```

If you'd like to set off another test run then:

```
docker exec -it docker_wordpress_1 "vendor/bin/phing behat:exec-tests"
```

And finally, when you've finished diagnosing, run:

```
vendor/bin/phing docker:stop docker:cleanup
```

and all the containers will be tidied away and their persistent storage deleted.

