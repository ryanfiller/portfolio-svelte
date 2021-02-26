---
title: A Short History of Interface Colors
series: Dark Mode
banner:
  src: '/images/space-invaders-banner.png'
  alt: 'Space Invaders screen'
  attribution: 'Space Invaders, Midway Games'
options:
  published: true
meta:
  date: 2021-01-31
  categories:
    - design
  tags:
    - colors
    - accessibility
    - research
  excerpt: >-
    A non-comprehensive look at the history of "dark mode" in user interface design.
---

In the last year or so, adding a dark mode toggle to websites is a trend that has exploded for personal blogs and big brands. Thanks to some browser features and system APIs dark mode has become easier than ever to implement. I recently added this feature to my own site, and here are some things I learned along the way.

## What even is Dark Mode?

"Dark mode" refers to a [light-on-dark color scheme](https://en.wikipedia.org/wiki/Light-on-dark_color_scheme), or one where the background is a dark color with light text and graphics. This aesthetic has always been popular for applications like terminals and code editors, but has been making a comeback in more mainstream user interface design.

## Where did Dark Mode come from?

![Asteroids-like video game played on an oscillograph](/images/oscillograph-asteroids.jpg){data-align="right" data-small="true" data-caption="oscillograph monitor"}

If you look back on the [history of computer interfaces](https://eyeondesign.aiga.org/a-brief-history-of-dark-mode-from-the-matrix-like-displays-of-the-early-80s-to-today/), light text on a dark background is originally how computer interfaces initially appeared. This had to do with the physical hardware limitations of computer monitors — [cathode-ray tube](https://en.wikipedia.org/wiki/Cathode-ray_tube) displays were black in the off position and would use beams of colored RGB light to "paint" text and graphics onto a screen. Some of the earliest computer displays used only a single color to paint [vector graphics](https://en.wikipedia.org/wiki/Vector_monitor) on to primitive screens.

![Xerox Star workstation GUI](/images/xerox_star_gui.jpg){data-align="left" data-small="true" data-caption="Xerox Star, the first consumer interface"}

As computers became more powerful and interfaces more sophisticated it was easier to fill entire screens with light. The first consumer [graphical user interface](https://en.wikipedia.org/wiki/Graphical_user_interface) (or GUI) was introduced by [Xerox](https://en.wikipedia.org/wiki/PARC_(company)) in 1973 and light themed interfaces have [been the norm in home computing ever since](https://www.webdesignerdepot.com/2009/03/operating-system-interface-design-between-1981-2009/). My best guess for why this trend is that with the rise of [home desktop publishing](https://en.wikipedia.org/wiki/Desktop_publishing) users were more comfortable working with an interface that resembled paper.

[[clearfix]]

![Windows 95 desktop](/images/windows-95-desktop.png){data-align="right" data-small="true" data-caption="Windows 95"}

By the early 90s, computers were becoming a fixture in most homes almost all GUIs were in full color. Many of these operating systems allowed users to pick from predefined lists of themes to recolor their interfaces, some of which were light-on-dark styles and some of which were dark-on-light styles.

## Modern Dark Mode

![Apple Human Interface Guidelines example of light versus dark mode](/images/apple-human-interface-guidelines-light-dark-mode.png){data-align="right" data-caption="Human Interface Guidelines, apple.com"}

What we think of as "dark mode" today really took off around the end of 2019. Apple introduced a system-wide preference for dark mode on desktops with their [Mojave OS](https://en.wikipedia.org/wiki/MacOS_Mojave#User_interface) and for handheld devices with [iOS 13](https://en.wikipedia.org/wiki/IOS_13#User_interface), and Android did the same with [Android 10](https://en.wikipedia.org/wiki/Android_10#User_experience).

It has always been possible to create a custom theme implementation for a website or application using some combination of CSS and JavaScript. A big change to web development came in 2020 when all major web browsers began supporting the [`prefers-color-scheme` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme). This is a flag that is passed from a user's operating system level preference into the browser, and CSS could check to see what that preference was and make decisions based on it. Along with the addition of [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), web developers were granted a powerful set of tools to dynamically change styles based on these user preferences.

## Why should a site support Dark Mode?

### For Eye Health

Although the facts seem to be debated, many users claim that using a dark theme reduces strain on their eyes. There does seem to be evidence that this is contextually true — light themes make sense for bright environments and dark themes for dark environments. There is also evidence to suggest that when using screens immediately before bedtime, [a dark theme will reduce the amount of blue light the eyes take in and make it easier to fall asleep](https://www.health.harvard.edu/staying-healthy/blue-light-has-a-dark-side).

### For Less Energy Consumption

Less debatable than the topic of eye strain is the fact that [with certain screen types using a dark theme can conserve energy](https://www.ifixit.com/News/16952/does-dark-mode-really-save-battery-on-your-phone). This is because _not_ having to light up background pixels with white light can lead to less battery usage. As more and more devices are built with [OLED screens](https://en.wikipedia.org/wiki/OLED) this can add up to huge savings over time and at scale. Users can consume less electricity, charge their phones less, replace their batteries with less frequency, and overall have a positive effect on the environment.

### Just Because

The most important, in my opinion, is to honor a user's choice. In fact, that ethos is [baked right into the design of CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#origin_of_css_declarations).

> The user (or reader) of the web site can choose to override styles in many browsers using a custom user stylesheet designed to tailor the experience to the user's wishes.
> ***
> [MDN CSS Cascade Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#user_stylesheets)

While there may not be science to confirm that it is actually better for your eyes, many people prefer using sites with light text on a dark backgrounds. Letting users customize their experience is core to the web platform, and if a site can let them choose their color theme without having to write a custom style sheet, it should.

## Dark Mode isn't for Everybody

Dark mode is certainly popular right now, but there are still a large number of people who prefer to read dark text on a light background — and that's okay! There are many [medical reasons](https://levelup.gitconnected.com/why-dark-mode-causes-more-accessibility-issues-than-it-solves-d2f8359bb46a) why a person might want to stick with what has been a more traditional color scheme.

With the tools currently available for the web platform it's certainly possible to let users make choices about how they want to view content.
