---
title: "Aramburu Lab - Publications"
layout: gridlay
excerpt: "Aramburu Lab -- Publications."
sitemap: false
permalink: /publications/
---
<style>
   p {margin : 0;}
</style>
<h1>Publications</h1>
<p>To read more about Iker Valle Aramburu's publications follow this: <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Iker+Valle+Aramburu\">link</a></p>
<br/>
<!-- To see the publications on the page, remove the {%comment%} and {%endcomment%} -->

{%comment%}
{::nomarkdown}
<div class="publications">
   {% for publication in site.publications reversed %}
   {% include publication.html pub=publication %}
   {% endfor %}
</div>
{:/}
{%endcomment%}