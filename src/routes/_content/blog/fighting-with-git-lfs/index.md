---
title: Fighting with Git LFS
banner:
  src: '/images/indiana-jones-warehouse.jpg'
  alt: 'the warehouse from "Raiders of the Lost Ark'
  attribution: 'Raiders of the Lost Ark, Lucasfilm Ltd.'
options:
  published: true
meta:
  date: 2020-05-11
  categories:
    - code
  tags:
    - git
    - lfs
    - media
  excerpt: >-
    Lessons learned from using git-lfs (Git Large File Storage), which can be
    quite easy to mess up and equally as frustrating to fix.
---

<script>
  import ImageResizeExample from './_image-resize-example.svelte'
</script>

I came across this tweet the other day from [Leslie Cohn-Wein](https://twitter.com/lesliecdubs).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Wanted to push video files to a repo tonight, so I ended up spending some quality time with Git LFS.<br/><br/>Accidentally committed before tracking, and WOW I would not wish that on anyone 😓<br/><br/>There’s got to be a good GUI for LFS, right?? Should I be using Tower?</p>&mdash; Leslie Cohn-Wein (@lesliecdubs) <a href="https://twitter.com/lesliecdubs/status/1257170264116400128?ref_src=twsrc%5Etfw">May 4, 2020</a></blockquote>

I knew I wanted to rearrange some files in my own project, so I related to this. Some were already tracked with LFS, some were not, and I been putting off this refactor because I'd heard how painful this process could be.

## What is LFS?

[Git LFS](https://git-lfs.github.com/) is "an open source Git extension for versioning large files."

> Git Large File Storage (LFS) replaces large files such as audio samples, videos, datasets, and graphics with text pointers inside Git, while storing the file contents on a remote server like GitHub.com or GitHub Enterprise.

This is a tool that lets a repository store, and track the history of, large files without keeping them directly alongside other files. LFS keeps the overall file size of the repo and its download time smaller. Since the files can be stored on any LFS compatible server it also lets that server host the images with features that would be out of scope for a normal git repo.

It's a little bit of a pain to set up, but the quickest summary of how it works is that any files tracked in the `.gitattributes` file will be uploaded to the LFS server rather than the normal repository. The `.gitattributes` file works very similar to a `.gitignore` file, in that these rules will only apply to files tracked _after_ it is part of the repo's history. I'll expand on that in a second.

## Why use LFS?

Images are one of the more complicated parts of hosting and serving a website. They're very large compared to most other assets, which means they require extra consideration in both where they are hosted and how they are served to users.  [`gatsby-image`](https://image-processing.gatsbyjs.org/) is an awesome implementation that automatically handles resizing when serving images, but I wanted something that was less coupled to my specific framework and wouldn't dramatically increase my build times if I had a lot of images. I experimented with a few external CDNs that specialized in image hosting and optimization, like [Cloudinary](https://cloudinary.com/), but uploading images and managing urls more work than being able to just keep them in my repository.

A great middle ground to this is [Netlify Large Media](https://netlify-photo-gallery.netlify.app/). Images can be stored locally in my project, uploaded with my normal git workflow, and pushed to Netlify's media servers using LFS where I can add query parameters to their url to crop and resize them.

Netlify Large Media has its own [steps to set up](https://docs.netlify.com/large-media/setup/#configure-file-tracking) that can be kind of intimidating if you're not used to doing a lot of configuration on the command line. It took me a couple tries to get this exactly right, but the results are pretty cool and I think well worth the initial hurdles.

<ImageResizeExample />

I've been using Netlify Large Media since I rebooted my site in January, and I've been super happy with it the whole time. It's very easy to use `srcset` and give a list of query params to generate different sized images, but that's a different blog post.

## Planning to move images around

My Gatsby project has pretty much followed the default folder structure from the [Gatsby Default Starter](https://github.com/gatsbyjs/gatsby-starter-default) since I set it up.

```
site
├─ src
│  └─ content
│     └─ blog
│        └─ post-name.mdx
│  └─ components
│     └─ misc
│        └─ component.jsx
├─ static
│  └─ images
│     └─ uploads
│        └─ image.jpg
```

I have a habit of overly organizing my folders, and this always leads to deeply nested files that require long and hard to follow import paths.

```
import Component from '$lib/components/misc/component'

---

<img src="../../../static/site-assets/image.jpg">
```

Because of this, I wanted to flatten the folder structure of my site. NetlifyCMS's media manager doesn't currently handle subfolders, and I had added enough images to the site that it was getting hard to find things inside of the one single `/uploads` directory. Moving to the `directory/index` pattern would let me organize my project better and more easily import content and miscellaneous one-off React components into any MDX posts without long import paths.

```
site
├─ src
│  └─ content
│     └─ blog
│        └─ post-name
│           ├─ index.mdx
│           ├─ image.jpg
│           └─ component.jsx
```

This new file structure made authoring posts a LOT easier. There's a bit of work behind the scenes with a plugin, [`gatsby-remark-copy-linked-files`](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/), to get these images to work in production. The plugin will copy media files from within the `/content` directory and move them back into `/static/images/uploads` at build time so my html pages can find them.

```
import Component from './component'

---

<img src="./image.jpg">
```

## The Frustration

As I do with any new feature, I made a new branch from `master` and set up a test case to make sure the idea was viable before going through with moving all the files. The new file structure worked great, but I'd made a critical mistake — I commited a new image in my post directory _before_ updating and committing my `.gitattributes` file. It was set up to only look at images in `/static/images/site-assets/`, and not anything inside of `/content`. I didn't realize this at the time, called the test case a success, and went about moving the rest of my images.

The good news is that once a file is stored in LFS, git is a little smarter than it is with normal files. Often git will see a file that was moved as "deleted" at its original location and "created" at its new location. LFS figured out that these files were actually only "renamed."

![GitHub successfully moving location of unchanged LFS files](/images/move-lfs-files.png){data-align="full"}

The BAD news is that once a regular image is in there... its in there, even after you've modified and commited a `.gitattributes` file that would have included it.

```
static/images/** filter=lfs diff=lfs merge=lfs -text
src/content/**/*.jpg filter=lfs diff=lfs merge=lfs -text
src/content/**/*.png filter=lfs diff=lfs merge=lfs -text
src/content/**/*.gif filter=lfs diff=lfs merge=lfs -text
src/content/**/*.mp4 filter=lfs diff=lfs merge=lfs -text 
```

![GitHub tracking a jpg instead of a large media file](/images/committed-image.jpg){data-align="full"}

## The Fix

As with most git scenarios, nothing is really permanent but that also doesn't mean its going to be easy to fix. LFS itself has a [very thorough list](https://github.com/git-lfs/git-lfs/blob/master/docs/man/git-lfs-migrate.1.ronn) of command line flags and options that can be used to migrate files, but even though I use the command line every day this is still way over my head.

Something that was much easier for me was to remove the incorrect image, commit that file deletion, and then re-add and re-commit the file again but with the correct `.gitattributes` in place.

To answer Leslie's question about whether or not there is a GUI, I accidentally stumbled on something GUI-like that worked for me. 

NetlifyCMS, which I have configured for [Netlify Large Media](https://www.netlifycms.org/docs/netlify-large-media/), actually errored when trying to look up the path to my non-LFS image. This makes sense because rather than looking to github to find them the CMS needed to be looking at Netlify's media servers, and since I had tracked my file incorrectly it didn't exist there.

![NetlifyCMS showing a broken file](/images/netlifycms-broken-image.png){data-align="full"}

To go through the steps of removing it and adding it again was very easy using the CMS media manager, meaning that I could do this with a few clicks of a button instead of having to bounce around between my text editor deleting files and my terminal pushing my changes. Because of the way that NetlifyCMS squashes commits this ended up being very clean in the repository history.

![commits removing and re-adding a file to correct tracking history](/images/remove-and-add-image.png){data-caption="'Update Pages “uses”' contains the new upload of the image." data-align="full" }

I definitely wouldn't call this a "LFS GUI," nor would I want to try to use it to batch-fix more than one or two images, but it was quick and easy for what I needed to do.

## TL:DR;

If you accidentally check in a file that you meant to put into LFS:
- remove original file from the project
- commit the file deletion
- configure LFS with `.gitattributes` file
- commit configuration
- re-add the file to the project
- re-commit the file
- celebrate

The bottom line to remember here is that `.gitattribues` lets the repository know how to treat a file differently than it normally would. In order to make git "see" a new type of file it needs to be removed, configured correctly, and added again. Think of it in the same way as trying to change the same image from a .png to a .jpg. Git needs to let go of the old version so it can hang on to the new one.

Git can be intimidating enough if its not a tool you're familiar with, and adding another layer like LFS on top can make it all the more frustrating when it feels like things are going wrong. I hope this post might help anyone who, like me, was struggling with how to undo an accidental LFS mistake.

<!-- UPDATE local file system vs production file system - https://github.com/ryanfiller/portfolio-gatsby-v2/commit/a9a73d8ec5ee31416d2f25046c956ba5d1147a4e -->