# [WIP] footprint.js

Buzzfeed's "Pound" re-implementation.

[BuzzFeed Unveils Pound To Show How You Really Share Content | Fast Company | Business + Innovation](http://www.fastcompany.com/3045484/buzzfeed-unveils-pound-to-show-how-you-really-share-content)

## How does it works?

It automatically appends a hash named "footprint". For example, if you directly land to a page, you will get a hash something like `ex8ceta4`.
And then you might share the page via Twitter. The shared url will have the hash `#ex8ceta4`.

When someone clicks the link, they gets another footprint something like `ex8ceta4+g4zawkjh`. Note that your footprint `ex8ceta4` is contained. Ok. Let them shared the page. The shared url has the hash `#ex8ceta4+g4zawkjh`.

Then next? It will be like `ex8ceta4+g4zawkjh+ppae6owm`. Simply a random string will be appended.

With this mechanism (and some `referrer` tracking), you can draw actual social spreading graph as below.

You can assume that footprint with one id (such as `ex8ceta4`) as directly landed users. A footprint with two id (such as `ex8ceta4+g4zawkjh`) as indirectly landed users, who comes from the sharing of the directly landed user. (`ex8ceta4`)

![](http://d.fastcompany.net/multisite_files/fastcompany/imagecache/inline-large/inline/2015/04/3045484-inline-diffusiontree.png)
