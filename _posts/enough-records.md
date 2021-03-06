{{{
  "title": "Rebooted site for Enough Records netlabel",
  "tags": ["js","web","open-source"],
  "date": "10-26-2013",
  "description": "New site for Enough Records"
}}}

Enough has some amazing releases, some quite challenging - covering topics like freedom of speech, oppression, raw creativity and sonic ingenuity. I really recommend checking out releases from Varia, M-Pex, Jari Pitkänen, the Enough Dubs compilations... just go crazy. I hope the work done with this site does justice to their spectacular creativity, and [Filipe Cruz](http://tpolm.org/~ps)'s (aka ps, the curator and founder of the site, who also helped out with some dev work) vision in releasing their music under the Enough Records label.

<!--more-->

So, about the site - I made a simple and clean layout, and backed it up with a full-on javascript powered site. Probably the coolest feature is being able to browse around the catalogue and keep listening, and have stuff suggested to you. 

The site has been released as an open source project. A lot of the code is a bit messy (we have an open issue to clean this up), reflecting the nature of the project. It was done pretty quickly - I guess it only took in total about 4-5 days of hacking around, although we've been talking about doing something for a lot longer.

In terms of tech, I used `browserify`, `backbone` and a handful of NPM modules to help speed this up. Browserify's workflow is amazingly fluid. Writing everything in CommonJS modules, using Node's require and keeping all the dependencies in the `package.json` manifest is just.. so clean. A one step build and uglifying process is the cherry on top. 

As the catalogue is not too big, I opted to ditch our original idea of using an API, and just package up the whole thing into one monolithic, easily compressible and cachable file. This is a huge win for mobile, as once the file has loaded (around 300kb gzipped), there is zero lag and no HTTP requests beyond images for browsing around. There's a bunch of technical reasons why this is a good thing, and obviously this is not a solution you can apply everywhere, but for us on this project, it works perfectly. The collection view is still super clunky (renders the entire list), but will get round to fixing this into some kind of progressive render.

I tried to come up with a neat way to recommend releases. Each release has a selection of tags, so the first approach was to do a straight intersection between the releases tags and the rest of the catalogue - but this proved to be a bit clunky, as it almost always returned a huge list of related releases. 

In the end, I used Levenshtein distance between the sorted tag arrays converted to a string, and 90% of the time this works pretty well in finding things that are more closely related. When the tag list grows though, the approach does not work so well, but have a few ideas about how to fix that. It's not perfect, but works ok for now.

Go [check it out](http://enoughrecords.scene.org). 

## Links
- [Github Source](https://github.com/enoughrec/arecordlabel)
- [Github Issues & Bug Tracker](https://github.com/enoughrec/arecordlabel/issues) 
- [Enough Records Blog](http://enoughrecords.org/)
- [Enough Records Site](http://enoughrecords.scene.org/)

## Screenshots

### Catalogue browser on desktop
<img src="/img/enough/releases_desktop.png" />


### Release Page on desktop
<img src="/img/enough/release_desktop.png" />

### Release Page on Mobile
<img src="/img/enough/release_mobile1.png" class="mobile-img" />
<img src="/img/enough/release_mobile2.png" class="mobile-img" />
<img src="/img/enough/release_mobile3.png" class="mobile-img" />

