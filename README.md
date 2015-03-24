# OurLoveStory
This is a redesigned version of website xiao.today, a place to keep our memories.

## Deploy
### Digital Ocean
1.Login your account and create a new droplet.
    * Under "Select Image", choose "Applications -> LAMP on 14.04", or similar options if not available.

2.Install git and clone the repository into /var/www
```
cd /var/www
sudo apt-get install git
git clone https://github.com/zhanghaowx/OurLoveStory.git
```

3.Install composer
```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

4.Change current directory to website root
```
cd /var/www/OurLoveStory
```

5.Run Composer update
```
composer update
```
> If you see error message "Mcrypt PHP extension required.", run
> ```
> sudo apt-get install mcrypt
> sudo php5enmod mcrypt
> ```
> to enable the mcrypt extension explicitly.

6.Setup Codesleeve Asset Pipeline
```
php artisan config:publish codesleeve/asset-pipeline
```

7.Fix permission on folder app/storage
```
sudo chown -R www-data:www-data app/storage
sudo chmod -R 755 app/storage
```

8.Follow [How To Set Up Apache Virtual Hosts on Ubuntu 14.04 LTS ](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts) to finish websiate setup.
