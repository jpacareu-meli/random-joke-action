# random-joke-action

To use this action you should follow these steps:

1. Create a folder in your project named `.github` and inside create another folder named `workflows`

2. Create a file inside of `workflows` named `random-joke-action.yml`

3. Add into it:

```yml
name: Create Random Joke
on:
  pull_request:
    types:
      - opened
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 
        uses: jpacareu-meli/random-joke-action@v1.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

4. Push your files and open a Pull Request with the changes.
