## How to update the website

### Add a new team member

1.  Clone the repository:

    ``` bash
    git clone https://github.com/aramburulab/aramburulab.git
    ```

2.  Copy the example team member file from
    `_examples/example_team_member.yml` to `_data/team_members.yml`.

3.  Edit the new file to add your team member information.

4.  Add the team member image to the `/images/team/` directory.

5.  Commit and push your changes:

    ``` bash
    git add .
    git commit -m "Add team member"
    git push
    ```

------------------------------------------------------------------------

### Add a new publication

1.  Copy the example publication file from
    `_examples/example_publication.md` to `_publications/`.

2.  Edit the new file to add your publication information.

3.  Add the publication image to the `/images/publications/` directory.

4.  Add the publication PDF to the `/downloads/` directory.

5.  Commit and push your changes:

    ``` bash
    git add .
    git commit -m "Add publication"
    git push
    ```

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
