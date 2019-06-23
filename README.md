# Agile Engine TEST

This is a test for reading html code frm one source and looking by certains params such as id / title / href on other html

## Installation

```bash
git clone https://github.com/nostick/agile-engine/
cd agile-engine
npm run install
```

## Usage

```
Case 1: node index.js sample-0-origin.html sample-1-evil-gemini.html
Case 2: node index.js sample-0-origin.html sample-2-container-and-clone.html
Case 3: node index.js sample-0-origin.html sample-3-the-escape.html 
Case 4: node index.js sample-0-origin.html sample-4-the-mash.html
```

## Outputs by Case

### Case 1:
``` 
$ node index.js sample-0-origin.html sample-1-evil-gemini.html        
HTML > BODY > DIV > DIV > DIV class="row" > DIV class="col-lg-8" > DIV class="panel panel-default" > DIV class="panel-body" > A class="btn btn-success"
```

### Case 2:
```
$ node index.js sample-0-origin.html sample-2-container-and-clone.html
HTML > BODY > DIV > DIV > DIV class="row" > DIV class="col-lg-8" > DIV class="panel panel-default" > DIV class="panel-body" > DIV class="some-container" > A class="btn test-link-ok"

```

### Case 3:
```
$ node index.js sample-0-origin.html sample-3-the-escape.html         
HTML > BODY > DIV > DIV > DIV class="row" > DIV class="col-lg-8" > DIV class="panel panel-default" > DIV class="panel-footer" > A class="btn btn-success"
```

### Case 4:
```
$ node index.js sample-0-origin.html sample-4-the-mash.html
HTML > BODY > DIV > DIV > DIV class="row" > DIV class="col-lg-8" > DIV class="panel panel-default" > DIV class="panel-footer" > A class="btn btn-success"
```

## Notes 1
The app file is de binary executable, it also needs params just like on node, so an example would be like this:

```
$./app sample-0-origin.html sample-1-evil-gemini.html
```

it shouldn't require any type of build, should wokr just like it is.

## Notes 2
There is a third param you may add if you want but it isn't required for app to run, but
if exist the programa will try to work with that id to search for the item on original file



