---
title: "News"
layout: textlay
excerpt: "Aramburu Lab at Umeå University."
sitemap: false
permalink: /allnews.html
---

# News

<div class="well">
{% for article in site.data.news %}
<p>{{ article.date }}<br/>
{{ article.headline}}</p>
{% endfor %}
</div>