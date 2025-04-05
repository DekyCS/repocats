This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
index.html
styles.css
yes.html
```

# Files

## File: index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <title>Alicia Quiz</title>
</head>
<body>
    <h1>Do you like me Alicia</h1>
    <div class="btn-group">
        <button id="yes">Yes</button>
        <button id="btn">No</button>
    </div>
</body>

<script>
    const button = document.getElementById('btn');
    const yes = document.getElementById('yes')
    button.addEventListener('mouseover', function () {
        button.style.left = `${Math.ceil(Math.random() * 90)}%`;
        button.style.top = `${Math.ceil(Math.random() * 90)}%`;
    });
    button.addEventListener('click', function () {
        alert('you clicked me')
    })
    yes.addEventListener('click', function () {
        window.location.href = 'yes.html'; 
    })
</script>
</html>
```

## File: styles.css
```css
body {
    background-color: lavender;
    font-family: "Fuzzy Bubbles", sans-serif;
    font-weight: 700;
    font-style: normal;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
}

button {
    position: absolute;
    transition: .5s;
    padding: 10px;
    height: 40px;
    width: 150px;
    cursor: pointer;
}

.btn-group {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
}

button {
    appearance: button;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    box-sizing: border-box;
    color: black;
    cursor: pointer;
    outline: none;
    overflow: visible;
    padding: 13px 16px;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
    white-space: nowrap;
    border-color: lightgray;
    font-family: "Fuzzy Bubbles", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  button:after {
    background-clip: padding-box;
    background-color: #d0d2fa;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -4px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
  
  button:main,
  button:focus {
    user-select: auto;
  }
  
  button:hover:not(:disabled) {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
  }
  
  button:disabled {
    cursor: auto;
  }
  
  button:active {
    border-width: 4px 0 0;
    background: none;
  }

  #yes {
    background-color: #eaffda;
    margin-left: -200px;
}

#btn {
    background-color: #f6def1;
    margin-right:-200px;
}
```

## File: yes.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <title>Alicia Quiz</title>
</head>
<body>
    <h1>That's what I thought</h1>
    <img src="./cat.gif" alt="cat">
</body>

</html>
```
