# Aramburu Lab Website

This is the website of our academic research group at Umeå University.

This website is powered by Jekyll and some Bootstrap, Bootwatch. 

Website forked from Allan Lab's in Leiden University. Go to [aboutwebsite.md](https://github.com/mpa139/allanlab/blob/gh-pages/_pages/aboutwebsite.md)  to learn how to copy and modify [Allan Lab's page](https://github.com/mpa139/allanlab) the way we did it. 

## How to update the website

### Add a new team member

1.  Clone the repository:

    ``` bash
    git clone https://github.com/aramburulab/aramburulab.git
    ```

2.  Copy the example team member from
    `_examples/example_team_member.yml` to `_data/team_members.yml`.

3.  Fill out the example and update the members/alumni list at the top of the page.

4.  Add the team member image to the `/images/team/` directory.

5.  Update the top of the `_data/news.yml` page to include the new team member.

6.  Commit and push your changes:

    ``` bash
    git add .
    git commit -m "Add team member"
    git push
    ```

------------------------------------------------------------------------

### Add a new publication

1.  Clone the repository:

    ``` bash
    git clone https://github.com/aramburulab/aramburulab.git
    ```

2.  Copy the example publication file from
    `_examples/example_publication.md` to `_publications/`.

3.  Edit the new file to add your publication information.

4.  Name the file, starting with the date of publication in the format YYYY_MM_DD.

5.  Optionally, add the publication image to the `/images/publications/` directory.

6.  Optionally, add the publication PDF to the `/downloads/` directory.

7.  Update the top of the `_data/news.yml` page to include the new publication, you can include a link if you like.

8.  Commit and push your changes:

    ``` bash
    git add .
    git commit -m "Add publication"
    git push
    ```

------------------------------------------------------------------------

### Update page contents

Page text found within `/_pages/` uses markdown.

Headers, footers and sidebars found within `/_includes/`. 
> **Note:** Ensure these files start with an HTML tag; starting with plain text can cause Jekyll to misinterpret them as Markdown and break the layout.

Site layouts can be found in `/_layouts/`, you usually won't need to touch these.


------------------------------------------------------------------------

### Build website locally

1.  Install [Ruby](https://rubyinstaller.org/downloads/) if you haven't
    already.

2.  Install dependencies:

    ``` bash
    gem install jekyll github-pages
    ```

3.  Clone the repository:

    ``` bash
    git clone https://github.com/aramburulab/aramburulab.git
    ```

4.  Build and serve the site:

    ``` bash
    jekyll serve
    ```

5.  Open in your browser:

    ``` text
    http://localhost:4000/AramburuLab
    ```
