---
title: What is Docker and How to Get Started
series: Docker Home Server
banner:
  src: '/images/brehms-whale.jpg'
  alt: 'scientific illustration of a sperm whale'
  attribution: 'Brehms Tierleben, Verlag des Bibliographischen Instituts'
options:
  published: true
meta:
  date: 2021-08-30
  categories:
    - code
  tags:
    - smart home
    - devops
  excerpt: >-
    I finally take a look at how Docker actually works with an emphasis on some helpful visual tools
---

If you search the internet for "top developer skills 2021," "Docker", or some other sort of ["virtualization"](https://en.wikipedia.org/wiki/OS-level_virtualization), will definitely be on the list. I use Docker every day at my job, but much of how it actually works has been a mystery to me. Learning beyond how to start, stop, destroy, and rebuild containers has been a "white whale" (get ready for a lot of whale-based puns in this post) goal of mine for a while now.

Docker, in my experience anyways, can be intimidating because most of the interactions people have with it involve using command line level tools rather than some sort of graphical interface. I've done my best to not only find a helpful set of visual tools, but I'm also doing my best to dig into what they're doing behind the scenes. Hopefully this demystifies some of the Docker CLI commands.

I have an old Mac Mini from 2014 that I'm setting up to run a series of apps within Docker. This isn't a definitive guide, more just some research notes and explanations of tools I found. This is a bit of a weird post for me too, since the reason behind this isn't a web-related project. My eventual goal is to build a [progressive web app](https://en.wikipedia.org/wiki/Progressive_web_application) and host it in a Docker container, but first I'll be looking at how to set up a number of other smart home related services.

But anyways... strap in, put on some [whale-themed music](https://www.youtube.com/watch?v=TsdIO8RHMTc), and get ready for a very high-level look at what Docker is and how to start using it.

## First of all, what is Docker?

![docker logo](/images/docker-logo.svg){data-align='right' data-small='true'}

According to [their website](https://www.docker.com/resources/what-container), Docker is a way to "package software into standardized units for development, shipment and deployment." Put more plainly, Docker is a way to encapsulate a group of resources and features. This encapsulation is easily sharable between developers, and able to run in the same way both locally and in a production environment.

There are a few key Docker terms that help explain it at a very high level. These are all paraphrased definitions from the [official Docker glossary](https://docs.docker.com/glossary/).

<dl>
  <dt>
    <dfn>host</dfn>
  </dt>
  <dd>
    The machine on which the Docker application and containers instances are running.
  </dd>
  <dt>
    <dfn>container</dfn>
  </dt>
  <dd>
    A runtime instance of a docker image, consisting of an image, an execution environment, and a set of runtime instructions.
  </dd>
  <dt>
    <dfn>image</dfn>
  </dt>
  <dd>
    The basis of containers, image are collections of execution instructions used to create a container runtime.
  </dd>
  <dt>
    <dfn>network</dfn>
  </dt>
  <dd>
    A way to share multi-host connectivity for containers in a cluster.
  </dd>
  <dt>
    <dfn>volume</dfn>
  </dt>
  <dd>
    A specially-designated directory designed to persist data independent of the container’s life cycle.
  </dd>
</dl>

![a diagram from docker.com/resources demonstrating the relationship between the host operating system, the docker program, and containerized applications](/images/docker-containerized-appliction-diagram.png){data-caption='docker.com diagram showing the relationship between a host, Docker, and containerized apps'}

In short, an <strong>image</strong> is a template used to create a <strong>container</strong> that will run on a <strong>host</strong>. Multiple containers one the same host can communicate over a <strong>network</strong>, and data can be saved in a <strong>volume</strong> even after containers are destroyed.

### Why would use Docker?

Again, from [docker.com](https://www.docker.com/why-docker) —

> Containers are a standardized unit of software that allows developers to isolate their app from its environment, solving the “it works on my machine” headache.

Developing and deploying via containers is a way to guarantee that the environment in which is the app is worked on and the environment it is deployed too are as similar as possible. Running software during development is also easier because of the ability to destroy environments and quickly recreate them in a controlled way. Containers also isolate apps, meaning that it is much less likely for two containerized instances of software to interact unexpectedly.

## Setting up the Host Computer

### A side note about MacOS

Because of the system architecture of Mac computers, there is actually another emulated layer (called a [hypervisor](https://en.wikipedia.org/wiki/Hypervisor)) running between "Docker" and "Host Operating System" in the docker.com graphic above. This isn't quite a "bug," but it does introduce a number of [known issues](https://docs.docker.com/docker-for-mac/networking/#known-limitations-use-cases-and-workarounds) around running Docker on a Mac, particularly when trying to run containers with ["host networking"](https://docs.docker.com/network/host/). I'll explain what "host mode" means later and why I want to use it, but it is worth considering addressing this hurdle early on in the process.

Most web or app servers run a version of [Linux](https://en.wikipedia.org/wiki/Linux) anyways, so I'll be doing the same for my local setup.

### Installing Ubuntu

![ubuntu logo](/images/ubuntu-logo.svg){data-align='right' data-small='true'}

There are [a LOT](https://en.wikipedia.org/wiki/List_of_Linux_distributions) of Linux distributions (or "distros"). I chose [Ubuntu](https://en.wikipedia.org/wiki/Ubuntu) based on some very limited research because of its UI focus and stable update and release schedule.

There are a million tutorials on installing Ubuntu for different hardware, but for my Mac Mini it was pretty straightforward. I needed to
 - download the [Ubuntu install image](https://ubuntu.com/download/desktop)
 - use [Etcher](https://www.balena.io/etcher/) to flash the image onto a spare USB drive
 - restart my Mac while holding the Option Key to boot it into [Startup Manager](https://support.apple.com/guide/mac-help/change-your-mac-startup-disk-mchlp1034/mac) mode and choose the Ubuntu drive

From there the installation wizard will walk through the process and ask a few questions along the way. The only screen that I think is worth paying extra attention to is which apps should be installed. I chose to go with the minimal install and skip the software I knew I wouldn't be using. It's _also_ pretty important to make sure and install the third-party wifi drivers to make the Apple hardware play nice with the new OS.

![screenshot of the Ubuntu install screen, 'minimal installation' and 'install third-party software for graphics and wifi hardware' are checked](/images/ubuntu-wizard-software.jpeg)

If for some reason the wifi still doesn't work even after checking this box during installation you'll have to find an ethernet cable and get the driver yourself by navigating to the "Software & Updates" application, the "Additional Drivers" tab, then choosing the "Broadcom wireless driver" from the list. I actually had to do this install twice myself and was only able to use wifi on the first try once, but [super helpful StackExchange post](https://askubuntu.com/questions/1076964/macbook-can-t-find-wifi-for-ubuntu-18-04#answers) helped me solve the problem.

## Remote Access

I've mentioned adding visual interfaces a few times, but the ultimate goal for this project is to put this computer on a shelf by my router and touch it as seldom as possible. It won't be hooked up to a monitor, so there are a few tools to install at this point so I can keep working on it even after I move it away from my main desk and monitor.

### Assigning a Static IP Address

### SSH

https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/

### VNC

![vnc viewer logo](/images/vnc-viewer-logo.png){data-align='right' data-small='true'}

## Installing Docker

https://en.wikipedia.org/wiki/Ningen_(folklore)

http://pinktentacle.com/images/10/antarctic_humanoid_3.jpg

---

Set up a static IP

SSH - https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/

VNC - https://www.answertopia.com/ubuntu/ubuntu-remote-desktop-access-with-vino/
	- https://askubuntu.com/questions/1126714/vnc-viewer-unable-to-connect-encryption-issue
	so, uh… “vino” doesn’t work unless the gui boots…
	https://www.answertopia.com/ubuntu/ubuntu-remote-desktop-access-with-vnc/

	THE REAL ANSWER
	https://itectec.com/ubuntu/ubuntu-add-fake-display-when-no-monitor-is-plugged-in/

Other apps (1password)

Docker
	https://docs.docker.com/engine/install/ubuntu/
		- Uninstall old versions
		- Install using the repository
		- Install Docker Engine

	run docker not as sudo 
		https://docs.docker.com/engine/install/linux-postinstall/

Portainer
	docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

Pihole
	https://kitkatneko.wordpress.com/2020/08/03/install-pi-hole-on-a-raspberry-pi-with-docker-and-portainer/
	https://www.reddit.com/r/pihole/comments/csw5z8/installing_pihole_via_docker_address_already_in/

Plex
Host mode vs bridge mode
	mapping drives, permissions and stuff
	- https://saywebsolutions.com/blog/mounting_synology_nas_shared_folder_nfs_ubuntu_16_10
	- 0 0 https://acceptdefaults.com/2020/03/16/mounting-a-synology-share-in-ubuntu/
	https://hub.docker.com/r/plexinc/pms-docker/

Home assistant
	host mode for network stuff
	how to map a USB port
	https://community.home-assistant.io/t/zigbee-config-docker-access-to-usb-stick/226567

VS Code
 	the command palette
	ssh / ssh profile file

Backups!