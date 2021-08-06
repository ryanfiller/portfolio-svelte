---
title: Getting Started with Docker
# series: Dark Mode
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
    After using Docker for almost two years I finally take a look at how it actually works
---

If you search the internet for "top developer skills 2021," "Docker", or some other sort of ["virtualization"](https://en.wikipedia.org/wiki/OS-level_virtualization), will definitely be on the list. I use Docker every day at my job, but much of how it actually works has been a mystery to me. Learning beyond how to start, stop, destroy, and rebuild containers has been a "white whale" (get ready for a lot of whale-based puns in this post) goal of mine for a while now.

This isn't a definitive guide, more just some research notes and explanations of tools I found while setting up a series of Docker containers for use at home. This is a bit of a weird post for me too, since the reason behind this isn't a web-related project. But anyways... strap in, put on some [whale-themed music](https://www.youtube.com/watch?v=TsdIO8RHMTc), and ...


## First of all, what is Docker?

## Installing Docker

### A side note about how Docker works on Mac computers

Docker stuff

Downloading ubuntu
	etcher
	how to boot
		make sure you check that one box
			but just in case, how to fix the wifi
			https://www.linuxquestions.org/questions/linux-networking-3/ubuntu-16-04-mac-mini-2009-broadcom-driver-selected-and-wlan-enabled-but-home-network-does-not-show-4175600634/
			https://askubuntu.com/questions/1076964/macbook-can-t-find-wifi-for-ubuntu-18-04

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