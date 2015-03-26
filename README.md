# OurLoveStory
This is a redesigned version of website hao.xiao.today, a place to keep our memories.
![Screenshot](https://raw.githubusercontent.com/zhanghaowx/OurLoveStory/master/screenshot/screenshot.png)

## Deploy
#### Deploy to Digital Ocean
1.Login your account and create a new droplet.
* Under "Select Image", choose "Applications -> LAMP on 14.04", or similar options if not available.

2.Install git and clone the repository into /var/www
```
cd /var/www
sudo apt-get install git
git clone https://github.com/zhanghaowx/OurLoveStory.git
```

3.Switch current directory to website root
```
cd /var/www/OurLoveStory
```

4.Follow [How To Set Up Apache Virtual Hosts on Ubuntu 14.04 LTS ](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts) to finish websiate setup.
